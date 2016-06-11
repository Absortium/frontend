/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const LOG_IN = 'app/App/LOG_IN';
export const LOG_OUT = 'app/App/LOG_OUT';
export const LOGGED_IN = 'app/App/LOGGED_IN';
export const LOGGED_OUT = 'app/App/LOGGED_OUT';
export const ACCOUNTS_RECEIVED = 'app/App/ACCOUNTS_RECEIVED';
export const MARKET_INFO_RECEIVED = 'app/App/MARKET_INFO_RECEIVED';
export const MARKET_CHANGED = 'app/App/MARKET_CHANGED';
export const OFFERS_RECEIVED = 'app/App/OFFERS_RECEIVED';

export const TOPIC_UPDATE = 'app/App/TOPIC_UPDATE';
export const TOPIC_SUBSCRIBE = 'app/App/TOPIC_SUBSCRIBE';
export const TOPIC_SUBSCRIBE_SUCCESS = 'app/App/TOPIC_SUBSCRIBE_SUCCESS';
export const TOPIC_SUBSCRIBE_FAILED = 'app/App/TOPIC_SUBSCRIBE_FAILED';
