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


import {
    LOG_IN,
    LOGGED_IN,
    LOG_OUT,
    LOGGED_OUT,
    ACCOUNTS_RECEIVED,
    MARKET_CHANGED,
    MARKET_INFO_RECEIVED,
    OFFERS_RECEIVED
} from "./constants";

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


export function loggedIn(token, profile) {
    return {
        type: LOGGED_IN,
        token,
        profile
    };
}

export function loggedOut() {
    return {
        type: LOGGED_OUT
    };
}

export function accountsReceived(accounts) {
    return {
        type: ACCOUNTS_RECEIVED,
        accounts
    };
}

export function marketChanged(from_currency, to_currency) {
    return {
        type: MARKET_CHANGED,
        from_currency,
        to_currency
    };
}

export function marketInfoReceived(marketInfo) {
    return {
        type: MARKET_INFO_RECEIVED,
        marketInfo
    };
}

export function offerReceived(offers) {
    return {
        type: OFFERS_RECEIVED,
        offers
    };
}