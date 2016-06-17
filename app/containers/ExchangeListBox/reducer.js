/*
 *
 * ExchangeListBox reducer
 *
 */


import {
    LOGGED_IN,
    MARKET_CHANGED,
    LOGGED_OUT,
    ALL_EXCHANGE_HISTORY_RECEIVED,
    USER_EXCHANGE_HISTORY_RECEIVED
} from "containers/App/constants";
import {
    update,
    deconvert,
    normalize
} from "utils/general";

const initialState = {
    all_exchanges: null,
    user_exchanges: null,
    isAuthenticated: false,
    isAllExchangesLoaded: false,
    isUserExchangesLoaded: false,
    from_currency: null,
    to_currency: null
};

function transform(exchanges) {
    let newExchanges = [];

    for (let exchange of exchanges) {
        let newExchange = {};

        for (let key in exchange) {
            let value = exchange[key];

            if (key == "amount") {
                value = normalize(deconvert(value));
            } else if (key == "price") {
                value = normalize(value)
            }

            newExchange[key] = value;
        }

        newExchanges.push(newExchange)
    }

    return newExchanges
}
function exchangeListBoxReducer(state = initialState, action) {
    switch (action.type) {
        case LOGGED_IN:
            return update(state, { isAuthenticated: true });

        case LOGGED_OUT:
            return update(state, {
                isAuthenticated: false,
                isUserExchangesLoaded: false,
                user_exchanges: null
            });

        case MARKET_CHANGED:
            return update(state, {
                isUserExchangesLoaded: false,
                user_exchanges: null,
                from_currency: action.from_currency,
                to_currency: action.to_currency
            });

        case ALL_EXCHANGE_HISTORY_RECEIVED:
            return update(state, {
                isAllExchangesLoaded: true,
                all_exchanges: transform(action.exchanges)
            });


        case USER_EXCHANGE_HISTORY_RECEIVED:
            return update(state, {
                isUserExchangesLoaded: true,
                user_exchanges: transform(action.exchanges)
            });


        default:
            return state;
    }
}

export default exchangeListBoxReducer;
