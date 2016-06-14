/*
 *
 * ExchangePage reducer
 *
 */

import {
    LOGGED_IN,
    LOGGED_OUT,
    ACCOUNT_RECEIVED,
    ACCOUNT_UPDATED,
    MARKET_CHANGED,
    MARKET_INFO_RECEIVED,
    EXCHANGE_CREATED,
    ERROR_FIELD_IS_REQUIRED,
    ERROR_FIELD_NOT_VALID,
    ERROR_FIELD_LT_ZERO
} from "containers/App/constants";
import {
    CHANGE_FROM_AMOUNT,
    CHANGE_RATE,
    CHANGE_TO_AMOUNT,
    ERROR_RATE_LT_MIN,
    ERROR_RATE_GT_MAX,
    ERROR_FROM_AMOUNT_GT_BALANCE,
    ERROR_TO_AMOUNT_LT_MIN,
    RATE_MAX,
    RATE_MIN,
    TO_AMOUNT_MIN,
    SUBSTITUTE_FROM_AMOUNT,
    SUBSTITUTE_RATE
} from "./constants";
import {
    isValid,
    isDirty,
    isEmpty,
    errExist,
    deconvert,
    genParam
} from "utils/general";
import BigNumber from "bignumber.js";
BigNumber.config({ DECIMAL_PLACES: 20 });

const initialState = {
    isAuthenticated: false,
    isRateLoaded: false,
    isAccountExist: false,
    isAccountLoaded: false,
    balance: null,
    address: null,
    market_rate: null,

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


// TODO:
// HOLY SHIT YOU MUTATE STATE AND ACTION OBJ IN THE REDUCER!!
// IF YOU NOT FIX THIS SHIT THIS MAY LEAD TO CANCER OF YOUR PENIS MAN!

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
                    balance: null,
                    address: null,
                    isAccountExist: false,
                    isAccountLoaded: false
                });
        }

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
                    let balance = deconvert(parseInt(action.account.amount));
                    substate.balance = balance;


                    if (!isDirty(state.from_amount.value)) {
                        let rate = state.rate.value;

                        let from_amount = balance;
                        substate.from_amount = genParam(from_amount, null);

                        if (!isEmpty(rate) && !errExist(state.rate.error)) {
                            rate = new BigNumber(rate);

                            let error;
                            let to_amount = rate * from_amount;

                            if (to_amount < TO_AMOUNT_MIN) {
                                error = ERROR_TO_AMOUNT_LT_MIN;
                            }

                            substate.to_amount = genParam(to_amount, error);
                        }
                    } else {
                        let from_amount = state.from_amount.value;
                        let enoughMoney = !(isAccountExist && from_amount > balance);

                        if (!enoughMoney) {
                            substate.from_amount = genParam(from_amount, ERROR_FROM_AMOUNT_GT_BALANCE);
                        }

                    }
                }

                return Object.assign({}, state, substate);
            } else {
                return state
            }
        }

        case MARKET_INFO_RECEIVED:
        {
            let substate = {
                isRateLoaded: true
            };

            let error = null;
            let market_rate = new BigNumber(action.marketInfo[state.from_currency][state.to_currency].rate);
            let rate = state.rate.value;

            substate.market_rate = market_rate;

            if (!isDirty(rate)) {
                if (market_rate > RATE_MIN) {
                    if (!errExist(state.from_amount.error)) {
                        let error;
                        let from_amount = new BigNumber(state.from_amount.value);
                        let to_amount = from_amount * market_rate;

                        if (to_amount < TO_AMOUNT_MIN) {
                            error = ERROR_TO_AMOUNT_LT_MIN;
                        }

                        substate.to_amount = genParam(to_amount, error);

                    } else if (!errExist(state.to_amount.error)) {
                        let to_amount = new BigNumber(state.to_amount.value);
                        let from_amount = to_amount / market_rate;

                        substate.from_amount = genParam(from_amount, null);
                    }
                } else {
                    error = ERROR_RATE_LT_MIN;
                }
            }

            substate.rate = genParam(market_rate, error);
            return Object.assign({}, state, substate);
        }

        case CHANGE_FROM_AMOUNT:
        {
            let from_amount = action.from_amount;
            let rate = state.rate.value;

            let substate = {};
            let error = null;

            if (!isEmpty(from_amount)) {
                if (isValid(from_amount)) {
                    from_amount = new BigNumber(from_amount);

                    if (from_amount >= 0) {
                        let enoughMoney = !(state.isAccountExist && from_amount > state.balance);

                        if (enoughMoney) {
                            if (!errExist(state.rate.error)) {
                                rate = new BigNumber(rate);
                                let to_amount = from_amount * rate;

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
                        error = ERROR_FIELD_LT_ZERO
                    }
                } else {
                    error = ERROR_FIELD_NOT_VALID;
                }
            } else {
                error = ERROR_FIELD_IS_REQUIRED;
                substate.to_amount = genParam("", ERROR_FIELD_IS_REQUIRED);
            }

            substate.from_amount = genParam(action.from_amount, error);
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
                if (isValid(to_amount)) {
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
                } else {
                    error = ERROR_FIELD_NOT_VALID;
                }
            } else {
                substate.from_amount = genParam("", ERROR_FIELD_IS_REQUIRED);
                error = ERROR_FIELD_IS_REQUIRED;
            }

            substate.to_amount = genParam(action.to_amount, error);
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

            if (!isEmpty(rate)) {
                if (isValid(rate)) {
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
                } else {
                    error = ERROR_FIELD_NOT_VALID;
                }
            } else {
                error = ERROR_FIELD_IS_REQUIRED;
                substate.to_amount = genParam("", ERROR_FIELD_IS_REQUIRED);
            }

            substate.rate = genParam(action.rate, error);
            return Object.assign({}, state, substate);

        }


        case MARKET_CHANGED:
        {
            return Object.assign({}, state,
                {
                    from_currency: action.from_currency,
                    to_currency: action.to_currency,
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
                    }
                });
        }

        case EXCHANGE_CREATED:
        {
            return Object.assign({}, state,
                {
                    rate: {
                        value: state.market_rate,
                        error: null
                    },
                    from_amount: {
                        value: null,
                        error: ERROR_FIELD_IS_REQUIRED
                    },
                    to_amount: {
                        value: null,
                        error: ERROR_FIELD_IS_REQUIRED
                    }
                })
        }

        case SUBSTITUTE_FROM_AMOUNT:
        {
            return Object.assign({}, state,
                {
                    from_amount: genParam(state.balance, null)
                })
        }

        case SUBSTITUTE_RATE:
        {
            return Object.assign({}, state,
                {
                    rate: genParam(state.market_rate, null)
                })
        }
        default:
            return state;
    }
}


export default exchangeBoxReducer;