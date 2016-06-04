import {createSelector} from "reselect";

/**
 * Direct selector to the exchangeBox state domain
 */
const selectExchangeBoxDomain = () => state => state.get('exchangeBox');

/**
 * Other specific selectors
 */

/**
 * Default selector used by ExchangeBox
 */

const selectExchangeBox = () => createSelector(
    selectExchangeBoxDomain(),
    (substate) => substate
);

export default selectExchangeBox;
export {
    selectExchangeBoxDomain,
};
