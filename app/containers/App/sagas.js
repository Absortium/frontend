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
    accountUpdated,
    marketInfoReceived,
    marketChanged,
    offerReceived,
    offersChanged,
    subscribeOnTopic,
    subscribeSuccess,
    subscribeFailed,
    topicUpdate,
    exchangeCreated
} from "./actions";
import {
    LOG_IN,
    LOG_OUT,
    LOGGED_IN,
    LOGGED_OUT,
    MARKET_CHANGED,
    TOPIC_SUBSCRIBE,
    TOPIC_SUBSCRIBE_FAILED,
    TOPIC_UPDATE,
    EXCHANGE_CREATED,
    EXCHANGE_STATUS_INIT,
    EXCHANGE_STATUS_PENDING,
    SEND_EXCHANGE
} from "./constants";
import { LOCATION_CHANGE } from "react-router-redux";
import axios from "axios";
import Auth0Lock from "auth0-lock";
import {
    extractCurrencies,
    sleep,
    include,
    setTimeoutGenerator,
    convert,
    deconvert
} from "utils/general";
import { isTokenExpired } from "utils/jwt";
import autobahn from "autobahn";
import { toastr } from "react-redux-toastr";

// All sagas to be loaded
export default [
    defaultSaga,
];


// Individual exports for testing
export function* defaultSaga() {
    yield [
        AccountsService.setup(),
        AuthService.setup(),
        MarketInfoService.setup(),
        RouteService.setup(),
        OfferService.setup(),
        AutobahnService.setup(),
        ExchangeService.setup()
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
            AuthService.lock.show(...args, (err, profile, token) => err ? reject([err, null, null]) : resolve([null, profile, token]));
        })
    }

    static getToken() {
        return localStorage.getItem("token");
    }

    static getProfile() {
        return JSON.parse(localStorage.getItem("profile"));
    }


    static setupIntercept(token) {
        axios.interceptors.request.use(function (config) {
            if (token === undefined) {
                config.headers.Authorization = undefined;
            } else {
                config.headers.Authorization = "JWT " + token;
            }

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
        const [err, profile, token] = yield call(AuthService.show, options);

        if (err) {
            console.log("Error signing in", err);
        } else {
            AuthService.setupIntercept(token);
            localStorage.setItem("token", token);
            localStorage.setItem("profile", JSON.stringify(profile));
            yield put(loggedIn(token, profile));
        }
    }

    static *handlerLogOut() {
        AuthService.setupIntercept();
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
    static currency = false;
    static account;

    static *handlerLoggedIn() {
        AccountsService.isAuthenticated = true;
        yield* AccountsService.get();
    }

    static *handlerLoggedOut() {
        AccountsService.isAuthenticated = false;
    }

    static *handlerMarketChanged(action) {
        AccountsService.isMarketInit = true;
        AccountsService.currency = action.from_currency;
        yield* AccountsService.get();
    }

    static * handleExchangeCreated(action) {
        let spent = 0;
        let shouldCheck = false;

        for (let exchange of action.exchanges) {
            spent += exchange.amount;

            if (exchange.status == EXCHANGE_STATUS_INIT || exchange.status == EXCHANGE_STATUS_PENDING) {
                shouldCheck = true;
            }
        }

        let account = AccountsService.account;
        account.amount -= spent;
        AccountsService.account = account;

        yield put(accountUpdated(AccountsService.account))
    }

    static *get() {
        if (AccountsService.isAuthenticated && AccountsService.isMarketInit) {
            try {
                const response = yield call(axios.get, "/api/accounts/?currency=" + AccountsService.currency);
                let account = response["data"][0];

                AccountsService.account = account;

                yield put(accountReceived(account));
            } catch (e) {
                yield call(toastr.error, "Account", "You credentials aren't valid");
            }
        }
    }

    static *setup() {
        yield [
            takeEvery(LOGGED_IN, AccountsService.handlerLoggedIn),
            takeEvery(LOGGED_OUT, AccountsService.handlerLoggedOut),
            takeEvery(MARKET_CHANGED, AccountsService.handlerMarketChanged),
            takeEvery(EXCHANGE_CREATED, AccountsService.handleExchangeCreated)
        ]
    }
}

class RouteService {

    static * analyze(action) {
        let s = action.payload.pathname;
        let currencies = extractCurrencies(s);

        if (currencies != null) {
            yield put(marketChanged(currencies[1], currencies[2]));
        }
    };

    static *setup() {
        yield* takeEvery(LOCATION_CHANGE, RouteService.analyze)
    }

}

class MarketInfoService {
    static * get(action) {

        //var from_currency = action.from_currency;
        //var to_currency = action.to_currency;
        let from_currency = null;
        let to_currency = null;

        let q = "";
        if (from_currency != null) {
            q += "?";
            q += "from_currency=" + from_currency;

            if (to_currency != null) {
                q += "&to_currency=" + to_currency;
            }
        }

        const response = yield call(axios.get, "/api/marketinfo/" + q);
        let result = response["data"];

        let marketInfo = {};
        for (let info of result) {
            let fc = info["from_currency"];
            delete info["from_currency"];

            let tc = info["to_currency"];
            delete info["to_currency"];

            if (marketInfo[fc] === undefined) {
                marketInfo[fc] = {}
            }

            if (marketInfo[fc][tc] === undefined) {
                marketInfo[fc][tc] = {}
            }

            marketInfo[fc][tc] = info
        }

        yield put(marketInfoReceived(marketInfo));
    };

    static *setup() {
        yield* takeEvery(MARKET_CHANGED, MarketInfoService.get)
    }
}

class OfferService {
    static topics = [];

    static * get(action) {

        let from_currency = action.from_currency;
        let to_currency = action.to_currency;

        let q = "?";
        q += "from_currency=" + from_currency;
        q += "&to_currency=" + to_currency;

        const response = yield call(axios.get, "/api/offers/" + q);
        let offers = response["data"];

        yield put(offerReceived(offers));
    };

    static * handlerUpdate(action) {
        if (include(OfferService.topics, action.topic)) {
            yield put(offersChanged(action.data))
        }
    }

    static * connect(action) {
        let from_currency = action.from_currency;
        let to_currency = action.to_currency;
        let topic = from_currency + "_" + to_currency;

        OfferService.topics.push(topic);
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

    static * listner(topic) {
        let deferred;

        AutobahnService.session.subscribe(topic, (args, data) => {
            if (deferred) {
                deferred.resolve(data);
                deferred = null
            }
        });

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
        var wsuri = "ws://absortium.com:8080/ws";
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
            takeEvery(TOPIC_SUBSCRIBE_FAILED, AutobahnService.handlerSubscribe)
        ]

    }
}

class ExchangeService {
    static * handlerSendExchange(action) {
        let data = {
            from_currency: action.from_currency,
            to_currency: action.to_currency,
            amount: convert(action.amount),
            price: action.price
        };

        try {
            const response = yield call(axios.post, "/api/exchanges/", data);
            let exchanges = response.data;

            yield put(exchangeCreated(exchanges));
            toastr.success("Exchange", "Created successfully");

        } catch (response) {
            if (response instanceof Error) {
                let err = response;
                throw err
            }

            toastr.error("Exchange", JSON.parse(response.request.response)[0]);
        }
    }

    static * setup() {
        yield [
            takeEvery(SEND_EXCHANGE, ExchangeService.handlerSendExchange)
        ]
    }
}