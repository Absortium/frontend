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
    CHANGE_TO_AMOUNT
} from "./constants";

const initialState = {
    isAuthenticated: false,
    isRateLoaded: false,
    isAccountExist: false,
    isAccountLoaded: false,
    account: null,
    rate: null,
    from_amount: null,
    to_amount: null,
    from_currency: null,
    to_currency: null,
};

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
                substate['account'] = account;

                if (!isDirty(state.from_amount)) {
                    let from_amount = Number(account.amount);
                    substate['from_amount'] = num2str(from_amount);

                    if (!isEmpty(state.rate)) {
                        let to_amount = Number(state.rate) * from_amount;
                        substate['to_amount'] = num2str(to_amount);
                    }
                }
            }

            console.log(substate);
            return Object.assign({}, state, substate);
        }

        case MARKET_INFO_RECEIVED:
        {
            let substate = {
                isRateLoaded: true
            };

            let market_rate = Number(action.marketInfo[state.from_currency][state.to_currency].rate);
            let rate = state.rate;
            let from_amount = state.from_amount;
            let to_amount = state.to_amount;

            if (!isDirty(rate)) {
                substate['rate'] = num2str(market_rate);

                if (!isEmpty(from_amount)) {
                    from_amount = Number(from_amount);
                    to_amount = market_rate * from_amount
                    substate['to_amount'] = num2str(to_amount);
                } else if (!isEmpty(to_amount) && isEmpty(from_amount)) {
                    to_amount = Number(to_amount);
                    from_amount = to_amount / market_rate;
                    substate['from_amount'] = num2str(from_amount);
                }

            }

            console.log(substate);
            return Object.assign({}, state, substate);
        }

        case CHANGE_FROM_AMOUNT:
        {
            let from_amount = action.from_amount;
            let rate = state.rate;
            let substate = {};

            if (!isEmpty(rate)) {
                from_amount = Number(from_amount);
                substate['from_amount'] = num2str(from_amount);

                rate = Number(rate);
                let to_amount = rate * from_amount;
                substate['to_amount'] = num2str(to_amount);
            } else {
                substate['from_amount'] = from_amount
            }

            console.log(substate);
            return Object.assign({}, state, substate);
        }


        case CHANGE_TO_AMOUNT:
        {
            let to_amount = action.to_amount;
            let rate = state.rate;
            let substate = {};

            if (!isEmpty(rate)) {
                to_amount = Number(to_amount);
                substate['to_amount'] = num2str(to_amount);

                rate = Number(rate);
                let from_amount = to_amount / rate;
                substate['from_amount'] = num2str(from_amount);
            } else {
                substate['to_amount'] = to_amount
            }

            console.log(substate);
            return Object.assign({}, state, substate);
        }

        case CHANGE_RATE:
        {
            let to_amount = state.to_amount;
            let from_amount = state.from_amount;
            let rate = action.rate;
            let substate = {};

            if (!isEmpty(rate)) {
                rate = Number(rate);
                substate['rate'] = num2str(rate);

                if (!isEmpty(from_amount)) {
                    from_amount = Number(from_amount);
                    to_amount = rate * from_amount;
                    console.log(to_amount);
                    substate['to_amount'] = num2str(to_amount);

                } else if (!isEmpty(to_amount) && isEmpty(from_amount)) {
                    to_amount = Number(to_amount);
                    from_amount = to_amount / rate;
                    substate['from_amount'] = num2str(from_amount);
                }
            } else {
                substate['rate'] = rate
            }

            console.log(substate);
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

function isEmpty(value) {
    return value == null || value == ""
}

function isDirty(value) {
    return value != null
}

function num2str(value) {
    return value.toPrecision(8) * 1 + ''
}
export default exchangeBoxReducer;