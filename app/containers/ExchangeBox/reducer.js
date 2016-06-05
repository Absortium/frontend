/*
 *
 * ExchangePage reducer
 *
 */

import {LOGGED_IN, LOGGED_OUT, ACCOUNTS_RECEIVED, MARKET_CHANGED, MARKET_INFO_RECEIVED} from "containers/App/constants";

const initialState = {
    isAuthenticated: false,
    isRateLoaded: false,
    isAccountExist: false,
    isAccountLoaded: false,
    rate: null,
    account: null,
    from_currency: null,
    to_currency: null,
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
            let isAccountLoaded = action.accounts[state.from_currency] != null;
            let isAccountExist = action.accounts[state.from_currency] != {};
            let account = isAccountLoaded && isAccountExist ? action.accounts[state.from_currency] : null;

            if (account != null) {
                account['amount'] = parseFloat(account['amount'])
            }

            return Object.assign({}, state,
                {
                    isAccountLoaded: isAccountLoaded,
                    isAccountExist: isAccountLoaded && isAccountExist,
                    account: account
                });
        case MARKET_INFO_RECEIVED:
            return Object.assign({}, state,
                {
                    isRateLoaded: true,
                    rate: parseFloat(action.marketInfo[state.from_currency][state.to_currency].rate)
                });

        case MARKET_CHANGED:
            return Object.assign({}, state,
                {
                    from_currency: action.from_currency,
                    to_currency: action.to_currency,
                });

        default:
            return state;
    }
}

export default exchangeBoxReducer;