/*
 *
 * ExchangeListBox reducer
 *
 */


const initialState = {
    all_exchanges: null,
    user_exchanges: null,
    isAllExchangesLoaded: false,
    isUserExchangesLoaded: false
};

function exchangeListBoxReducer(state = initialState, action) {
    switch (action.type) {
        default:
            return state;
    }
}

export default exchangeListBoxReducer;
