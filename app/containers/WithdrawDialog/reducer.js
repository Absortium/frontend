/*
 *
 * WithdrawDialog reducer
 *
 */

import {
    WITHDRAW_DIALOG_CLOSE,
    WITHDRAW_DIALOG_OPEN,
    CHANGE_WITHDRAWAL_AMOUNT,
    
} from "./constants";

import {
    ERROR_FIELD_IS_REQUIRED,
} from "containers/App/constants";

import {
    MARKET_CHANGED,
    ACCOUNT_RECEIVED,
    ACCOUNT_UPDATED

} from "containers/App/constants"
const initialState = {
    open: false,
    currency: null,
    accounts:null,
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
        case WITHDRAW_DIALOG_CLOSE:
            return Object.assign({}, state, {
                open: false
            });
        
        case WITHDRAW_DIALOG_OPEN: {
            return Object.assign({}, state, {
                open: true
            });
        }
            
        case ACCOUNT_RECEIVED: {
            return 
        } 

        case MARKET_CHANGED:
        {
            return Object.assign({}, state,
                {
                    currency: action.from_currency,

                    open: false,
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

            let substate = {
                isAccountLoaded: isAccountLoaded,
                isAccountExist: isAccountExist
            };

            if (isAccountExist) {
                substate.accounts = update(state.accounts || {}, {
                    [action.account.currency]: {
                        $set: {
                            amount: normalize(deconvert(parseInt(action.account.amount))),
                            address: action.account.address
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
