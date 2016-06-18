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
    normalize
} from "utils/general";
import update from "react-addons-update";

const initialState = {
    offers: {},
    offersLoaded: false,
    from_currency: null,
    to_currency: null
};

function transform(offers) {
    let data = {};
    for (let offer of offers) {
        let price = normalize(offer.price);
        data[price] = normalize(offer.amount);
    }

    return data;
}

function exchangeOffersReducer(state = initialState, action) {
    switch (action.type) {
        case OFFERS_CHANGED:
        case OFFERS_RECEIVED:
        {
            let newOffers = state.offers;

            let offers = transform(action.offers);

            if (newOffers) {
                newOffers = update(newOffers, { $merge: offers });
            } else {
                newOffers = update(newOffers, { $set: offers });
            }

            for (let price in newOffers) {
                let amount = newOffers[price];
                if (amount == 0) {
                    delete newOffers[price];
                }
            }

            return Object.assign({}, state,
                {
                    offers: newOffers,
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