import {take, call, put, select, cps} from "redux-saga/effects";
import {takeEvery, takeLatest} from "redux-saga";
import {loggedOut, loggedIn} from "./actions";
import {LOG_IN, LOG_OUT} from "./constants";
import axios from "axios";
import Auth0Lock from "auth0-lock";

// All sagas to be loaded
export default [
    defaultSaga,
];


// Individual exports for testing
export function* defaultSaga() {
    yield AuthService.setup();

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

    static *logIn() {
        const [err, profile, token] = yield call(AuthService.show);

        if (err) {
            console.log("Error signing in", err);
        } else {
            axios.interceptors.request.use(function (config) {
                config.headers.Authorization = 'Bearer ' + token;
                return config;
            });
            yield put(loggedIn(profile));
        }
    }

    static *logOut() {
        axios.interceptors.request.use(function (config) {
            config.headers.Authorization = null;
            return config;
        });

        yield put(loggedOut());
    }

    static *setup() {
        AuthService.lock = new Auth0Lock('JmIrPzSo0nixk13ohk8KeQC2OZ7LByRI', 'absortium.auth0.com');

        yield* takeEvery(LOG_IN, AuthService.logIn);
        yield* takeEvery(LOG_OUT, AuthService.logOut);
    }
}