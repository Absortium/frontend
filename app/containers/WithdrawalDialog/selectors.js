import { createSelector } from 'reselect';

/**
 * Direct selector to the withdrawDialog state domain
 */
const selectWithdrawalDialogDomain = () => state => state.get('withdrawalDialog');

/**
 * Other specific selectors
 */


/**
 * Default selector used by WithdrawDialog
 */

const selectWithdrawalDialog = () => createSelector(
  selectWithdrawalDialogDomain(),
  (substate) => substate
);

export default selectWithdrawalDialog;
export {
  selectWithdrawalDialogDomain,
};
