import {take, call, put, select} from "redux-saga/effects";
import {takeEvery, takeLatest} from "redux-saga";
import {authLockLoaded} from "containers/App/actions";

// All sagas to be loaded
export default [
    defaultSaga,
];


function* authUser(auth) {
    console.log("HANDLER");
}


// Individual exports for testing
export function* defaultSaga() {
    yield [
        initHandlers()
    ]
}


function* initHandlers() {
    yield* takeEvery("USER_AUTH", authUser);
}