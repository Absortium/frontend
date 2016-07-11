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
    CHANGE_AMOUNT,
    CHANGE_RATE,
    CHANGE_TOTAL,
    SUBSTITUTE_RATE,
    SUBSTITUTE_BALANCE
} from "./constants";

export function changeAmount(amount) {
    return {
        type: CHANGE_AMOUNT,
        amount
    };
}

export function changeTotal(total) {
    return {
        type: CHANGE_TOTAL,
        total
    };
}


export function changeRate(rate) {
    return {
        type: CHANGE_RATE,
        rate
    };
}

export function substituteRate() {
    return {
        type: SUBSTITUTE_RATE,
    };
}

export function substituteBalance(field) {
    return {
        type: SUBSTITUTE_BALANCE,
        field
    };
}