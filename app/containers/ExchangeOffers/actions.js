/**
 * Created by andrey on 12/06/16.
 */

import {SUBSTITUTE_OFFER} from "./constants"

export function substituteOffer(amount, price) {
    return {
        type: SUBSTITUTE_OFFER,
        amount,
        price
    };
}