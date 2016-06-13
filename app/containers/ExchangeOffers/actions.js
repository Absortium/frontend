/**
 * Created by andrey on 12/06/16.
 */

import {SUBSTITUTE_EXCHANGE} from "./constants"

export function substituteExchange(amount, price) {
    return {
        type: SUBSTITUTE_EXCHANGE,
        amount,
        price
    };
}