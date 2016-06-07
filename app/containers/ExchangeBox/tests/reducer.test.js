import expect from "expect";
import exchageBoxReducer from "../reducer";
import { fromJS } from "immutable";


const initialState = {
    isAuthenticated: false,
    isRateLoaded: false,
    isAccountExist: false,
    isAccountLoaded: false,
    account: null,
    rate: null,
    from_amount: null,
    to_amount: null,
    from_currency: null,
    to_currency: null,
};

describe('ExchangeBoxReducer', () => {
    it('returns the initial state', () => {
        expect(exchageBoxReducer(undefined, {})).toEqual(initialState);
    });
    it('returns the initial state', () => {
        expect(exchageBoxReducer(undefined, {})).toEqual(initialState);
    });
});
