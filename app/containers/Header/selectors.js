import {createSelector} from "reselect";

/**
 * Direct selector to the header state domain
 */
const selectHeaderDomain = () => state => state.get('header');

/**
 * Other specific selectors
 */

/**
 * Default selector used by Header
 */

const selectHeader = () => createSelector(
    selectHeaderDomain(),
    (substate) => substate
);

export default selectHeader;
export {
    selectHeaderDomain,
};
