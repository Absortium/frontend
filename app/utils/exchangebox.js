import { ERROR_FIELD_LT_ZERO } from "containers/App/constants";
import {
    ERROR_RATE_LT_MIN,
    ERROR_RATE_GT_MAX,
    ERROR_FROM_AMOUNT_GT_BALANCE,
    ERROR_TO_AMOUNT_LT_MIN,
    RATE_MAX,
    RATE_MIN,
    TO_AMOUNT_MIN
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

    if (to_amount > TO_AMOUNT_MIN) {
        if (!errExist(state.rate.error)) {
            let error = null;

            rate = new BigNumber(rate);
            let from_amount = to_amount / rate;
            let enoughMoney = !(isAccountExist && from_amount > state.balance);

            if (!enoughMoney) {
                error = ERROR_FROM_AMOUNT_GT_BALANCE;
            } else if (from_amount < 0) {
                error = ERROR_FIELD_LT_ZERO;
            }

            substate.from_amount = genParam(from_amount, error);
        }
    } else {
        error = ERROR_TO_AMOUNT_LT_MIN;
    }

    return [error, substate]
}
export function setFromAmount(from_amount, state, substate) {

    let error = null;
    let rate = state.rate.value;

    from_amount = new BigNumber(from_amount);

    if (from_amount >= 0) {
        let enoughMoney = !(state.isAccountExist && from_amount > state.balance);

        if (enoughMoney) {
            if (!errExist(state.rate.error)) {
                let error = null;
                rate = new BigNumber(rate);

                let to_amount = from_amount * rate;

                if (to_amount < TO_AMOUNT_MIN) {
                    error = ERROR_TO_AMOUNT_LT_MIN
                }

                substate.to_amount = genParam(to_amount, error);
            }
        } else {
            error = ERROR_FROM_AMOUNT_GT_BALANCE
        }
    } else {
        error = ERROR_FIELD_LT_ZERO
    }

    return [error, substate]
}
export function setRate(rate, state, substate) {
    let error = null;
    let to_amount = state.to_amount.value;
    let from_amount = state.from_amount.value;
    let isAccountExist = state.isAccountExist;

    rate = new BigNumber(rate);

    if (rate < RATE_MAX) {
        if (rate > RATE_MIN) {
            if (!errExist(state.from_amount.error)) {
                let error = null;

                from_amount = new BigNumber(from_amount);
                to_amount = rate * from_amount;

                if (to_amount < TO_AMOUNT_MIN) {
                    error = ERROR_TO_AMOUNT_LT_MIN;
                }

                substate.to_amount = genParam(to_amount, error);

            } else if (!errExist(state.to_amount.error)) {
                let error = null;

                to_amount = new BigNumber(to_amount);
                from_amount = to_amount / rate;

                let enoughMoney = !(isAccountExist && from_amount > state.balance);

                if (!enoughMoney) {
                    error = ERROR_FROM_AMOUNT_GT_BALANCE;
                } else if (from_amount < 0) {
                    error = ERROR_FIELD_LT_ZERO;
                }

                substate.from_amount = genParam(from_amount, error);
            }
        } else {
            error = ERROR_RATE_LT_MIN
        }
    } else {
        error = ERROR_RATE_GT_MAX
    }

    return [error, substate]
}