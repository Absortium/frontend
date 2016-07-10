/*
 *
 * ExchangePage reducer
 *
 */

import {
  LOGGED_IN,
  ACCOUNT_RECEIVED,
  ACCOUNT_UPDATED,
  MARKET_INFO_RECEIVED,
  MARKET_CHANGED,
  MARKET_INFO_CHANGED,
  LOGGED_OUT,
  EXCHANGE_CREATED,
  SEND_EXCHANGE
} from "containers/App/constants";
import {
  CHANGE_AMOUNT,
  CHANGE_RATE,
  CHANGE_TOTAL,
  ERROR_GT_BALANCE,
  ERROR_NOT_TOUCHED,
  SUBSTITUTE_BALANCE,
  SUBSTITUTE_RATE,
  AMOUNT,
  TOTAL
} from "./constants";
import { SUBSTITUTE_OFFER } from "containers/ExchangeOffers/constants";
import {
  isDirty,
  updateState,
  representation
} from "utils/general";
import {
  setAmount,
  setRate,
  setTotal
} from "utils/exchangebox";
import BigNumber from "bignumber.js";

const initialState = {
  isAuthenticated: false,
  isRateLoaded: false,
  isAccountExist: false,
  isAccountLoaded: false,
  balance: null,
  address: null,
  market_rate: null,
  last_changed: null,

  rate: {
    value: null,
    error: ERROR_NOT_TOUCHED
  },
  amount: {
    value: null,
    error: ERROR_NOT_TOUCHED
  },
  total: {
    value: null,
    error: ERROR_NOT_TOUCHED
  },

  order_type: null,
  pair: null,
  from_currency: null,
  to_currency: null,

  disabled: false
};


function exchangeBoxReducer(state = initialState, action) {
  switch (action.type) {
    case LOGGED_IN:
      return updateState(state, { isAuthenticated: true });

    case ACCOUNT_UPDATED:
    case ACCOUNT_RECEIVED:
    {
      if (action.account.currency == state.from_currency) {
        let isAccountLoaded = action.account != null;
        let isAccountNotEmpty = action.account != {};
        let isAccountExist = isAccountLoaded && isAccountNotEmpty;

        let substate = {
          isAccountLoaded: isAccountLoaded,
          isAccountExist: isAccountExist
        };

        if (isAccountExist) {
          let error = null;
          let amount = action.account.amount;

          substate.balance = new BigNumber(amount);

          if (state.order_type == "sell") {
            if (!isDirty(state.amount.value)) {
              [error, substate] = setAmount(representation(substate.balance), state, substate);
            }

          } else if (state.order_type == "buy") {
            if (!isDirty(state.total.value)) {
              [error, substate] = setTotal(representation(substate.balance), state, substate);
            }
          }
        }

        return updateState(state, substate);
      } else {
        return state
      }
    }

    case MARKET_INFO_CHANGED:
    case MARKET_INFO_RECEIVED:
    {
      if (state.pair == action.marketInfo.pair) {
        let substate = {
          isRateLoaded: true
        };

        let error = null;
        let market_rate = new BigNumber(action.marketInfo.rate);

        substate.market_rate = market_rate;

        if (!isDirty(state.rate.value)) {
          [error, substate] = setRate(market_rate, state, substate);
        }

        return updateState(state, substate);
      } else {
        return state;
      }
    }


    case CHANGE_AMOUNT:
    {
      let substate = {};
      let error = null;

      [error, substate] = setAmount(action.amount, state, substate);
      return updateState(state, substate);
    }


    case CHANGE_TOTAL:
    {
      let substate = {};
      let error = null;

      [error, substate] = setTotal(action.total, state, substate);
      return updateState(state, substate);
    }

    case CHANGE_RATE:
    {
      let substate = {};
      let error = null;

      [error, substate] = setRate(action.rate, state, substate);
      return updateState(state, substate);

    }

    case MARKET_CHANGED:
    {
      return updateState(state, {
        isRateLoaded: false,
        isAccountExist: false,
        isAccountLoaded: false,
        balance: null,
        address: null,
        market_rate: null,
        last_changed: null,

        rate: {
          value: null,
          error: ERROR_NOT_TOUCHED
        },
        amount: {
          value: null,
          error: ERROR_NOT_TOUCHED
        },
        total: {
          value: null,
          error: ERROR_NOT_TOUCHED
        },

        order_type: action.order_type,
        pair: action.pair,
        from_currency: action.from_currency,
        to_currency: action.to_currency,

        disabled: false
      });
    }

    case SEND_EXCHANGE:
      return updateState(state, {
        disabled: true
      });

    case EXCHANGE_CREATED:
      return updateState(state, {
        amount: {
          value: null,
          error: ERROR_NOT_TOUCHED
        },
        total: {
          value: null,
          error: ERROR_NOT_TOUCHED
        },
        disabled: false
      });

    case LOGGED_OUT:
      return updateState(state, {
        isAccountExist: false,
        isAccountLoaded: false,
        balance: null,
        address: null
      });


    case SUBSTITUTE_RATE:
    {
      if (state.isRateLoaded) {

        let substate = {};
        let error = null;

        [error, substate] = setRate(state.market_rate, state, substate);
        return updateState(state, substate)
      } else {
        return state
      }
    }

    case SUBSTITUTE_BALANCE:
    {
      if (state.isAccountLoaded) {
        let substate = {};
        let error = null;

        if (action.field == AMOUNT) {
          [error, substate] = setAmount(state.balance, state, substate);
        } else if (action.field == TOTAL) {
          [error, substate] = setTotal(state.balance, state, substate);
        }


        return updateState(state, substate)
      } else {
        return state
      }
    }

    case SUBSTITUTE_OFFER:
    {
      let substate = {};
      let error = null;
      let newState = state;

      [error, substate] = setRate(action.price, newState, substate);
      newState = updateState(newState, substate);

      [error, substate] = setAmount(action.amount, newState, substate);
      newState = updateState(newState, substate);

      if (newState.amount.error == ERROR_GT_BALANCE) {
        let error = null;

        [error, substate] = setAmount(newState.balance, newState, substate);
        newState = updateState(newState, substate);
      }

      return newState
    }

    default:
      return state;
  }
}


export default exchangeBoxReducer;