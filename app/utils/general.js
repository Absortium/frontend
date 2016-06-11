/**
 * Created by andrey on 08/06/16.
 */

import BigNumber from "bignumber.js";
import {
    ERROR_FIELD_IS_REQUIRED,
    ERROR_FIELD_NOT_VALID,
    ERROR_RATE_LT_MIN,
    ERROR_RATE_GT_MAX,
    ERROR_FROM_AMOUNT_GT_BALANCE,
    ERROR_TO_AMOUNT_LT_MIN,
    ERROR_FIELD_LT_ZERO,
    TO_AMOUNT_MIN,
    RATE_MIN,
    RATE_MAX
} from "../containers/ExchangeBox/constants";
import Q from "q";

const precision = 8;

export function isEmpty(value) {
    return value == null || value === ""
}

export function isDirty(value) {
    return value != null
}

export function deconvert(value) {
    return value / new BigNumber(Math.pow(10, precision))

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
    return new BigNumber((value.toPrecision(precision)).toString());
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

        default:
            return null
    }
}

export function convertCurrencyName(short) {
    switch (short) {
        case 'btc':
            return 'Bitcoin';
        case 'eth':
            return 'Ethereum';
    }

}

export function sleep(millis) {
    var deferredResult = Q.defer();
    setTimeout(function () {
        deferredResult.resolve();
    }, millis);
    return deferredResult.promise;
}

export function include(arr,obj) {
    return (arr.indexOf(obj) != -1);
}

export function extractCurrencies(s) {
    let r = /\/exchange\/(btc|eth)-(eth|btc)/g;
    return r.exec(s);
}

export function genParam(value, error) {
    return {
        value: num2str(value),
        error: error
    }
}