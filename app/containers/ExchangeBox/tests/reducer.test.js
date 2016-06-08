import {expect} from "chai";
import {shallow, mount} from 'enzyme';
import React from 'react';
import exchageBoxReducer from "../reducer";
import { fromJS } from "immutable";
import {
    changeFromAmount,
    changeRate,
    changeToAmount
} from "../actions"

import ExchangeBox from "../index"

import {
    loggedIn,
    accountsReceived,
    marketChanged,
    marketInfoReceived
} from "../../App/actions";

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

var accounts = {
    btc: {
        address: "wxaH5tcgFYLYwJiyPmMNFgSLFyKKMP",
        amount: 400000000,
        pk: 2
    }
};

var marketInfo = {
    btc: {
        eth: {
            rate: "0.00000000",
            rate_24h_max: "0.00000000",
            rate_24h_min: "0.00000000",
            volume_24h: 0
        }
    }
};

describe('ExchangeBoxReducer', () => {
    it('returns the initial state', () => {
        expect(exchageBoxReducer(undefined, {})).to.deep.equal(initialState);
    });

    it('change market', () => {
        let state = exchageBoxReducer({}, marketChanged('btc', 'eth'));

        expect(state).to.deep.equal({
            from_currency: 'btc',
            to_currency: 'eth'
        });
    });

    it('is authenticated', () => {
        let state = exchageBoxReducer({}, loggedIn());

        expect(state).to.deep.equal({ isAuthenticated: true });
    });

    it('accounts loaded', () => {
        let expectedState = {};

        let state = exchageBoxReducer({}, marketChanged('btc', 'eth'));
        expectedState['from_currency'] = 'btc';
        expectedState['to_currency'] = 'eth';

        state = exchageBoxReducer(state, loggedIn());
        expectedState['isAuthenticated'] = true;

        state = exchageBoxReducer(state, accountsReceived(accounts));
        expectedState['account'] = accounts['btc'];
        expectedState['isAccountLoaded'] = true;
        expectedState['isAccountExist'] = true;
        expectedState['from_amount'] = 400000000;

        expect(state).to.deep.equal(expectedState);
    });

    it('market info received', () => {
        let expectedState = {};

        let state = exchageBoxReducer({}, marketChanged('btc', 'eth'));
        expectedState['from_currency'] = 'btc';
        expectedState['to_currency'] = 'eth';

        state = exchageBoxReducer(state, loggedIn());
        expectedState['isAuthenticated'] = true;

        state = exchageBoxReducer(state, accountsReceived(accounts));
        expectedState['account'] = accounts['btc'];
        expectedState['isAccountLoaded'] = true;
        expectedState['isAccountExist'] = true;
        expectedState['from_amount'] = 400000000;

        state = exchageBoxReducer(state, marketInfoReceived(marketInfo));
        expectedState['isRateLoaded'] = true;
        expectedState['rate'] = 0;
        expectedState['to_amount'] = 0;

        expect(state).to.deep.equal(expectedState);
    });

    it('calculation #1', () => {
        let [state, expectedState] = preinit();

        state = exchageBoxReducer(state, accountsReceived(accounts));
        expectedState['account'] = accounts['btc'];
        expectedState['isAccountLoaded'] = true;
        expectedState['isAccountExist'] = true;
        expectedState['from_amount'] = 400000000;

        const wrapper = mount(<ExchangeBox />);
        console.log(wrapper);

    });
});

function preinit() {
    let expectedState = {};

    let state = exchageBoxReducer({}, marketChanged('btc', 'eth'));
    expectedState['from_currency'] = 'btc';
    expectedState['to_currency'] = 'eth';

    state = exchageBoxReducer(state, loggedIn());
    expectedState['isAuthenticated'] = true;

    state = exchageBoxReducer(state, marketInfoReceived(marketInfo));
    expectedState['isRateLoaded'] = true;
    expectedState['rate'] = 0;
    expectedState['to_amount'] = 0;

    return [state, expectedState]
}
function pprint(obj) {
    console.log(JSON.stringify(obj, null, 2));
}
