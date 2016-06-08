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
    FIELD_IS_REQUIRED,
    FIELD_NOT_VALID
} from "./constants";
import {
    isConvertable,
    convert,
    isDirty,
    isEmpty,
    errExist
} from "../../utils/general";
import Decimal from "decimal.js";

const initialState = {
    isAuthenticated: false,
    isRateLoaded: false,
    isAccountExist: false,
    isAccountLoaded: false,
    account: null,

    rate: {
        value: null,
        error: FIELD_IS_REQUIRED
    },
    from_amount: {
        value: null,
        error: FIELD_IS_REQUIRED
    },
    to_amount: {
        value: null,
        error: FIELD_IS_REQUIRED
    },

    from_currency: null,
    to_currency: null,
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
                    isAuthenticated: false
                });
        }

        case ACCOUNTS_RECEIVED:
        {
            let isAccountLoaded = action.accounts[state.from_currency] != null;
            let isAccountExist = action.accounts[state.from_currency] != {};
            let account = isAccountLoaded && isAccountExist ? action.accounts[state.from_currency] : null;

            let substate = {
                isAccountLoaded: isAccountLoaded,
                isAccountExist: isAccountLoaded && isAccountExist
            };

            if (!isEmpty(account)) {
                substate.account = account;

                if (isAccountExist && !isDirty(state.from_amount.value)) {
                    let from_amount = parseInt(account.amount);
                    substate.from_amount = genParam(from_amount, null);

                    let rate = state.rate.value;

                    if (!isEmpty(rate) && !errExist(state.rate.error)) {
                        substate.to_amount = genParam(Math.round(rate * from_amount), null);
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

            let market_rate = Decimal(action.marketInfo[state.from_currency][state.to_currency].rate);
            let rate = state.rate.value;

            if (!isDirty(rate)) {
                substate.rate = genParam(market_rate, null);

                if (!errExist(state.from_amount.error)) {
                    let from_amount = state.from_amount.value;
                    let to_amount = Math.round(from_amount * market_rate);

                    substate.to_amount = genParam(to_amount, null);

                } else if (!errExist(state.to_amount.error)) {
                    let to_amount = state.to_amount.value;
                    let from_amount = Math.round(to_amount / market_rate);

                    substate.from_amount = genParam(from_amount, null);
                }

            }

            return Object.assign({}, state, substate);
        }

        case CHANGE_FROM_AMOUNT:
        {
            let from_amount = action.from_amount;
            let rate = state.rate.value;
            let substate = {};
            let error = null;

            if (!isEmpty(from_amount)) {
                if (isConvertable(from_amount)) {
                    if (!errExist(state.rate.error)) {
                        substate.to_amount = genParam(Math.round(rate * convert(from_amount)), null);
                    }
                } else {
                    error = FIELD_NOT_VALID;
                }
            } else {
                error = FIELD_IS_REQUIRED;
            }

            substate.from_amount = genParam(from_amount, error);
            return Object.assign({}, state, substate);
        }


        case CHANGE_TO_AMOUNT:
        {
            let to_amount = action.to_amount;
            let rate = state.rate.value;
            let substate = {};
            let error = null;

            if (!isEmpty(to_amount)) {
                if (isConvertable(to_amount)) {
                    if (!errExist(state.rate.error)) {
                        substate.from_amount = genParam(Math.round(convert(to_amount) / rate), null);
                    }
                } else {
                    error = FIELD_NOT_VALID;
                }
            } else {
                error = FIELD_IS_REQUIRED;
            }

            substate.to_amount = genParam(to_amount, error);
            return Object.assign({}, state, substate);
        }

        case CHANGE_RATE:
        {
            let to_amount = state.to_amount.value;
            let from_amount = state.from_amount.value;
            let rate = action.rate;
            let substate = {};
            let error = null;

            if (!isEmpty(rate)) {
                if (isConvertable(rate)) {
                    if (!errExist(state.from_amount.error)) {
                        to_amount = Math.round(Decimal(rate) * from_amount);
                        substate.to_amount = genParam(to_amount, null);

                    } else if (!errExist(state.to_amount.error)) {
                        from_amount = Math.round(to_amount / Decimal(rate));
                        substate.from_amount = genParam(from_amount, null);
                    }
                }
                else {
                    error = FIELD_NOT_VALID;
                }
            } else {
                error = FIELD_IS_REQUIRED;
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