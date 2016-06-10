/*
 *
 * Header reducer
 *
 */

import {
    LOGGED_IN,
    LOGGED_OUT,
    ACCOUNTS_RECEIVED,
    MARKET_CHANGED
} from "containers/App/constants";
import { deconvert } from "utils/general";

const initialState = {
    isAuthenticated: false,
    isAvatarLoaded: false,
    isAccountLoaded: false,
    isAccountExist: false,
    account: null,
    from_currency: null,
    to_currency: null,
    avatar: null
};

function headerReducer(state = initialState, action) {
    switch (action.type) {
        case LOGGED_IN:
            let substate = {
                isAuthenticated: true
            };

            let isAvatarLoaded = action.profile.picture != null;
            if (isAvatarLoaded) {
                substate.avatar = action.profile.picture;
                substate.isAvatarLoaded = isAvatarLoaded;
            }

            return Object.assign({}, state, substate);

        case LOGGED_OUT:
            return Object.assign({}, state,
                {
                    isAuthenticated: false,
                    isAvatarLoaded: false,
                    isAccountLoaded: false,
                    isAccountExist: false,
                    avatar: null,
                    account: null

                });

        case ACCOUNTS_RECEIVED:
        {
            let isAccountLoaded = action.accounts[state.from_currency] != null;
            let isAccountNotEmpty = action.accounts[state.from_currency] != {};
            let isAccountExist = isAccountLoaded && isAccountNotEmpty;

            let substate = {
                isAccountLoaded: isAccountLoaded,
                isAccountExist: isAccountExist
            };

            if (isAccountExist) {
                let account = action.accounts[state.from_currency];
                account.balance = deconvert(parseInt(account.amount));
                substate.account = account;
            }

            return Object.assign({}, state, substate);
        }

        case MARKET_CHANGED:
        {
            return Object.assign({}, state,
                {
                    isAccountLoaded: false,
                    isAccountExist: false,
                    account: null,   
                    from_currency: action.from_currency,
                    to_currency: action.to_currency
                });
        }


        default:
            return state;
    }
}

export default headerReducer;
