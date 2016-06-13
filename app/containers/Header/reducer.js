/*
 *
 * Header reducer
 *
 */

import {
    LOGGED_IN,
    LOGGED_OUT,
    ACCOUNT_RECEIVED,
    ACCOUNT_UPDATED,
    MARKET_CHANGED
} from "containers/App/constants";
import { deconvert } from "utils/general";

const initialState = {
    isAuthenticated: false,
    isAvatarLoaded: false,
    isAccountLoaded: false,
    isAccountExist: false,
    balance: null,
    address: null,
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


        default:
            return state;
    }
}

export default headerReducer;
