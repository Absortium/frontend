import { createSelector } from 'reselect';

/**
 * Direct selector to the accountBox state domain
 */
const selectAccountBoxDomain = () => state => state.get('accountBox');

/**
 * Other specific selectors
 */


/**
 * Default selector used by AccountBox
 */

const selectAccountBox = () => createSelector(
  selectAccountBoxDomain(),
  (substate) => substate
);

export default selectAccountBox;
export {
  selectAccountBoxDomain,
};
