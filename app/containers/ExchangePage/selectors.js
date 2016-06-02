import {createSelector} from "reselect";

/**
 * Direct selector to the exchangePage state domain
 */
const selectExchangePageDomain = () => state => state.get('exchangePage');

/**
 * Other specific selectors
 */

const auth = function () {
    return function (substate) {
        substate.isAuthenticated = substate.profile != null;
        return substate;
    }
};

/**
 * Default selector used by ExchangePage
 */

const selectExchangePage = () => createSelector(
    selectExchangePageDomain(),
    auth()
);

export default selectExchangePage;
export {
    selectExchangePageDomain,
    auth
};
