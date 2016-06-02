import {createSelector} from "reselect";

/**
 * Direct selector to the header state domain
 */
const selectHeaderDomain = () => state => state.get('header');

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
 * Default selector used by Header
 */

const selectHeader = () => createSelector(
    selectHeaderDomain(),
    auth(),
);

export default selectHeader;
export {
    selectHeaderDomain,
    auth
};
