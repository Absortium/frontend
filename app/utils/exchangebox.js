import {
  ERROR_FIELD_LT_ZERO,
  ERROR_FIELD_NOT_VALID,
  ERROR_FIELD_IS_REQUIRED
} from "containers/App/constants";
import {
  ERROR_RATE_LT_MIN,
  ERROR_RATE_GT_MAX,
  ERROR_GT_BALANCE,
  ERROR_TOTAL_LT_MIN,
  RATE_MAX,
  RATE_MIN,
  TOTAL_MIN,
  AMOUNT,
  TOTAL
} from "containers/ExchangeBox/constants";
import {
  errExist,
  genParam,
  isValid,
  isEmpty,
  visible
} from "utils/general";
import BigNumber from "bignumber.js";
import { updateState } from "./general";

export function setTotal(_total, state, substate) {
  let error = null;
  let rate = state.rate.value;

  state = updateState(state, substate);

  if (!isEmpty(_total)) {
    if (isValid(_total)) {

      let total = new BigNumber(_total);
      if (total.greaterThan(TOTAL_MIN)) {

        if (state.order_type === "sell" || (state.isAccountExist && !total.greaterThan(state.balance))) {

          if (!errExist(state.rate.error)) {
            let error = null;

            rate = new BigNumber(rate);
            let amount = new BigNumber(total.dividedBy(rate).toPrecision(visible));

            if (amount.lessThan(0)) {
              error = ERROR_FIELD_LT_ZERO;
            } else if (state.order_type === "sell" && amount.greaterThan(state.balance)) {
              error = ERROR_GT_BALANCE
            }
            substate.amount = genParam(amount, error);
          }

        } else {
          error = ERROR_GT_BALANCE
        }
      } else {
        error = ERROR_TOTAL_LT_MIN;
      }
    } else {
      error = ERROR_FIELD_NOT_VALID;
    }
  }

  else {
    substate.amount = genParam("", ERROR_FIELD_IS_REQUIRED);
    error = ERROR_FIELD_IS_REQUIRED;
  }

  substate.total = genParam(_total, error);
  substate.last_changed = TOTAL;
  return [error, substate]
}
export function setAmount(_amount, state, substate) {
  let error = null;
  let rate = state.rate.value;

  state = updateState(state, substate);

  if (!isEmpty(_amount)) {
    if (isValid(_amount)) {
      let amount = new BigNumber(_amount);

      if (amount.greaterThanOrEqualTo(0)) {
        if (state.order_type === "buy" || state.isAccountExist && !amount.greaterThan(state.balance)) {
          if (!errExist(state.rate.error)) {
            let error = null;
            rate = new BigNumber(rate);

            let total = new BigNumber(amount.times(rate).toFixed(visible));
            console.log(visible);
            console.log(total.toString());
            console.log(state.balance.toString());
            console.log(total.greaterThan(state.balance));

            if (total.lessThan(TOTAL_MIN)) {
              error = ERROR_TOTAL_LT_MIN
            } else if (state.order_type === "buy" && total.greaterThan(state.balance)) {
              error = ERROR_GT_BALANCE
            }

            substate.total = genParam(total, error);
          }
        } else {
          error = ERROR_GT_BALANCE
        }
      } else {
        error = ERROR_FIELD_LT_ZERO
      }
    } else {
      error = ERROR_FIELD_NOT_VALID;
    }
  } else {
    error = ERROR_FIELD_IS_REQUIRED;
    substate.total = genParam("", ERROR_FIELD_IS_REQUIRED);
  }

  substate.amount = genParam(_amount, error);
  substate.last_changed = AMOUNT;
  return [error, substate]
}
export function setRate(_rate, state, substate) {
  let error = null;
  let total = state.total.value;
  let amount = state.amount.value;
  let isAccountExist = state.isAccountExist;

  state = updateState(state, substate);

  if (!isEmpty(_rate)) {
    if (isValid(_rate)) {
      let rate = new BigNumber(_rate);

      if (rate.lessThan(RATE_MAX)) {

        if (rate.greaterThanOrEqualTo(RATE_MIN)) {

          if (!errExist(state.amount.error)) {
            let error = null;

            amount = new BigNumber(amount);
            total = rate.times(amount);

            if (total.lessThan(TOTAL_MIN)) {
              error = ERROR_TOTAL_LT_MIN;
            }

            substate.total = genParam(total, error);

          } else if (!errExist(state.total.error)) {
            let error = null;

            total = new BigNumber(total);
            amount = total.divideBy(rate);

            let enoughMoney = !(isAccountExist && amount.greaterThan(state.balance));

            if (!enoughMoney) {
              error = ERROR_GT_BALANCE;
            } else if (amount.lessThan(0)) {
              error = ERROR_FIELD_LT_ZERO;
            }

            substate.amount = genParam(amount, error);
          }
        } else {
          error = ERROR_RATE_LT_MIN
        }
      } else {
        error = ERROR_RATE_GT_MAX
      }
    } else {
      error = ERROR_FIELD_NOT_VALID;
    }
  } else {
    error = ERROR_FIELD_IS_REQUIRED;
    substate.total = genParam("", ERROR_FIELD_IS_REQUIRED);
  }

  substate.rate = genParam(_rate, error);
  return [error, substate]
}