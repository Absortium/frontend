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

const initialState = {
    offers: {},
    offersLoaded: false,
    from_currency: null,
    to_currency: null
};

function exchangeOffersReducer(state = initialState, action) {
    switch (action.type) {
        case OFFERS_CHANGED:
        case OFFERS_RECEIVED:
        {
            let offers = state.offers || {};

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
                    offersLoaded: false,
                    from_currency: action.from_currency,
                    to_currency: action.to_currency
                });

        default:
            return state;
    }
}

export default exchangeOffersReducer;