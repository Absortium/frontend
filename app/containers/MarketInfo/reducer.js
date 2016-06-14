/*
 *
 * ExchangePage reducer
 *
 */

import {
    MARKET_INFO_RECEIVED,
    MARKET_CHANGED,
    MARKET_INFO_CHANGED
} from "containers/App/constants";
import {
    copy,
    deconvert,
    normalize
} from "utils/general";

const initialState = {
    marketInfo: null,
    marketInfoLoaded: false
};

function marketInfoReducer(state = initialState, action) {
    switch (action.type) {
        case MARKET_INFO_CHANGED:
        case MARKET_INFO_RECEIVED:
        {
            console.log(action.marketInfo);
            let newMarketInfo = state.marketInfo || {};
            for (let from_currency in action.marketInfo) {

                let info = action.marketInfo[from_currency];

                if (newMarketInfo[from_currency] == null) {
                    newMarketInfo[from_currency] = {};
                }

                for (let to_currency in info) {
                    let data = info[to_currency];
                    newMarketInfo[from_currency][to_currency] = {};

                    for (let key in data) {
                        let value = data[key];

                        if (key == "volume_24h") {
                            value = deconvert(value, true)
                        } else if (key == "rate") {
                            value = normalize(value)
                        }

                        newMarketInfo[from_currency][to_currency][key] = value;
                    }
                }
            }

            return Object.assign({}, state,
                {
                    marketInfoLoaded: true,
                    marketInfo: newMarketInfo
                });
        }

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