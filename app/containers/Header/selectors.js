import {createSelector} from "reselect";

/**
 * Direct selector to the header state domain
 */
const selectHeaderDomain = () => state => state.get('header');
const auth = function () {
    return function (substate) {
        substate.isAuthenticated = substate.profile != null;
        return substate;
    }
};


/**
 * Other specific selectors
 */


/**
 * Default selector used by Header
 */

const selectHeader = () => createSelector(
    selectHeaderDomain(),
    (substate) => substate,
    auth(),
);

export default selectHeader;
export {
    selectHeaderDomain,
    auth
};
