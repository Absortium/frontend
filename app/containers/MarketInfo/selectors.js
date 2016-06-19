import { createSelector } from "reselect";

/**
 * Direct selector to the exchangePage state domain
 */
const selectMarketInfoDomain = () => state => state.get('marketInfo');

/**
 * Other specific selectors
 */

/**
 * Default selector used by ExchangePage
 */

const selectMarketInfo = () => createSelector(
    selectMarketInfoDomain(),
    (substate) => substate
);

export default selectMarketInfo;
export {
    selectMarketInfoDomain,
};
