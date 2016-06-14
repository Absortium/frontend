/*
 *
 * WithdrawDialog reducer
 *
 */

import {
    WITHDRAWAL_DIALOG_CLOSE,
    WITHDRAWAL_DIALOG_OPEN,
    CHANGE_WITHDRAWAL_AMOUNT
} from "./constants";
import {
    ERROR_FIELD_IS_REQUIRED,
    MARKET_CHANGED,
    ACCOUNT_RECEIVED,
    ACCOUNT_UPDATED
} from "containers/App/constants";
import update from "react/lib/update";
import { deconvert } from "utils/general";

const initialState = {
    open: false,
    currency: null,
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
        case WITHDRAWAL_DIALOG_CLOSE:
            return Object.assign({}, state, {
                open: false,
                currency: null,
                balance: null,
                pk: null
            });

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
                substate.pk = account.pk;
            }

            return Object.assign({}, state, substate);
        }

        case MARKET_CHANGED:
        {
            return Object.assign({}, state,
                {
                    open: false,
                    currency: null,
                    balance: null,
                    address: {
                        value: null,
                        error: ERROR_FIELD_IS_REQUIRED
                    },
                    amount: {
                        value: null,
                        error: ERROR_FIELD_IS_REQUIRED
                    }
                });
        }

        case CHANGE_WITHDRAWAL_AMOUNT:
        {
            return state;
        }

        case ACCOUNT_UPDATED:
        case ACCOUNT_RECEIVED:
        {
            let isAccountLoaded = action.account != null;
            let isAccountNotEmpty = action.account != {};
            let isAccountExist = isAccountLoaded && isAccountNotEmpty;

            let substate = {};

            if (isAccountExist) {
                substate.accounts = update(state.accounts || {}, {
                    [action.account.currency]: {
                        $set: {
                            amount: deconvert(parseInt(action.account.amount)),
                            pk: action.account.pk
                        }
                    }
                })
            }

            return Object.assign({}, state, substate);
        }

        default:
            return state;
    }
}

export default withdrawDialogReducer;
