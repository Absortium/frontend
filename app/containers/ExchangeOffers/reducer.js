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
import {
  transform,
  clean,
  merge,
  insertOffer,
  sortOffers
} from "./utils";
const initialState = {
  offers: [],
  offersLoaded: false,
  pair: null,
  order_type: null
};

function exchangeOffersReducer(state = initialState, action) {
  switch (action.type) {
    case OFFERS_RECEIVED:
    {
      let offers = Object.assign([], action.offers);
      offers = transform(offers);
      offers = sortOffers(offers);

      return Object.assign({}, state,
        {
          offers: offers,
          offersLoaded: true
        });
    }
    case OFFERS_CHANGED:
    {

      let newOffers = Object.assign([], action.offers);
      let offers = Object.assign([], state.offers);

      newOffers = transform(newOffers);

      for (let offer of newOffers) {
        offers = insertOffer(offer, offers);
      }

      return Object.assign({}, state,
        {
          offers: offers,
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