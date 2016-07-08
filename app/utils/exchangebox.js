import { ERROR_FIELD_LT_ZERO } from "containers/App/constants";
import {
    ERROR_RATE_LT_MIN,
    ERROR_RATE_GT_MAX,
    ERROR_FROM_AMOUNT_GT_BALANCE,
    ERROR_TO_AMOUNT_LT_MIN,
    RATE_MAX,
    RATE_MIN,
    TO_AMOUNT_MIN,
    FROM_AMOUNT,
    TO_AMOUNT
} from "containers/ExchangeBox/constants";
import {
    errExist,
    genParam
} from "utils/general";
import BigNumber from "bignumber.js";

export function setToAmount(to_amount, state, substate) {
    let error = null;
    let rate = state.rate.value;
    let isAccountExist = state.isAccountExist;

    to_amount = new BigNumber(to_amount);

    if (to_amount.greaterThan(TO_AMOUNT_MIN)) {
        if (!errExist(state.rate.error)) {
            let error = null;

            rate = new BigNumber(rate);

            let amount = to_amount.dividedBy(rate);
            let notEnoughMoney = isAccountExist && amount.greaterThan(state.balance);

            if (notEnoughMoney) {
                error = ERROR_FROM_AMOUNT_GT_BALANCE;
            } else if (amount.lessThan(0)) {
                error = ERROR_FIELD_LT_ZERO;
            }

            substate.amount = genParam(amount, error);
        }
    } else {
        error = ERROR_TO_AMOUNT_LT_MIN;
    }
  
    substate.last_changed = TO_AMOUNT;
    return [error, substate]
}
export function setFromAmount(amount, state, substate) {

    let error = null;
    let rate = state.rate.value;

    amount = new BigNumber(amount);

    if (amount.greaterThanOrEqualTo(0)) {

        let enoughMoney = !(state.isAccountExist && amount.greaterThan(state.balance));

        if (enoughMoney) {
            if (!errExist(state.rate.error)) {
                let error = null;
                rate = new BigNumber(rate);

                let to_amount = amount.times(rate);

                if (to_amount.lessThan(TO_AMOUNT_MIN)) {
                    error = ERROR_TO_AMOUNT_LT_MIN
                }

                substate.total = genParam(to_amount, error);
            }
        } else {
            error = ERROR_FROM_AMOUNT_GT_BALANCE
        }
    } else {
        error = ERROR_FIELD_LT_ZERO
    }
  
    substate.last_changed = FROM_AMOUNT;
    return [error, substate]
}
export function setRate(rate, state, substate) {
    let error = null;
    let to_amount = state.total.value;
    let amount = state.amount.value;
    let isAccountExist = state.isAccountExist;

    rate = new BigNumber(rate);

    if (rate.lessThan(RATE_MAX)) {

        if (rate.greaterThanOrEqualTo(RATE_MIN)) {

            if (!errExist(state.amount.error)) {
                let error = null;

                amount = new BigNumber(amount);
                to_amount = rate.times(amount);

                if (to_amount.lessThan(TO_AMOUNT_MIN)) {
                    error = ERROR_TO_AMOUNT_LT_MIN;
                }

                substate.total = genParam(to_amount, error);

            } else if (!errExist(state.total.error)) {
                let error = null;

                to_amount = new BigNumber(to_amount);
                amount = to_amount.divideBy(rate);

                let enoughMoney = !(isAccountExist && amount.greaterThan(state.balance));

                if (!enoughMoney) {
                    error = ERROR_FROM_AMOUNT_GT_BALANCE;
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
  
    return [error, substate]
}