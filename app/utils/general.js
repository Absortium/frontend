/**
 * Created by andrey on 08/06/16.
 */

import Decimal from "decimal.js";

export function isEmpty(value) {
    return value == null || value === ""
}

export function isDirty(value) {
    return value != null
}

export function deconvert(value) {
    return value / Decimal(Math.pow(10, 8))

}
export function convert(value) {
    return Math.round(Decimal(value) * Math.pow(10, 8));

}

export function isConvertable(value) {
    try {
        Decimal(value);
        return true
    } catch (err) {
        return false
    }
}

export function errExist(error) {
    return error != null
}
export function num2str(value){
    return value + ''
}