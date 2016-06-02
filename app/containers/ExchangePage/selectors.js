import {createSelector} from "reselect";

/**
 * Direct selector to the exchangePage state domain
 */
const selectExchangePageDomain = () => state => state.get('exchangePage');

/**
 * Other specific selectors
 */

/**
 * Default selector used by ExchangePage
 */

const selectExchangePage = () => createSelector(
    selectExchangePageDomain(),
    (substate) => substate
);

export default selectExchangePage;
export {
    selectExchangePageDomain,
};
