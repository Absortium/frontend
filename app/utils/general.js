/**
 * Created by andrey on 08/06/16.
 */

import Decimal from "decimal.js"

export function isEmpty(value) {
    return value == null || value === ""
}

export function deconvert(value) {
    return Decimal(value) / Decimal(Math.pow(10, 8));

};