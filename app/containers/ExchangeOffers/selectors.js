import {createSelector} from "reselect";

/**
 * Direct selector to the exchangePage state domain
 */
const selectExchangeOffersDomain = () => state => state.get('exchangeOffers');

/**
 * Other specific selectors
 */

/**
 * Default selector used by ExchangePage
 */

const selectExchangeOffers = () => createSelector(
    selectExchangeOffersDomain(),
    (substate) => substate
);

export default selectExchangeOffers;
export {
    selectExchangeOffersDomain,
};
