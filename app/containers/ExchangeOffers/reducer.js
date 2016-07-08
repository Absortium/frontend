/*
 *
 * ExchangePage reducer
 *
 */

import {
  OFFERS_RECEIVED,
  MARKET_CHANGED,
  OFFERS_CHANGED
} from "containers/App/constants";
import { process } from "./utils";
const initialState = {
  offers: [],
  offersLoaded: false,
  pair: null,
  order_type: null
};

function exchangeOffersReducer(state = initialState, action) {
  switch (action.type) {
    case OFFERS_CHANGED:
    case OFFERS_RECEIVED:
    {
      return Object.assign({}, state,
        {
          offers: process(state.offers, action.offers),
          offersLoaded: true
        });
    }

    case MARKET_CHANGED:
      return Object.assign({}, state,
        {
          offers: [],
          offersLoaded: false,
          pair: action.pair,
          order_type: action.order_type
        });

    default:
      return state;
  }
}

export default exchangeOffersReducer;