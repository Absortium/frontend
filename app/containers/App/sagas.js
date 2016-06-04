import {take, call, put, select, cps} from "redux-saga/effects";
import {takeEvery, takeLatest} from "redux-saga";
import {loggedOut, loggedIn, accountsReceived} from "./actions";
import {LOG_IN, LOG_OUT, LOGGED_IN} from "./constants";
import axios from "axios";
import Auth0Lock from "auth0-lock";

// All sagas to be loaded
export default [
    defaultSaga,
];


// Individual exports for testing
export function* defaultSaga() {
    yield [
        AccountsService.setup(),
        AuthService.setup()
    ]
}

/*
 Description:
 After receiving the auth event middleware would showed pop up 'Auth0' window,
 saved token in the local storage and set up the 'axios' interceptor.
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
     so I wrapped lock show method and use in with 'call' method.
     */
    static show(...args) {
        return new Promise((resolve, reject) => {
            AuthService.lock.show(...args, (err, profile, token) => err ? reject([err, null, null]) : resolve([null, profile, token]));
        })
    }

    static getToken() {
        var token = localStorage.getItem('token');

        var authHash = AuthService.lock.parseHash(window.location.hash);
        if (!token && authHash) {
            if (authHash.id_token) {
                token = authHash.id_token;
                localStorage.setItem('token', authHash.id_token);
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
                config.headers.Authorization = 'JWT ' + token;
            }

            return config;
        });
    }

    static *logIn() {
        var options = {
            authParams: {
                scope: 'openid email'
            }
        };
        const [err, profile, token] = yield call(AuthService.show, options);

        if (err) {
            console.log("Error signing in", err);
        } else {
            AuthService.setupIntercept(token);
            localStorage.setItem('token', token);
            localStorage.setItem('profile', profile);
            yield put(loggedIn(token, profile));
        }
    }

    static *logOut() {
        AuthService.setupIntercept();
        localStorage.removeItem('token');
        localStorage.removeItem('profile');
        yield put(loggedOut());
    }

    static *setup() {
        AuthService.lock = new Auth0Lock('JmIrPzSo0nixk13ohk8KeQC2OZ7LByRI', 'absortium.auth0.com');

        var token = localStorage.getItem('token');
        var profile = localStorage.getItem('profile');

        if (token != null) {
            AuthService.setupIntercept(token);
            yield put(loggedIn(token, profile));
        }

        yield [
            takeEvery(LOG_OUT, AuthService.logOut),
            takeEvery(LOG_IN, AuthService.logIn),
        ]
    }
}

class AccountsService {
    static *get() {
        const response = yield call(axios.get, '/api/accounts/');
        var accounts = response['data'];
        yield put(accountsReceived(accounts));
    }

    static *setup() {
        yield* takeEvery(LOGGED_IN, AccountsService.get)
    }
}