/*
 *
 * ExchangePage reducer
 *
 */

import {
    OFFERS_RECEIVED,
    MARKET_CHANGED,
    OFFERS_CHANGED
} from "containers/App/constants";
import {
    deconvert,
    normalize
} from "utils/general";
import update from "react/lib/update";

const initialState = {
    offers: {},
    offersLoaded: false
};

function exchangeOffersReducer(state = initialState, action) {
    switch (action.type) {
        case OFFERS_RECEIVED:
        {
            let offers = {};
            for (let offer of action.offers) {
                offers[normalize(offer.price)] = deconvert(parseInt(offer.amount), true)
            }

            return Object.assign({}, state,
                {
                    offers: offers,
                    offersLoaded: true
                });
        }

        case MARKET_CHANGED:
            return Object.assign({}, state,
                {
                    offers: null,
                    offersLoaded: false
                });

        case OFFERS_CHANGED:
        {
            let { price, amount } = action.update;
            return update(state, {
                offers: {
                    [normalize(price)]: { $set: deconvert(parseInt(amount), true) }
                }
            })
        }


        default:
            return state;
    }
}

export default exchangeOffersReducer;