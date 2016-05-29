/*
 *
 * Header reducer
 *
 */

import {LOG_IN, LOG_OUT} from "./constants";

// const initialState = fromJS({
//     token: null,
//     profile: null
// });


const  initialState = {
    token: null,
    profile: null
};

function headerReducer(state = initialState, action) {
    switch (action.type) {
        case LOG_IN:
            return Object.assign({}, state,
                {
                    token: action.token,
                    profile: action.profile
                });
        case LOG_OUT:
            return Object.assign({}, state, initialState);
        default:
            return state;
    }
}

export default headerReducer;
