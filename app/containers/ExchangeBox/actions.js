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
    CHANGE_FROM_AMOUNT,
    CHANGE_RATE,
    CHANGE_TO_AMOUNT,
    EXCHANGE_CREATED
} from "./constants";

export function changeFromAmount(from_amount) {
    return {
        type: CHANGE_FROM_AMOUNT,
        from_amount
    };
}

export function changeToAmount(to_amount) {
    return {
        type: CHANGE_TO_AMOUNT,
        to_amount
    };
}


export function changeRate(rate) {
    return {
        type: CHANGE_RATE,
        rate
    };
}

export function exchangeCreated(exchange) {
    return {
        type: EXCHANGE_CREATED,
        exchange
    };
}