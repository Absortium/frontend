/*
 *
 * ExchangeListBox reducer
 *
 */


import {
    LOGGED_IN,
    MARKET_CHANGED,
    LOGGED_OUT,
    EXCHANGE_HISTORY_RECEIVED,
    EXCHANGE_HISTORY_CHANGED,
    USER_EXCHANGE_HISTORY_RECEIVED
} from "containers/App/constants";
import { updateState } from "utils/general";
import update from "react-addons-update";

const initialState = {
    all_exchanges: null,
    user_exchanges: null,
    isAuthenticated: false,
    isAllExchangesLoaded: false,
    isUserExchangesLoaded: false,
    from_currency: null,
    to_currency: null
};

function exchangeListBoxReducer(state = initialState, action) {
    switch (action.type) {
        case LOGGED_IN:
            return updateState(state, { isAuthenticated: true });

        case LOGGED_OUT:
            return updateState(state, {
                isAuthenticated: false,
                isUserExchangesLoaded: false,
                user_exchanges: null
            });

        case MARKET_CHANGED:
            return updateState(state, {
                isUserExchangesLoaded: false,
                user_exchanges: null,
                from_currency: action.from_currency,
                to_currency: action.to_currency
            });

        case EXCHANGE_HISTORY_CHANGED:
        case EXCHANGE_HISTORY_RECEIVED:
        {
            let newAllExchanges = state.all_exchanges;

            let exchanges = action.exchanges;

            if (newAllExchanges) {
                newAllExchanges = update(newAllExchanges, { $merge: exchanges });
            } else {
                newAllExchanges = update(newAllExchanges, { $set: exchanges });
            }

            return updateState(state, {
                isAllExchangesLoaded: true,
                all_exchanges: newAllExchanges
            });
        }


        case USER_EXCHANGE_HISTORY_RECEIVED:
            return updateState(state, {
                isUserExchangesLoaded: true,
                user_exchanges: action.exchanges
            });


        default:
            return state;
    }
}

export default exchangeListBoxReducer;
