/*
 *
 * ExchangePage reducer
 *
 */

import {fromJS} from "immutable";
import {LOG_IN, LOG_OUT} from "containers/Header/constants";

// const initialState = fromJS({
//     token: null,
//     profile: null
// });

function exchangePageReducer(state = {
    token: null,
    profile: null
}, action) {
    switch (action.type) {
        case LOG_IN:
            return Object.assign({}, state,
                {
                    token: action.token,
                    profile: action.profile
                });
        case LOG_OUT:
            return Object.assign({}, state,
                {
                    token: action.token,
                    profile: action.profile
                });
        default:
            return state;
    }
}

export default exchangePageReducer;
