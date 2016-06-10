/*
 *
 * ExchangePage reducer
 *
 */

import {
    MARKET_INFO_RECEIVED,
    MARKET_CHANGED
} from "containers/App/constants";

const initialState = {
    marketInfo: null,
    marketInfoLoaded: false
};

function marketInfoReducer(state = initialState, action) {
    switch (action.type) {
        case MARKET_INFO_RECEIVED:
            return Object.assign({}, state,
                {
                    marketInfoLoaded: true,
                    marketInfo: action.marketInfo
                });
        case MARKET_CHANGED:
            return Object.assign({}, state,
                {
                    marketInfo: null,
                    marketInfoLoaded: false
                });
        
        default:
            return state;
    }
}

export default marketInfoReducer;