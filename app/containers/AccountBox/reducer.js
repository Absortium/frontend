/*
 *
 * AccountBox reducer
 *
 */

import {
    LOGGED_IN,
    LOGGED_OUT,
    ACCOUNT_RECEIVED,
    ACCOUNT_UPDATED,
    MARKET_CHANGED
} from "containers/App/constants";
import {
    normalize
} from "utils/general";
import update from "react/lib/update";

const initialState = {
    isAuthenticated: false,
    isAccountLoaded: false,
    isAccountExist: false,
    accounts: null,
    from_currency: null,
    to_currency: null
};


function accountBoxReducer(state = initialState, action) {
    switch (action.type) {
        case ACCOUNT_UPDATED:
        case ACCOUNT_RECEIVED:
        {
            let isAccountLoaded = action.account != null;
            let isAccountNotEmpty = action.account != {};
            let isAccountExist = isAccountLoaded && isAccountNotEmpty;

            let substate = {
                isAccountLoaded: isAccountLoaded,
                isAccountExist: isAccountExist
            };

            if (isAccountExist) {
                substate.accounts = update(state.accounts || {}, {
                    [action.account.currency]: {
                        $set: {
                            amount: normalize(action.account.amount),
                            address: action.account.address
                        }
                    }
                })
            }

            return Object.assign({}, state, substate);
        }

        case MARKET_CHANGED:
        {
            return Object.assign({}, state,
                {
                    isAccountLoaded: false,
                    isAccountExist: false,
                    from_currency: action.from_currency,
                    to_currency: action.to_currency
                });
        }

        case LOGGED_IN:
            return Object.assign({}, state, {
                isAuthenticated: true
            });

        case LOGGED_OUT:
            return Object.assign({}, state,
                {
                    isAuthenticated: false,
                    isAccountLoaded: false,
                    isAccountExist: false,
                    accounts: null

                });
        default:
            return state;
    }
}

export default accountBoxReducer;
