/*
 *
 * Header actions
 *
 */

import {LOG_IN, LOG_OUT} from "./constants";

export function logIn(token, profile) {
    return {
        type: LOG_IN,
        token: token,
        profile: profile
    };
}

export function logOut() {
    return {
        type: LOG_OUT,
    };
}
