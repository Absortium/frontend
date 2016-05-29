/*
 * App Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your appliction state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import {AUTH_LOCK_LOADED} from "./constants";

/**
 * Dispatched when auth component is loaded.
 *
 * @param  {object} lock The auth lock object (see Auth0 documentation)
 *
 * @return {object}       An action object with a type of AUTH_LOCK_LOADED passing the lock object
 */
export function authLockLoaded(lock) {
    return {
        type: AUTH_LOCK_LOADED,
        lock,
    };
}