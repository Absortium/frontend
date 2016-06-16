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
    deconvert,
    normalize
} from "utils/general";
import update from "react-addons-update";

const initialState = {
    marketInfo: null,
    marketInfoLoaded: false,
    to_currency: null
};

function transform(info) {
    var data = {};

    for (var fc in info) {
        for (var tc in info[fc]) {
            data[tc] = data[tc] || {};
            data[tc][fc] = data[tc][fc] || {};

            for (var key in info[fc][tc]) {
                var value = info[fc][tc][key];

                if (key == "volume_24h") {
                    value = deconvert(value, true)
                } else if (key == "rate") {
                    value = normalize(value)
                }

                data[tc][fc][key] = value;
            }
        }
    }
    return data;
}

function marketInfoReducer(state = initialState, action) {
    switch (action.type) {
        case MARKET_INFO_CHANGED:
        case MARKET_INFO_RECEIVED:
        {

            let info = transform(action.marketInfo);
            let newMarketInfo = state.marketInfo || {};

            for (let fc in info) {
                for (let tc in info[fc]) {
                    if(newMarketInfo[fc]) {
                        newMarketInfo = update(newMarketInfo,
                            {
                                [fc]: {
                                    $merge: {
                                        [tc]: info[fc][tc]
                                    }
                                }
                            });
                    } else {
                        newMarketInfo = update(newMarketInfo,
                            {
                                [fc]: {
                                    $set: {
                                        [tc]: info[fc][tc]
                                    }
                                }
                            });
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
                    marketInfoLoaded: false,
                    to_currency: action.to_currency
                });

        default:
            return state;
    }
}

export default marketInfoReducer;