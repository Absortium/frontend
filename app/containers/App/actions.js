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
    ACCOUNT_RECEIVED,
    ACCOUNT_UPDATED,
    MARKET_CHANGED,
    MARKET_INFO_RECEIVED,
    OFFERS_RECEIVED,
    OFFERS_CHANGED,
    TOPIC_SUBSCRIBE,
    TOPIC_UPDATE,
    TOPIC_SUBSCRIBE_SUCCESS,
    TOPIC_SUBSCRIBE_FAILED,
    EXCHANGE_CREATED,
    WITHDRAWAL_CREATED,
    SEND_EXCHANGE,
    SEND_WITHDRAWAL
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

export function accountReceived(account) {
    return {
        type: ACCOUNT_RECEIVED,
        account
    };
}

export function accountUpdated(account) {
    return {
        type: ACCOUNT_UPDATED,
        account
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

export function offersChanged(update) {
    return {
        type: OFFERS_CHANGED,
        update
    };
}

export function subscribeOnTopic(topic) {
    return {
        type: TOPIC_SUBSCRIBE,
        topic
    };
}

export function subscribeSuccess(topic) {
    return {
        type: TOPIC_SUBSCRIBE_SUCCESS,
        topic
    };
}

export function subscribeFailed(topic, error = null) {
    return {
        type: TOPIC_SUBSCRIBE_FAILED,
        topic,
        error
    };
}

export function topicUpdate(topic, data) {
    return {
        type: TOPIC_UPDATE,
        topic,
        data
    };
}

export function sendExchange(from_currency, to_currency, amount, price) {
    return {
        type: SEND_EXCHANGE,
        from_currency,
        to_currency,
        amount,
        price
    };
}

export function exchangeCreated(exchanges) {
    return {
        type: EXCHANGE_CREATED,
        exchanges
    };
}

export function sendWithdrawal(amount, address, pk) {
    return {
        type: SEND_WITHDRAWAL,
        amount,
        address,
        pk
    };
}

export function withdrawalCreated(withdrawal) {
    return {
        type: WITHDRAWAL_CREATED,
        withdrawal
    };
}