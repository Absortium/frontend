/*
 *
 * ExchangePage reducer
 *
 */

import {LOGGED_IN, LOGGED_OUT, ACCOUNTS_RECEIVED} from "containers/App/constants";

const initialState = {
    isAuthenticated: false,
    accountsLoaded: false,
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

        default:
            return state;
    }
}

export default exchangeBoxReducer;