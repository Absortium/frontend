/*
 *
 * ExchangePage reducer
 *
 */

import {
    OFFERS_RECEIVED,
    MARKET_CHANGED
} from "containers/App/constants";

const initialState = {
    offers: null,
    offersLoaded: false
};

function exchangeOffersReducer(state = initialState, action) {
    switch (action.type) {
        case OFFERS_RECEIVED:
            return Object.assign({}, state,
                {
                    offers: action.offers,
                    offersLoaded: true
                });
        case MARKET_CHANGED:
            return Object.assign({}, state,
                {
                    offers: null,
                    offersLoaded: false
                });
        
        default:
            return state;
    }
}

export default exchangeOffersReducer;