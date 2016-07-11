import {
  take,
  call,
  put,
  select,
  cps,
  fork
} from "redux-saga/effects";
import {
  takeEvery,
  takeLatest
} from "redux-saga";
import {
  loggedOut,
  loggedIn,
  logOut,
  accountReceived,
  accountsEmpty,
  accountUpdated,
  marketInfoReceived,
  marketChanged,
  offerReceived,
  offersChanged,
  subscribeOnTopic,
  unsubscribeFromTopic,
  subscribeSuccess,
  subscribeFailed,
  topicUpdate,
  marketInfoChanged,
  exchangeCreated,
  withdrawalCreated,
  userExchangesHistoryReceived,
  exchangesHistoryReceived,
  exchangesHistoryChanged,
  depositArrived
} from "./actions";
import {
  LOG_IN,
  LOG_OUT,
  LOGGED_IN,
  LOGGED_OUT,
  MARKET_CHANGED,
  TOPIC_SUBSCRIBE,
  TOPIC_UNSUBSCRIBE,
  TOPIC_SUBSCRIBE_FAILED,
  TOPIC_UPDATE,
  EXCHANGE_CREATED,
  EXCHANGE_STATUS_INIT,
  EXCHANGE_STATUS_PENDING,
  WITHDRAWAL_CREATED,
  SEND_EXCHANGE,
  SEND_WITHDRAWAL,
  ACCOUNTS_EMPTY,
  ACCOUNT_RECEIVED,
  DEPOSIT_ARRIVED
} from "./constants";
import { LOCATION_CHANGE } from "react-router-redux";
import axios from "axios";
import { toastr } from "react-redux-toastr";
import Auth0Lock from "auth0-lock";
import {
  extractCurrencies,
  sleep,
  setTimeoutGenerator,
  isArrayEmpty,
  include,
  getType,
  getPair,
  reverseOrderType
} from "utils/general";
import { isTokenExpired } from "utils/jwt";
import autobahn from "autobahn";
import BigNumber from "bignumber.js";
import Config from "conf";
const conf = new Config();

// All sagas to be loaded
export default [
  defaultSaga
];


// Individual exports for testing
export function* defaultSaga() {

  // Be careful the order of services is matter!
  yield [
    DepositService.setup(),
    MarketInfoService.setup(),
    HistoryService.setup(),
    RouteService.setup(),
    OfferService.setup(),
    AutobahnService.setup(),
    ExchangeService.setup(),
    WithdrawalService.setup(),
    AccountsService.setup(),
    AuthService.setup()
  ]
}

/*
 Description:
 After receiving the auth event middleware would showed pop up "Auth0" window,
 saved token in the local storage and set up the "axios" interceptor.
 Intercept events:
 - LOG_IN
 - LOG_OUT
 Emit events:
 - LOGGED_IN
 - LOGGED_OUT
 */
class AuthService {
  static lock = null;
  static interceptor = null;

  static * checkToken() {
    let token = AuthService.getToken();

    if (token != null) {
      if (isTokenExpired(token)) {
        yield put(logOut());
      } else {
        AuthService.setupIntercept(token);
        let profile = AuthService.getProfile();
        yield put(loggedIn(token, profile));

        setTimeoutGenerator(AuthService.checkToken, 1000 * 60);
      }
    }

    return true
  }

  /*
   This method was designed because we encounter the problem of yield in callback,
   so I wrapped lock show method in promise and use it with "call" method.
   */
  static show(...args) {
    return new Promise((resolve, reject) => {
      AuthService.lock.show(...args, (err, profile, token) => err ? reject(err) : resolve([profile, token]));
    })
  }

  static getToken() {
    return localStorage.getItem("token");
  }

  static getProfile() {
    return JSON.parse(localStorage.getItem("profile"));
  }


  static setupIntercept(token) {
    AuthService.interceptor = axios.interceptors.request.use(function (config) {
      config.headers.Authorization = "JWT " + token;
      return config;
    });
  }

  static *handlerLogIn() {
    var options = {
      authParams: {
        scope: "openid email",
        icon: "https://www.graphicsprings.com/filestorage/stencils/697fc3874552b02da120eed6119e4b98.svg"
      }
    };
    try {
      const [profile, token] = yield call(AuthService.show, options);
      AuthService.setupIntercept(token);
      localStorage.setItem("token", token);
      localStorage.setItem("profile", JSON.stringify(profile));
      yield put(loggedIn(token, profile));
    } catch (e) {
      console.log("Error signing in", e);
    }
  }

  static *handlerLogOut() {
    axios.interceptors.request.eject(AuthService.interceptor);
    localStorage.removeItem("token");
    localStorage.removeItem("profile");
    yield put(loggedOut());
  }

  static *setup() {
    AuthService.lock = new Auth0Lock("JmIrPzSo0nixk13ohk8KeQC2OZ7LByRI", "absortium.auth0.com");

    yield AuthService.checkToken();

    yield [
      takeEvery(LOG_OUT, AuthService.handlerLogOut),
      takeEvery(LOG_IN, AuthService.handlerLogIn)
    ]
  }
}

class AccountsService {
  static isAuthenticated = false;
  static isMarketInit = false;
  static currency = null;
  static accounts = null;

  static *handlerLoggedIn() {
    AccountsService.isAuthenticated = true;
    yield* AccountsService.get();
  }

  static *handlerLoggedOut() {
    AccountsService.isAuthenticated = false;
    AccountsService.accounts = null;
  }

  static *handlerMarketChanged(action) {
    AccountsService.isMarketInit = true;
    AccountsService.currency = action.from_currency;
    AccountsService.accounts = null;
    yield* AccountsService.get();
  }

  static * handleExchangeCreated(action) {
    let shouldCheck = false;
    let currency = AccountsService.currency;

    let amount = new BigNumber(AccountsService.accounts[currency].amount);

    for (let exchange of action.exchanges) {
      amount = amount.minus(exchange.amount);

      if (exchange.status == EXCHANGE_STATUS_INIT || exchange.status == EXCHANGE_STATUS_PENDING) {
        shouldCheck = true;
      }
    }

    AccountsService.accounts[currency].amount = amount.toString();
    yield put(accountUpdated(AccountsService.accounts[currency]));
  }

  static * handleWithdrawalCreated(action) {
    let currency = action.withdrawal.currency;

    let amount = new BigNumber(AccountsService.accounts[currency].amount);
    amount = amount.minus(action.withdrawal.amount);
    AccountsService.accounts[currency].amount = amount.toString();

    yield put(accountUpdated(AccountsService.accounts[currency]));
  }

  static * handlerDepositArrived(action) {
    let currency = action.deposit.currency;

    let amount = new BigNumber(AccountsService.accounts[currency].amount);
    amount = amount.plus(action.deposit.amount);
    AccountsService.accounts[currency].amount = amount.toString();

    yield put(accountUpdated(AccountsService.accounts[currency]));
  }

  static *get() {
    if (AccountsService.isAuthenticated && AccountsService.isMarketInit) {
      try {
        const response = yield call(axios.get, "/api/accounts/");
        let accounts = response["data"];

        if (isArrayEmpty(accounts)) {
          sleep(1);
          yield put(accountsEmpty());
        }

        AccountsService.accounts = {};

        for (let account of accounts) {
          AccountsService.accounts[account.currency] = account;
          yield put(accountReceived(account));
        }
      } catch (e) {
        if (e instanceof Error) {
          throw e
        } else {
          yield call(toastr.error, "Account", "You credentials aren't valid");
        }
      }
    }
  }

  static *setup() {
    yield [
      takeEvery(LOGGED_IN, AccountsService.handlerLoggedIn),
      takeEvery(LOGGED_OUT, AccountsService.handlerLoggedOut),
      takeEvery(MARKET_CHANGED, AccountsService.handlerMarketChanged),
      takeEvery(EXCHANGE_CREATED, AccountsService.handleExchangeCreated),
      takeEvery(WITHDRAWAL_CREATED, AccountsService.handleWithdrawalCreated),
      takeEvery(ACCOUNTS_EMPTY, AccountsService.get),
      takeEvery(DEPOSIT_ARRIVED, AccountsService.handlerDepositArrived),
    ]
  }
}

class RouteService {

  //TODO: Why is router is not working properly?
  // Why we should intercept LOCATION_CHANGED, analyze it and throw MARKET_CHANGED!?
  static * analyze(action) {
    let s = action.payload.pathname;
    let currencies = extractCurrencies(s);

    if (currencies != null) {
      let from_currency = currencies[1];
      let to_currency = currencies[2];

      let order_type = getType(from_currency, to_currency);
      let pair = getPair(from_currency, to_currency);

      yield put(marketChanged(from_currency, to_currency, pair, order_type));
    }
  };

  static *setup() {
    yield* takeEvery(LOCATION_CHANGE, RouteService.analyze)
  }

}

class MarketInfoService {
  static topic = "marketinfo";

  static * get(action) {
    const response = yield call(axios.get, "/api/marketinfo/");
    yield put(marketInfoReceived(response["data"][0]));
  };

  static * handlerUpdate(action) {
    if (MarketInfoService.topic == action.topic) {
      yield put(marketInfoChanged(action.data))
    }
  }

  static * connect() {
    yield put(subscribeOnTopic(MarketInfoService.topic));
  }

  static *setup() {
    yield [
      takeEvery(MARKET_CHANGED, MarketInfoService.get),
      takeEvery(MARKET_CHANGED, MarketInfoService.connect),
      takeEvery(TOPIC_UPDATE, MarketInfoService.handlerUpdate)
    ]

  }
}

class OfferService {
  static topic = null;

  static * get(action) {
    let q = "?";
    q += "pair=" + action.pair;
    q += "&type=" + reverseOrderType(action.order_type);

    const response = yield call(axios.get, "/api/offers/" + q);
    let offers = response["data"];


    yield put(offerReceived(offers));
  };

  static * handlerUpdate(action) {
    if (OfferService.topic == action.topic) {
      let offer = action.data;
      yield put(offersChanged([offer]))
    }
  }

  static * connect(action) {
    let pair = action.pair;
    let order_type = reverseOrderType(action.order_type);
    let topic = "offers_" + pair + "_" + order_type;

    if (OfferService.topic != topic) {
      yield put(unsubscribeFromTopic(OfferService.topic));
    }

    OfferService.topic = topic;
    yield put(subscribeOnTopic(topic));
  }

  static *setup() {

    yield [
      takeEvery(MARKET_CHANGED, OfferService.get),
      takeEvery(MARKET_CHANGED, OfferService.connect),
      takeEvery(TOPIC_UPDATE, OfferService.handlerUpdate)
    ]
  }
}

class AutobahnService {
  // Additional info about this service https://github.com/yelouafi/redux-saga/issues/51

  static session = null;
  static subscriptions = {};

  static * listner(topic) {
    let deferred;

    let onevent = function (args, data) {
      if (deferred) {
        deferred.resolve(data);
        deferred = null
      }
    };

    AutobahnService.subscriptions[topic] = yield AutobahnService.session.subscribe(topic, onevent);

    return {
      callback() {
        if (!deferred) {
          deferred = {};
          deferred.promise = new Promise(resolve => deferred.resolve = resolve)
        }
        return deferred.promise
      }
    }
  }

  static * listen(topic) {
    const { callback } = yield call(AutobahnService.listner, topic);
    yield put(subscribeSuccess(topic));

    while (true) {
      const data = yield call(callback);
      yield put(topicUpdate(topic, data));
    }
  }

  static * handlerUnsubscribe(action) {
    let topic = action.topic;

    if (AutobahnService.session != null) {
      let subscription = AutobahnService.subscriptions[topic];
      if (subscription) {
        AutobahnService.session.unsubscribe(subscription);
      }
    }
  }

  static * handlerSubscribe(action) {
    let topic = action.topic;

    if (AutobahnService.session != null) {
      yield fork(AutobahnService.listen, topic)
    } else {
      yield sleep(1000);
      yield put(subscribeFailed(topic, "Session is not initialized yet"));
    }
  }

  static * setup() {
    var wsuri = "ws://" + conf.url + ":8080/ws";
    var connection = new autobahn.Connection({
      url: wsuri,
      realm: "realm1"
    });

    connection.onopen = function (session, details) {
      console.log("Connection opened");
      AutobahnService.session = session;
    };

    connection.onclose = function (reason, details) {
      console.log("Connection lost: " + reason);
      AutobahnService.session = null;
    };

    connection.open();

    yield [
      takeEvery(TOPIC_SUBSCRIBE, AutobahnService.handlerSubscribe),
      takeEvery(TOPIC_UNSUBSCRIBE, AutobahnService.handlerUnsubscribe),
      takeEvery(TOPIC_SUBSCRIBE_FAILED, AutobahnService.handlerSubscribe)
    ]

  }
}

class ExchangeService {
  static isAuthenticated = false;
  static isMarketInit = false;
  static pair = null;
  static order_type = null;

  static *handlerLoggedIn() {
    ExchangeService.isAuthenticated = true;
    yield* ExchangeService.getUserExchanges();
  }

  static *handlerLoggedOut() {
    ExchangeService.isAuthenticated = false;
  }

  static *handlerMarketChanged(action) {
    ExchangeService.isMarketInit = true;
    ExchangeService.order_type = action.order_type;
    ExchangeService.pair = action.pair;
    yield* ExchangeService.getUserExchanges();
  }

  static *getUserExchanges() {
    if (ExchangeService.isMarketInit && ExchangeService.isAuthenticated) {
      let q = "?";
      q += "pair=" + ExchangeService.pair;
      q += "&type=" + ExchangeService.order_type;

      const response = yield call(axios.get, "/api/orders/" + q);
      yield put(userExchangesHistoryReceived(response.data));
    }
  }

  static * handlerSendExchange(action) {
    let data = {
      pair: action.pair,
      type: action.order_type,
      price: action.price
    };

    if (action.amount)
      data["amount"] = action.amount;
    else if (action.total)
      data["total"] = action.total;

    try {
      const response = yield call(axios.post, "/api/orders/", data);
      let exchanges = response.data;

      yield put(exchangeCreated(exchanges));
      toastr.success("Order", "Created successfully");

    } catch (response) {
      if (response instanceof Error) {
        let err = response;
        throw err
      }

      toastr.error("Order", JSON.parse(response.request.response)[0]);
    }
  }

  static * setup() {
    yield [
      takeEvery(LOGGED_IN, ExchangeService.handlerLoggedIn),
      takeEvery(LOGGED_OUT, ExchangeService.handlerLoggedOut),
      takeEvery(MARKET_CHANGED, ExchangeService.handlerMarketChanged),
      takeLatest(SEND_EXCHANGE, ExchangeService.handlerSendExchange)
    ]
  }
}

class HistoryService {
  static topic = null;

  static * handlerUpdate(action) {
    if (HistoryService.topic == action.topic) {
      let exchange = action.data;
      yield put(exchangesHistoryChanged([exchange]))
    }
  }

  static * connect(action) {
    let pair = action.pair;
    let order_type = action.order_type;
    let topic = "history_" + pair + "_" + order_type;

    if (HistoryService.topic != topic) {
      yield put(unsubscribeFromTopic(HistoryService.topic));
    }

    HistoryService.topic = topic;
    yield put(subscribeOnTopic(topic));
  }

  static * getAllExchanges(action) {
    let q = "?";
    q += "pair=" + action.pair;
    q += "&type=" + action.order_type;

    const response = yield call(axios.get, "/api/history/" + q);
    yield put(exchangesHistoryReceived(response.data));
  }

  static * setup() {
    yield [
      takeEvery(MARKET_CHANGED, HistoryService.getAllExchanges),
      takeEvery(MARKET_CHANGED, HistoryService.connect),
      takeEvery(TOPIC_UPDATE, HistoryService.handlerUpdate)
    ]
  }
}

class WithdrawalService {
  static * handlerSendWithdrawal(action) {
    let data = {
      amount: action.amount,
      address: action.address,
      price: action.price
    };

    try {
      const url = "/api/accounts/" + action.pk + "/withdrawals/";
      const response = yield call(axios.post, url, data);
      let withdrawal = response.data;

      // TODO (backend): Change /account/{pk}/withdrawals/ -> /withdrawals/
      withdrawal.currency = action.currency;

      yield put(withdrawalCreated(withdrawal));
      toastr.success("Withdrawal", "Created successfully");

    } catch (response) {
      if (response instanceof Error) {
        let err = response;
        throw err
      }

      toastr.error("Withdrawal", JSON.parse(response.request.response)[0]);
    }
  }

  static * setup() {
    yield [
      takeLatest(SEND_WITHDRAWAL, WithdrawalService.handlerSendWithdrawal)
    ]
  }
}

class DepositService {
  static accounts = {};
  static isAuthenticated = false;

  static * get(pk) {
    try {
      const url = "/api/accounts/" + pk + "/deposits/";
      const response = yield call(axios.get, url);
      return response.data

    } catch (response) {
      if (response instanceof Error) {
        let err = response;
        throw err
      }
    }
  }

  static * handlerLoggedIn() {
    DepositService.isAuthenticated = true;
  }

  static * handlerLoggedOut() {
    DepositService.isAuthenticated = false;
  }

  static * handlerAccountReceived(action) {
    let account = action.account;

    try {
      let data = yield* DepositService.get(account.pk);
      let deposits = data.map(function (deposit, index) {
        return deposit.pk
      });

      while (DepositService.isAuthenticated) {
        try {
          for (let deposit of yield* DepositService.get(account.pk)) {
            if (!include(deposits, deposit.pk)) {
              toastr.success("Deposit", "New deposit arrived!");
              deposits.push(deposit.pk);

              deposit.currency = account.currency;

              yield put(depositArrived(deposit));

            }
          }
        } catch (e) {
          // In case of LOGGED_OUT happened after while condition.
        }

        yield sleep(5000);
      }
    } catch (response) {
      if (response instanceof Error) {
        let err = response;
        throw err
      }
    }

  }

  static * setup() {
    yield [
      takeEvery(ACCOUNT_RECEIVED, DepositService.handlerAccountReceived),
      takeEvery(LOGGED_OUT, DepositService.handlerLoggedOut),
      takeEvery(LOGGED_IN, DepositService.handlerLoggedIn)
    ]
  }
}