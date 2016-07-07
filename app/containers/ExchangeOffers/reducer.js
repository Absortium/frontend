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
  from_currency: null,
  to_currency: null
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
          from_currency: action.from_currency,
          to_currency: action.to_currency
        });

    default:
      return state;
  }
}

export default exchangeOffersReducer;