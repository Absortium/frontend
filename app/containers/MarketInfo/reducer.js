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
  normalize,
  getPrimaryCurrency,
  getSecondaryCurrency
} from "utils/general";
import update from "react-addons-update";
import { pprint } from "../../utils/general";

const initialState = {
  marketInfo: null,
  marketInfoLoaded: false,
  to_currency: null
};

function transform(info) {
  var data = {};

  pprint(info);

  let pc = getPrimaryCurrency(info.pair);
  let sc = getSecondaryCurrency(info.pair);

  data[pc] = data[pc] || {};
  data[pc][sc] = data[pc][sc] || {};

  for (var key in info) {
    var value = info[key];

    if (key == "volume_24h") {
      value = normalize(value)
    } else if (key == "rate") {
      value = normalize(value)
    }

    data[pc][sc][key] = value;
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

      for (let pc in info) {
        for (let sc in info[pc]) {
          if (newMarketInfo[pc]) {
            newMarketInfo = update(newMarketInfo,
              {
                [pc]: {
                  $merge: {
                    [sc]: info[pc][sc]
                  }
                }
              });
          } else {
            newMarketInfo = update(newMarketInfo,
              {
                [pc]: {
                  $set: {
                    [sc]: info[pc][sc]
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