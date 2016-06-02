/*
 * App Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your appliction state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */


import {LOG_IN, LOGGED_IN, LOG_OUT, LOGGED_OUT} from "./constants";

export function logIn() {
    return {
        type: LOG_IN
    };
}

export function logOut() {
    return {
        type: LOG_OUT
    };
}


export function loggedIn(profile) {
    return {
        type: LOGGED_IN,
        profile: profile
    };
}

export function loggedOut() {
    return {
        type: LOGGED_OUT
    };
}
