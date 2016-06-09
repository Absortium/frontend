import {expect} from "chai";
import {shallow, mount} from "enzyme";
import React from "react";
import exchageBoxReducer from "../reducer";
import { fromJS } from "immutable";
import {
    changeFromAmount,
    changeRate,
    changeToAmount
} from "../actions"

import {
    loggedIn,
    accountsReceived,
    marketChanged,
    marketInfoReceived
} from "../../App/actions";
import Decimal from "decimal.js"

import {isValid} from "../../../utils/general"

const initialState = {
    isAuthenticated: false,
    isRateLoaded: false,
    isAccountExist: false,
    isAccountLoaded: false,
    account: null,
    rate: {
        error: null,
        value: null
    },
    from_amount: {
        error: null,
        value: null
    },
    to_amount: {
        error: null,
        value: null
    },
    from_currency: null,
    to_currency: null,
};

var accounts = {
    btc: {
        address: "wxaH5tcgFYLYwJiyPmMNFgSLFyKKMP",
        amount: 1,
        pk: 2
    }
};

var marketInfo = {
    btc: {
        eth: {
            rate: "1.000000",
            rate_24h_max: "0.00000000",
            rate_24h_min: "0.00000000",
            volume_24h: 0
        }
    }
};

describe("ExchangeBoxReducer", () => {
    it("returns the initial state", () => {
        expect(exchageBoxReducer(undefined, {})).to.deep.equal(initialState);
    });

    it("change market", () => {
        let state = exchageBoxReducer({}, marketChanged("btc", "eth"));

        expect(state).to.deep.equal({
            from_currency: "btc",
            to_currency: "eth"
        });
    });

    it("is authenticated", () => {
        let state = exchageBoxReducer({}, loggedIn());

        expect(state).to.deep.equal({ isAuthenticated: true });
    });

    it("accounts loaded", () => {
        let expected = {};

        let state = exchageBoxReducer({}, marketChanged("btc", "eth"));
        expected["from_currency"] = "btc";
        expected["to_currency"] = "eth";

        state = exchageBoxReducer(state, loggedIn());
        expected["isAuthenticated"] = true;

        state = exchageBoxReducer(state, accountsReceived(accounts));
        expected["account"] = accounts["btc"];
        expected["isAccountLoaded"] = true;
        expected["isAccountExist"] = true;
        expected["from_amount"]["value"] = "1";

        expect(state).to.deep.equal(expected);
    });

    it("market info received", () => {
        let expected = {};

        let state = exchageBoxReducer({}, marketChanged("btc", "eth"));
        expected["from_currency"] = "btc";
        expected["to_currency"] = "eth";

        state = exchageBoxReducer(state, loggedIn());
        expected["isAuthenticated"] = true;

        state = exchageBoxReducer(state, accountsReceived(accounts));
        expected["account"] = accounts["btc"];
        expected["isAccountLoaded"] = true;
        expected["isAccountExist"] = true;
        expected["from_amount"]["value"] = "1";

        state = exchageBoxReducer(state, marketInfoReceived(marketInfo));
        expected["isRateLoaded"] = true;
        expected["rate"]["value"] = "1";
        expected["to_amount"]["value"] = "1";

        expect(state).to.deep.equal(expected);
    });

    it("calculation #1", () => {
        let [state, expected] = preinit();

        state = exchageBoxReducer(state, changeFromAmount("0"));
        expected["from_amount"]["value"] = "0";
        expected["to_amount"]["value"] = "0";
        expect(state).to.deep.equal(expected);
    });

    it("calculation #2", () => {
        let [state, expected] = preinit();

        state = exchageBoxReducer(state, changeRate(""));
        expected["rate"]["value"] = '';

        expect(state).to.deep.equal(expected);
    });

    it("calculation #3", () => {
        let [state, expected] = preinit();

        state = exchageBoxReducer(state, changeRate(''));
        state = exchageBoxReducer(state, changeRate("0"));
        expected["rate"]["value"] = "0";
        expected["to_amount"]["value"] = "0";

        expect(state).to.deep.equal(expected);
    });

    it("calculation #4", () => {
        let [state, expected] = preinit();

        state = exchageBoxReducer(state, changeRate(""));
        state = exchageBoxReducer(state, changeRate("0"));
        expected["to_amount"]["value"] = "0";

        state = exchageBoxReducer(state, changeRate("0,"));
        expected["rate"]["value"] = "0,";
        expected["to_amount"]["value"] = '';

        expect(state).to.deep.equal(expected);
    });
});

function preinit() {
    let expected = {};

    let state = exchageBoxReducer({}, marketChanged("btc", "eth"));
    expected["from_currency"] = "btc";
    expected["to_currency"] = "eth";
    expect(state).to.deep.equal(expected);

    state = exchageBoxReducer(state, loggedIn());
    expected["isAuthenticated"] = true;
    expect(state).to.deep.equal(expected);

    state = exchageBoxReducer(state, marketInfoReceived(marketInfo));
    expected["isRateLoaded"] = true;
    expected["rate"]["value"] = "1";
    expect(state).to.deep.equal(expected);

    state = exchageBoxReducer(state, accountsReceived(accounts));
    expected["account"] = accounts["btc"];
    expected["isAccountLoaded"] = true;
    expected["isAccountExist"] = true;
    expected["from_amount"]["value"] = "1";
    expected["to_amount"]["value"] = "1";
    expect(state).to.deep.equal(expected);

    return [state, expected]
}
function pprint(obj) {
    console.log(JSON.stringify(obj, null, 2));
}
