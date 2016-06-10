import { expect } from "chai";
import {
    shallow,
    mount
} from "enzyme";
import React from "react";
import exchageBoxReducer from "../reducer";
import { fromJS } from "immutable";
import { ERROR_FIELD_IS_REQUIRED } from "../constants";
import {
    loggedIn,
    accountsReceived,
    marketChanged,
    marketInfoReceived
} from "../../App/actions";
import { genParam } from "../../../utils/general";
import _ from "lodash";

const initialState = {
    isAuthenticated: false,
    isRateLoaded: false,
    isAccountExist: false,
    isAccountLoaded: false,
    account: null,

    rate: {
        value: null,
        error: ERROR_FIELD_IS_REQUIRED
    },
    from_amount: {
        value: null,
        error: ERROR_FIELD_IS_REQUIRED
    },
    to_amount: {
        value: null,
        error: ERROR_FIELD_IS_REQUIRED
    },

    from_currency: null,
    to_currency: null
};

var accounts = {
    btc: {
        address: "wxaH5tcgFYLYwJiyPmMNFgSLFyKKMP",
        amount: 4 * Math.pow(10, 8),
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
    let state;
    let expected;

    beforeEach(() => {
        state = clone(getInitState());
        expected = clone(getInitState());
    });

    it("change market", () => {
        testChangeMarket(state, expected);
    });

    it("is authenticated", () => {
        testAuthentication(state, expected)
    });

    it("accounts loaded", () => {
        [state, expected] = testChangeMarket(state, expected);
        [state, expected] = testAuthentication(state, expected);

        testAccountLoaded(state, expected)
    });

    it("market info received", () => {
        [state, expected] = testChangeMarket(state, expected);
        [state, expected] = testAuthentication(state, expected);
        [state, expected] = testAccountLoaded(state, expected);

        testMarketInfoReceived(state, expected)
    });

    // it("calculation #1", () => {
    //     let [state, expected] = preinit();
    //
    //     state = exchageBoxReducer(state, changeFromAmount("0"));
    //     expected["from_amount"] = genParam(0, null);
    //     expected["to_amount"] = genParam(0, null);
    //     expect(state).to.deep.equal(expected);
    // });
    //
    // it("calculation #2", () => {
    //     let [state, expected] = preinit();
    //
    //     state = exchageBoxReducer(state, changeRate(""));
    //     expected["rate"]["value"] = '';
    //
    //     expect(state).to.deep.equal(expected);
    // });
    //
    // it("calculation #3", () => {
    //     let [state, expected] = preinit();
    //
    //     state = exchageBoxReducer(state, changeRate(''));
    //     state = exchageBoxReducer(state, changeRate("0"));
    //     expected["rate"] = genParam("0", null);
    //     expected["to_amount"] = genParam("0", null);
    //
    //     expect(state).to.deep.equal(expected);
    // });
    //
    // it("calculation #4", () => {
    //     let [state, expected] = preinit();
    //
    //     state = exchageBoxReducer(state, changeRate(""));
    //     state = exchageBoxReducer(state, changeRate("0"));
    //     expected["to_amount"] = genParam("0", null);
    //
    //     state = exchageBoxReducer(state, changeRate("0,"));
    //     expected["rate"] = genParam("0,", null);
    //     expected["to_amount"] = genParam("", null);
    //
    //     expect(state).to.deep.equal(expected);
    // });
});

function testChangeMarket(state, expected) {
    state = exchageBoxReducer(state, marketChanged("btc", "eth"));
    expected["from_currency"] = "btc";
    expected["to_currency"] = "eth";

    expect(state).to.deep.equal(expected);

    return [state, expected]
}

function testAuthentication(state, expected) {
    state = exchageBoxReducer(state, loggedIn());
    expected["isAuthenticated"] = true;

    expect(state).to.deep.equal(expected);

    return [state, expected]
}

function testAccountLoaded(state, expected) {
    state = exchageBoxReducer(state, accountsReceived(clone(accounts)));
    expected["account"] = clone(accounts["btc"]);
    expected["account"]["amount"] = 4;
    expected["isAccountLoaded"] = true;
    expected["isAccountExist"] = true;
    expected["from_amount"] = genParam(4, null);

    expect(state).to.deep.equal(expected);

    return [state, expected]
}

function testMarketInfoReceived(state, expected) {
    state = exchageBoxReducer(state, marketInfoReceived(clone(marketInfo)));
    expected["isRateLoaded"] = true;
    expected["rate"] = genParam(1, null);
    expected["to_amount"] = genParam(1, null);

    diff(state, expected);
    pprint(state);
    pprint(expected);

    expect(state).to.deep.equal(expected);

    return [state, expected]
}

function getInitState() {
    return exchageBoxReducer(undefined, {})
}

function preinit() {
    let state = initialState;
    let expected = initialState;

    [state, expected] = testChangeMarket(state, expected);
    [state, expected] = testAuthentication(state, expected);
    [state, expected] = testAccountLoaded(state, expected);
    [state, expected] = testMarketInfoReceived(state, expected);

    return [state, expected]
}

function clone(obj) {
    return JSON.parse(JSON.stringify(obj))
}
function pprint(obj) {
    console.log(JSON.stringify(obj, null, 2));
}

function diff(d1, d2) {
    _.merge(clone(d1), clone(d2), function (objectValue, sourceValue, key, object, source) {
        console.log(objectValue);

        if (!(_.isEqual(objectValue, sourceValue)) && (Object(objectValue) !== objectValue)) {
            console.log(key + "\n    Expected: " + sourceValue + "\n    Actual: " + objectValue);
        }
    });
}