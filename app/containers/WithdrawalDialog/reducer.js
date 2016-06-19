/*
 *
 * WithdrawDialog reducer
 *
 */

import {
    WITHDRAWAL_DIALOG_CLOSE,
    WITHDRAWAL_DIALOG_OPEN,
    CHANGE_WITHDRAWAL_AMOUNT,
    CHANGE_WITHDRAWAL_ADDRESS,
    ERROR_WITHDRAWAL_AMOUNT_GT_BALANCE,
    ERROR_WITHDRAWAL_AMOUNT_LT_MIN,
    WITHDRAWAL_AMOUNT_MIN
} from "./constants";
import {
    ERROR_FIELD_IS_REQUIRED,
    ERROR_FIELD_NOT_VALID,
    MARKET_CHANGED,
    ACCOUNT_RECEIVED,
    ACCOUNT_UPDATED,
    WITHDRAWAL_CREATED
} from "containers/App/constants";
import update from "react/lib/update";
import {
    isValid,
    isEmpty,
    genParam
} from "utils/general";
import BigNumber from "bignumber.js";
BigNumber.config({ DECIMAL_PLACES: 20 });

const initialState = {
    open: false,
    currency: "",
    pk: null,
    balance: null,
    address: {
        value: null,
        error: ERROR_FIELD_IS_REQUIRED
    },
    amount: {
        value: null,
        error: ERROR_FIELD_IS_REQUIRED
    }
};


function withdrawDialogReducer(state = initialState, action) {
    switch (action.type) {

        case WITHDRAWAL_CREATED:
        case MARKET_CHANGED:
        case WITHDRAWAL_DIALOG_CLOSE:
            return Object.assign({}, state, initialState);

        case WITHDRAWAL_DIALOG_OPEN:
        {

            let account = state.accounts[action.currency];
            let isAccountLoaded = account != null;
            let isAccountNotEmpty = account != {};
            let isAccountExist = isAccountLoaded && isAccountNotEmpty;

            let substate = {
                isAccountExist: isAccountExist,
                open: true,
                currency: action.currency
            };

            if (isAccountExist) {
                substate.balance = account.amount;
                let error;

                if (account.amount < WITHDRAWAL_AMOUNT_MIN) {
                    error = ERROR_WITHDRAWAL_AMOUNT_LT_MIN
                }

                substate.amount = genParam(account.amount, error);
                substate.pk = account.pk;
            }

            return Object.assign({}, state, substate);
        }

        case CHANGE_WITHDRAWAL_AMOUNT:
        {
            let amount = action.amount;

            let substate = {};
            let error = null;

            if (!isEmpty(amount)) {
                if (isValid(amount)) {
                    amount = new BigNumber(amount);

                    if (amount > WITHDRAWAL_AMOUNT_MIN) {
                        let enoughMoney = !(state.isAccountExist && amount > state.balance);
                        if (!enoughMoney) {
                            error = ERROR_WITHDRAWAL_AMOUNT_GT_BALANCE
                        }
                    } else {
                        error = ERROR_WITHDRAWAL_AMOUNT_LT_MIN
                    }
                } else {
                    error = ERROR_FIELD_NOT_VALID;
                }
            } else {
                error = ERROR_FIELD_IS_REQUIRED;
            }

            substate.amount = genParam(action.amount, error);
            return Object.assign({}, state, substate);
        }

        case CHANGE_WITHDRAWAL_ADDRESS:
        {
            let address = action.address;

            let substate = {};
            let error = null;

            if (isEmpty(address)) error = ERROR_FIELD_IS_REQUIRED;

            substate.address = genParam(action.address, error);
            return Object.assign({}, state, substate);
        }

        case ACCOUNT_UPDATED:
        case ACCOUNT_RECEIVED:
        {

            let amount = new BigNumber(action.account.amount);

            let substate = {
                balance: amount
            };

            substate.accounts = update(state.accounts || {}, {
                [action.account.currency]: {
                    $set: {
                        amount: amount,
                        pk: action.account.pk
                    }
                }
            });


            return Object.assign({}, state, substate);
        }

        default:
            return state;
    }
}

export default withdrawDialogReducer;
