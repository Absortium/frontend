/*
 *
 * WithdrawDialog actions
 *
 */

import {
    WITHDRAW_DIALOG_CLOSE,
    WITHDRAW_DIALOG_OPEN,
    CHANGE_WITHDRAWAL_AMOUNT
} from "./constants";

export function withdrawOpen(currency) {
    return {
        type: WITHDRAW_DIALOG_OPEN,
        currency
    };
}

export function withdrawClose() {
    return {
        type: WITHDRAW_DIALOG_CLOSE
    };
}

export function changeWithdrawalAmount(amount) {
    return {
        type: CHANGE_WITHDRAWAL_AMOUNT,
        amount
    };
}