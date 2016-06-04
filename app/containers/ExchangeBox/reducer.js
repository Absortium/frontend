/*
 *
 * ExchangePage reducer
 *
 */

import {LOGGED_IN, LOGGED_OUT, ACCOUNTS_RECEIVED, MARKET_INFO_RECEIVED} from "containers/App/constants";

const initialState = {
    isAuthenticated: false,
    accountsLoaded: false,
    marketInfoLoaded: false,
    marketInfo: null,
    accounts: null
};

function exchangeBoxReducer(state = initialState, action) {
    switch (action.type) {
        case LOGGED_IN:
            return Object.assign({}, state,
                {
                    isAuthenticated: true
                });
        case LOGGED_OUT:
            return Object.assign({}, state,
                {
                    isAuthenticated: false
                });
        case ACCOUNTS_RECEIVED:
            return Object.assign({}, state,
                {
                    accountsLoaded: true,
                    accounts: action.data
                });
        case MARKET_INFO_RECEIVED:
            //TODO: Get from market info only what wee need
            return Object.assign({}, state,
                {
                    marketInfoLoaded: true,
                    marketInfo: action.data
                });

        default:
            return state;
    }
}

export default exchangeBoxReducer;