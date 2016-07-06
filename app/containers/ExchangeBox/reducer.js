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
    EXCHANGE_CREATED,
    ERROR_FIELD_IS_REQUIRED,
    ERROR_FIELD_NOT_VALID,
    LOGGED_OUT,
    SEND_EXCHANGE
} from "containers/App/constants";
import {
    CHANGE_FROM_AMOUNT,
    CHANGE_RATE,
    CHANGE_TO_AMOUNT,
    ERROR_FROM_AMOUNT_GT_BALANCE,
    SUBSTITUTE_FROM_AMOUNT,
    SUBSTITUTE_RATE
} from "./constants";
import { SUBSTITUTE_OFFER } from "containers/ExchangeOffers/constants";
import {
    isValid,
    isDirty,
    isEmpty,
    genParam,
    updateState
} from "utils/general";
import {
    setFromAmount,
    setRate,
    setToAmount
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
        error: null
    },
    from_amount: {
        value: null,
        error: null
    },
    to_amount: {
        value: null,
        error: null
    },

    from_currency: null,
    to_currency: null,
    disabled: true
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
                    let balance = new BigNumber(action.account.amount);
                    substate.balance = balance;


                    if (!isDirty(state.from_amount.value)) {
                        [error, substate] = setFromAmount(balance, state, substate);
                        substate.from_amount = genParam(balance, error);
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
            if (action.marketInfo[state.from_currency] != null) {

                let substate = {
                    isRateLoaded: true
                };

                let error = null;
                let market_rate = new BigNumber(action.marketInfo[state.from_currency][state.to_currency].rate);
                let rate = state.rate.value;

                substate.market_rate = market_rate;

                if (!isDirty(rate)) {
                    [error, substate] = setRate(market_rate, state, substate);
                    substate.rate = genParam(market_rate, error);
                }

                return updateState(state, substate);
            } else {
                return state;
            }
        }

        case CHANGE_FROM_AMOUNT:
        {
            let from_amount = action.from_amount;
            let substate = {};
            let error = null;

            if (!isEmpty(from_amount)) {
                if (isValid(from_amount)) {
                    [error, substate] = setFromAmount(from_amount, state, substate);
                } else {
                    error = ERROR_FIELD_NOT_VALID;
                }
            } else {
                error = ERROR_FIELD_IS_REQUIRED;
                substate.to_amount = genParam("", ERROR_FIELD_IS_REQUIRED);
            }

            substate.from_amount = genParam(action.from_amount, error);
            return updateState(state, substate);
        }


        case CHANGE_TO_AMOUNT:
        {
            let to_amount = action.to_amount;
            let substate = {};
            let error = null;

            if (!isEmpty(to_amount)) {
                if (isValid(to_amount)) {
                    [error, substate] = setToAmount(to_amount, state, substate);
                } else {
                    error = ERROR_FIELD_NOT_VALID;
                }
            } else {
                substate.from_amount = genParam("", ERROR_FIELD_IS_REQUIRED);
                error = ERROR_FIELD_IS_REQUIRED;
            }

            substate.to_amount = genParam(action.to_amount, error);
            return updateState(state, substate);
        }

        case CHANGE_RATE:
        {
            let rate = action.rate;

            let substate = {};
            let error = null;

            if (!isEmpty(rate)) {
                if (isValid(rate)) {
                    [error, substate] = setRate(rate, state, substate);
                } else {
                    error = ERROR_FIELD_NOT_VALID;
                }
            } else {
                error = ERROR_FIELD_IS_REQUIRED;
                substate.to_amount = genParam("", ERROR_FIELD_IS_REQUIRED);
            }

            substate.rate = genParam(action.rate, error);
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

                from_currency: action.from_currency,
                to_currency: action.to_currency
            });
        }
           
        case SEND_EXCHANGE:
            return updateState(state, {
                from_amount: {
                    value: "",
                    error: null
                },
                to_amount: {
                    value: "",
                    error: null
                },
                disabled: true
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
            let substate = {};
            let error = null;

            [error, substate] = setRate(state.market_rate, state, substate);
            substate.rate = genParam(state.market_rate, error);

            return updateState(state, substate)
        }

        case SUBSTITUTE_FROM_AMOUNT:
        {
            let substate = {};
            let error = null;

            [error, substate] = setFromAmount(state.balance, state, substate);
            substate.from_amount = genParam(state.balance, error);

            return updateState(state, substate)
        }

        case SUBSTITUTE_OFFER:
        {
            let substate = {};
            let error = null;
            let price = new BigNumber(1).dividedBy(parseFloat(action.price));
            let amount = new BigNumber(action.amount);
            let newState = state;

            [error, substate] = setRate(price, newState, substate);
            substate.rate = genParam(price, error);
            newState = updateState(newState, substate);

            [error, substate] = setToAmount(amount, newState, substate);
            substate.to_amount = genParam(amount, error);
            newState = updateState(newState, substate);

            if (newState.from_amount.error == ERROR_FROM_AMOUNT_GT_BALANCE) {
                let error = null;

                [error, substate] = setFromAmount(newState.balance, newState, substate);
                substate.from_amount = genParam(newState.balance, error);
                newState = updateState(newState, substate);
            }

            return newState
        }

        default:
            return state;
    }
}


export default exchangeBoxReducer;