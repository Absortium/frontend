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
import { normalize } from "utils/general";
import update from "react/lib/update";

const initialState = {
    isAuthenticated: false,
    isAccountLoaded: false,
    isAccountExist: false,
    accounts: null
};


function accountBoxReducer(state = initialState, action) {
    switch (action.type) {
        case ACCOUNT_UPDATED:
        case ACCOUNT_RECEIVED:
        {
            const substate = {
                isAccountLoaded: !!action.account,
                isAccountExist: !!action.account && Object.keys(action.account).length > 0
            };

            if (substate.isAccountExist) {
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
                    isAccountExist: false
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
