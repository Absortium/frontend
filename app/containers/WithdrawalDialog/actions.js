/*
 *
 * WithdrawDialog actions
 *
 */

import {
    WITHDRAWAL_DIALOG_CLOSE,
    WITHDRAWAL_DIALOG_OPEN,
    CHANGE_WITHDRAWAL_AMOUNT
} from "./constants";

export function withdrawalDialogOpen(currency) {
    return {
        type: WITHDRAWAL_DIALOG_OPEN,
        currency
    };
}

export function withdrawalDialogClose() {
    return {
        type: WITHDRAWAL_DIALOG_CLOSE
    };
}

export function changeWithdrawalAmount(amount) {
    return {
        type: CHANGE_WITHDRAWAL_AMOUNT,
        amount
    };
}