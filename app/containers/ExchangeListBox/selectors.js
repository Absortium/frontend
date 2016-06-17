import { createSelector } from 'reselect';

/**
 * Direct selector to the exchangeListBox state domain
 */
const selectExchangeListBoxDomain = () => state => state.get('exchangeListBox');

/**
 * Other specific selectors
 */


/**
 * Default selector used by ExchangeListBox
 */

const selectExchangeListBox = () => createSelector(
  selectExchangeListBoxDomain(),
  (substate) => substate
);

export default selectExchangeListBox;
export {
  selectExchangeListBoxDomain,
};
