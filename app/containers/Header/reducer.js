/*
 *
 * Header reducer
 *
 */

import {LOGGED_IN, LOGGED_OUT} from "containers/App/constants";


const initialState = {
    profile: null
};

function headerReducer(state = initialState, action) {
    switch (action.type) {
        case LOGGED_IN:
            return Object.assign({}, state,
                {
                    profile: action.profile
                });
        case LOGGED_OUT:
            return Object.assign({}, state,
                {   
                    profile: null
                });
        default:
            return state;
    }
}

export default headerReducer;
