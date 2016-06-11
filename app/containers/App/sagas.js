import {
    take,
    call,
    put,
    select,
    cps
} from "redux-saga/effects";
import {
    takeEvery,
    takeLatest
} from "redux-saga";
import {
    loggedOut,
    loggedIn,
    accountsReceived,
    marketInfoReceived,
    marketChanged,
    offerReceived
} from "./actions";
import {
    LOG_IN,
    LOG_OUT,
    LOGGED_IN,
    LOGGED_OUT,
    MARKET_CHANGED
} from "./constants";
import { LOCATION_CHANGE } from "react-router-redux";
import axios from "axios";
import Auth0Lock from "auth0-lock";
import { extractCurrencies } from "utils/general";
import autobahn from "autobahn"

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
        OfferService.setup()
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

    /*
     This method was designed because we encounter the problem of yield in callback,
     so I wrapped lock show method and use in with "call" method.
     */
    static show(...args) {
        return new Promise((resolve, reject) => {
            AuthService.lock.show(...args, (err, profile, token) => err ? reject([err, null, null]) : resolve([null, profile, token]));
        })
    }

    static getToken() {
        var token = localStorage.getItem("token");

        var authHash = AuthService.lock.parseHash(window.location.hash);
        if (!token && authHash) {
            if (authHash.id_token) {
                token = authHash.id_token;
                localStorage.setItem("token", authHash.id_token);
            }
            if (authHash.error) {
                return null;
            }
        }

        return token
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
                icon: 'https://www.graphicsprings.com/filestorage/stencils/697fc3874552b02da120eed6119e4b98.svg'
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

        var token = localStorage.getItem("token");
        var profile = JSON.parse(localStorage.getItem("profile"));

        console.log(profile);
        if (token != null) {
            AuthService.setupIntercept(token);
            yield put(loggedIn(token, profile));
        }

        yield [
            takeEvery(LOG_OUT, AuthService.handlerLogOut),
            takeEvery(LOG_IN, AuthService.handlerLogIn)
        ]
    }
}

class AccountsService {
    static isAuthenticated = false;
    static isMarketInit = false;

    static *handlerLoggedIn() {
        AccountsService.isAuthenticated = true;
        yield* AccountsService.get();
    }

    static *handlerLoggedOut() {
        AccountsService.isAuthenticated = false;
    }

    static *handlerMarketInitialized() {
        AccountsService.isMarketInit = true;
        yield* AccountsService.get();
    }

    static *get() {
        if (AccountsService.isAuthenticated && AccountsService.isMarketInit) {
            const response = yield call(axios.get, "/api/accounts/");
            var accounts = response["data"];

            let newAccounts = {};
            for (let account of accounts) {
                let currency = account['currency'];
                delete account['currency'];
                newAccounts[currency] = account;
            }
            yield put(accountsReceived(newAccounts));
        }
    }

    static *setup() {
        yield [
            takeEvery(LOGGED_IN, AccountsService.handlerLoggedIn),
            takeEvery(LOGGED_OUT, AccountsService.handlerLoggedOut),
            takeEvery(MARKET_CHANGED, AccountsService.handlerMarketInitialized)
        ]
    }
}

class RouteService {

    static * analyze(action) {
        console.log(action.payload);

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
    static * get(action) {

        let from_currency = action.from_currency;
        let to_currency = action.to_currency;

        let q = "?";
        q += "from_currency=" + from_currency;
        q += "&to_currency=" + to_currency;

        const response = yield call(axios.get, '/api/offers/' + q);
        let offers = response['data'];

        yield put(offerReceived(offers));
    };

    static * connect() {
        var wsuri = "ws://absortium.com:8080/ws";
        var connection = new autobahn.Connection({
            url: wsuri,
            realm: "realm1"
        });

        connection.onopen = function (session, details) {
            function on_update(args, offer) {
                console.log(offer);
            }


            session.subscribe($scope.pair.toLowerCase(), on_update).then(
                function (sub) {
                    console.log('Subscribed to BTC_ETH updates');
                },
                function (err) {
                    console.log('failed to subscribe to BTC_ETH updates', err);
                }
            );
        };

        connection.onclose = function (reason, details) {
            console.log("Connection lost: " + reason);
        };

        connection.open();
    }

    static *setup() {
        yield * takeEvery(MARKET_CHANGED, OfferService.get);
        // yield [
        //
        //     // takeEvery(MARKET_CHANGED, OfferService.connect)
        // ]
    }
}