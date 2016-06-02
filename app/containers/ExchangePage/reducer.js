/*
 *
 * ExchangePage reducer
 *
 */

import {LOGGED_IN, LOGGED_OUT} from "containers/App/constants";

const initialState = {
    isAuthenticated: false
};

function exchangePageReducer(state = initialState, action) {
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
        default:
            return state;
    }
}

export default exchangePageReducer;
