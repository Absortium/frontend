/*
 *
 * ExchangePage reducer
 *
 */

import {
    LOGGED_IN,
    LOGGED_OUT,
    ACCOUNTS_RECEIVED,
    MARKET_CHANGED,
    MARKET_INFO_RECEIVED
} from "containers/App/constants";
import {
    CHANGE_FROM_AMOUNT,
    CHANGE_RATE,
    CHANGE_TO_AMOUNT,
    ERROR_FIELD_IS_REQUIRED,
    ERROR_FIELD_NOT_VALID,
    ERROR_RATE_LT_MIN,
    ERROR_RATE_GT_MAX,
    ERROR_FROM_AMOUNT_GT_BALANCE,
    ERROR_TO_AMOUNT_LT_MIN,
    RATE_MAX,
    RATE_MIN,
    TO_AMOUNT_MIN
} from "./constants";
import {
    isConvertable,
    isDirty,
    isEmpty,
    errExist,
    deconvert,
    cut
} from "../../utils/general";
import BigNumber from "bignumber.js";
BigNumber.config({ DECIMAL_PLACES: 20 });

const initialState = {
    isAuthenticated: false,
    isRateLoaded: false,
    isAccountExist: false,
    isAccountLoaded: false,
    account: null,

    rate: {
        value: null,
        error: ERROR_FIELD_IS_REQUIRED
    },
    from_amount: {
        value: null,
        error: ERROR_FIELD_IS_REQUIRED
    },
    to_amount: {
        value: null,
        error: ERROR_FIELD_IS_REQUIRED
    },

    from_currency: null,
    to_currency: null
};

function genParam(value, error) {
    return {
        value: value,
        error: error
    }
}

function exchangeBoxReducer(state = initialState, action) {
    switch (action.type) {
        case LOGGED_IN:
        {
            return Object.assign({}, state,
                {
                    isAuthenticated: true
                });
        }

        case LOGGED_OUT:
        {
            return Object.assign({}, state,
                {
                    isAuthenticated: false,
                    account: null,
                    isAccountExist: false,
                    isAccountLoaded: false
                });
        }

        case ACCOUNTS_RECEIVED:
        {
            let isAccountLoaded = action.accounts[state.from_currency] != null;
            let isAccountNotEmpty = action.accounts[state.from_currency] != {};
            let isAccountExist = isAccountLoaded && isAccountNotEmpty;

            let substate = {
                isAccountLoaded: isAccountLoaded,
                isAccountExist: isAccountExist
            };

            if (isAccountExist) {
                let account = action.accounts[state.from_currency];
                account.balance = deconvert(parseInt(account.amount));
                substate.account = account;

                if (!isDirty(state.from_amount.value)) {
                    let rate = state.rate.value;

                    let from_amount = account.balance;
                    substate.from_amount = genParam(from_amount, null);

                    if (!isEmpty(rate) && !errExist(state.rate.error)) {
                        let to_amount = rate * from_amount;
                        substate.to_amount = genParam(to_amount, null);
                    }
                } else {
                    let from_amount = state.from_amount.value;
                    let enoughMoney = !(isAccountExist && from_amount > account.balance);

                    if (!enoughMoney) {
                        substate.from_amount = genParam(from_amount, ERROR_FROM_AMOUNT_GT_BALANCE);
                    }

                }
            }

            return Object.assign({}, state, substate);
        }

        case MARKET_INFO_RECEIVED:
        {
            let substate = {
                isRateLoaded: true
            };

            let market_rate = new BigNumber(action.marketInfo[state.from_currency][state.to_currency].rate);
            let rate = state.rate.value;

            if (!isDirty(rate)) {
                substate.rate = genParam(market_rate, null);

                if (!errExist(state.from_amount.error)) {
                    let from_amount = state.from_amount.value;
                    let to_amount = from_amount * market_rate;

                    substate.to_amount = genParam(to_amount, null);

                } else if (!errExist(state.to_amount.error)) {
                    let to_amount = state.to_amount.value;
                    let from_amount = to_amount / market_rate;

                    substate.from_amount = genParam(from_amount, null);
                }

            }

            return Object.assign({}, state, substate);
        }

        case CHANGE_FROM_AMOUNT:
        {
            let from_amount = action.from_amount;

            let rate = state.rate.value;

            let isAccountExist = state.isAccountExist;

            let substate = {};
            let error = null;

            if (!isEmpty(from_amount)) {
                if (isConvertable(from_amount)) {

                    let enoughMoney = !(isAccountExist && from_amount > state.account.balance);

                    if (enoughMoney) {
                        if (!errExist(state.rate.error)) {
                            let to_amount = cut(new BigNumber(from_amount) * rate);

                            if (to_amount < TO_AMOUNT_MIN) {
                                substate.to_amount = genParam(to_amount, ERROR_TO_AMOUNT_LT_MIN);
                            } else {
                                substate.to_amount = genParam(to_amount, null);
                            }
                        }
                    } else {
                        error = ERROR_FROM_AMOUNT_GT_BALANCE
                    }
                } else {
                    error = ERROR_FIELD_NOT_VALID;
                }
            } else {
                error = ERROR_FIELD_IS_REQUIRED;
                substate.to_amount = genParam("", ERROR_FIELD_IS_REQUIRED);
            }

            substate.from_amount = genParam(from_amount, error);
            return Object.assign({}, state, substate);
        }


        case CHANGE_TO_AMOUNT:
        {
            let to_amount = action.to_amount;

            let rate = state.rate.value;

            let isAccountExist = state.isAccountExist;

            let substate = {};
            let error = null;

            if (!isEmpty(to_amount)) {
                if (isConvertable(to_amount)) {
                    if (!errExist(state.rate.error)) {
                        let from_amount = cut(new BigNumber(to_amount) / rate);

                        console.log(isAccountExist && from_amount > state.account.balance);
                        if (isAccountExist && from_amount > state.account.balance) {
                            substate.from_amount = genParam(from_amount, ERROR_FROM_AMOUNT_GT_BALANCE);
                        } else {

                            substate.from_amount = genParam(from_amount, null);
                        }

                    }
                } else {
                    error = ERROR_FIELD_NOT_VALID;
                }
            } else {
                substate.from_amount = genParam("", ERROR_FIELD_IS_REQUIRED);
                error = ERROR_FIELD_IS_REQUIRED;
            }

            if (!errExist(error) && to_amount < TO_AMOUNT_MIN) {
                substate.to_amount = genParam(to_amount, ERROR_TO_AMOUNT_LT_MIN);
            } else {
                substate.to_amount = genParam(to_amount, error);
            }

            return Object.assign({}, state, substate);
        }

        case CHANGE_RATE:
        {
            let rate = action.rate;

            let to_amount = state.to_amount.value;
            let from_amount = state.from_amount.value;

            let isAccountExist = state.isAccountExist;

            let substate = {};
            let error = null;

            if (isEmpty(rate)) {
                error = ERROR_FIELD_IS_REQUIRED;
                substate.to_amount = genParam("", ERROR_FIELD_IS_REQUIRED);

            } else {
                if (!isConvertable(rate)) {
                    error = ERROR_FIELD_NOT_VALID;

                } else {

                    let brate = new BigNumber(rate);
                    if (brate > RATE_MAX) {
                        error = ERROR_RATE_GT_MAX

                    } else if (brate < RATE_MIN) {
                        error = ERROR_RATE_LT_MIN

                    } else {
                        if (!errExist(state.from_amount.error)) {
                            to_amount = cut(brate * from_amount);

                            if (to_amount < TO_AMOUNT_MIN) {
                                substate.to_amount = genParam(to_amount, ERROR_TO_AMOUNT_LT_MIN);
                            } else {
                                substate.to_amount = genParam(to_amount, null);
                            }
                        } else if (!errExist(state.to_amount.error)) {
                            from_amount = cut(to_amount / brate);

                            if (isAccountExist && from_amount > state.account.balance) {
                                substate.from_amount = genParam(from_amount, ERROR_FROM_AMOUNT_GT_BALANCE);
                            } else {
                                substate.from_amount = genParam(from_amount, null);
                            }
                        }
                    }
                }
            }

            substate.rate = genParam(rate, error);
            return Object.assign({}, state, substate);

        }


        case MARKET_CHANGED:
        {
            return Object.assign({}, state,
                {
                    from_currency: action.from_currency,
                    to_currency: action.to_currency,
                });
        }


        default:
            return state;
    }
}


export default exchangeBoxReducer;