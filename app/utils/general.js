/**
 * Created by andrey on 08/06/16.
 */

import BigNumber from "bignumber.js";
import {
    ERROR_RATE_LT_MIN,
    ERROR_RATE_GT_MAX,
    ERROR_FROM_AMOUNT_GT_BALANCE,
    ERROR_TO_AMOUNT_LT_MIN,
    TO_AMOUNT_MIN,
    RATE_MIN,
    RATE_MAX
} from "containers/ExchangeBox/constants";
import {
    ERROR_WITHDRAWAL_AMOUNT_GT_BALANCE,
    ERROR_WITHDRAWAL_AMOUNT_LT_MIN,
    WITHDRAWAL_AMOUNT_MIN
} from "containers/WithdrawalDialog/constants";
import {
    ERROR_FIELD_IS_REQUIRED,
    ERROR_FIELD_NOT_VALID,
    ERROR_FIELD_LT_ZERO
} from "containers/App/constants";
import Q from "q";

const precision = 8;

export function isEmpty(value) {
    return value == null || value === ""
}

export function isDirty(value) {
    return value != null
}

export function deconvert(value, withPrecision = false) {
    if (withPrecision) {
        return (value / new BigNumber(Math.pow(10, precision))).toPrecision(precision);
    } else {
        return value / new BigNumber(Math.pow(10, precision));
    }
}

export function normalize(value) {

    return new BigNumber(value).toPrecision(precision);
}
export function convert(value) {
    return Math.round(new BigNumber(value) * Math.pow(10, precision));

}

export function isValid(value) {
    try {
        new BigNumber(value);
        return true
    } catch (err) {
        return false
    }
}

export function errExist(error) {
    return error != null
}
export function num2str(value) {
    return value + ''
}

export function cut(value) {

    // cut all numbers after 8th.
    value = value.toPrecision(precision);

    // make from this string and cut the zeros
    value = parseFloat(value.toString());

    return value.toString();
}

export function getErrorText(error) {
    switch (error) {
        case ERROR_FIELD_NOT_VALID:
            return "This field is not valid";

        case ERROR_FIELD_IS_REQUIRED:
            return "This field is required";

        case ERROR_RATE_LT_MIN:
            return "Rate is lower than " + RATE_MIN;

        case ERROR_RATE_GT_MAX:
            return "Rate is greater than " + RATE_MAX;

        case ERROR_FROM_AMOUNT_GT_BALANCE:
            return "Not enough money";

        case ERROR_TO_AMOUNT_LT_MIN:
            return "Total amount lower than " + TO_AMOUNT_MIN;

        case ERROR_FIELD_LT_ZERO:
            return "Field is negative";

        case ERROR_WITHDRAWAL_AMOUNT_GT_BALANCE:
            return "Not enough money";

        case ERROR_WITHDRAWAL_AMOUNT_LT_MIN:
            return "Withdrawal amount lower than " + WITHDRAWAL_AMOUNT_MIN;

        default:
            return null
    }
}

export function convertCurrencyName(short) {
    switch (short) {
        case 'btc':
            return 'bitcoin';
        case 'eth':
            return 'ethereum';
    }

}

export function setIntervalGenerator(g, ...args) {
    let fn = function () {
        let c = g();

        let r = c.next();
        while (!r.done) {
            r = c.next();
        }
    };

    setInterval(fn, ...args);
}

export function setTimeoutGenerator(g, ...args) {
    let fn = function () {
        let c = g();

        let r = c.next();
        while (!r.done) {
            r = c.next();
        }
    };

    setTimeout(fn, ...args);
}

export function sleep(millis) {
    var deferredResult = Q.defer();
    setTimeout(function () {
        deferredResult.resolve();
    }, millis);
    return deferredResult.promise;
}

export function include(arr, obj) {
    return (arr.indexOf(obj) != -1);
}

export function extractCurrencies(s) {
    let r = /\/exchange\/(btc|eth)-(eth|btc)/g;
    return r.exec(s);
}

export function genParam(value, error) {
    if (typeof value == "number" || typeof value == "object") value = cut(value);

    return {
        value: value,
        error: error
    }
}

export function copy(obj) {
    return JSON.parse(JSON.stringify(obj))
}

export function pprint(obj) {
    console.log(JSON.stringify(obj, null, 2));
}