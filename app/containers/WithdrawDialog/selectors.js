import { createSelector } from 'reselect';

/**
 * Direct selector to the withdrawDialog state domain
 */
const selectWithdrawDialogDomain = () => state => state.get('withdrawDialog');

/**
 * Other specific selectors
 */


/**
 * Default selector used by WithdrawDialog
 */

const selectWithdrawDialog = () => createSelector(
  selectWithdrawDialogDomain(),
  (substate) => substate
);

export default selectWithdrawDialog;
export {
  selectWithdrawDialogDomain,
};
