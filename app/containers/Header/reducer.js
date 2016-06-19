/*
 *
 * Header reducer
 *
 */

import {
    LOGGED_IN,
    LOGGED_OUT
} from "containers/App/constants";

const initialState = {
    isAuthenticated: false,
    isAvatarLoaded: false,
    avatar: null
};

function headerReducer(state = initialState, action) {
    switch (action.type) {
        case LOGGED_IN:
            let substate = {
                isAuthenticated: true
            };

            let isAvatarLoaded = action.profile.picture != null;
            if (isAvatarLoaded) {
                substate.avatar = action.profile.picture;
                substate.isAvatarLoaded = isAvatarLoaded;
            }

            return Object.assign({}, state, substate);

        case LOGGED_OUT:
            return Object.assign({}, state,
                {
                    isAuthenticated: false,
                    isAvatarLoaded: false,
                    avatar: null
                });


        default:
            return state;
    }
}

export default headerReducer;
