import { expect } from "chai";
import {
    shallow,
    mount
} from "enzyme";
import React from "react";
import {
    ERROR_RATE_LT_MIN,
    ERROR_RATE_GT_MAX,
    ERROR_FROM_AMOUNT_GT_BALANCE,
    ERROR_TO_AMOUNT_LT_MIN
} from "../constants";
import {
    ERROR_FIELD_IS_REQUIRED,
    ERROR_FIELD_NOT_VALID,
    ERROR_FIELD_LT_ZERO
} from "containers/App/constants";
import {
    loggedIn,
    accountsReceived,
    marketChanged,
    marketInfoReceived
} from "containers/App/actions";
import {
    changeFromAmount,
    changeToAmount,
    changeRate
} from "../actions";
import {
    genParam,
    copy
} from "utils/general";
import exchageBoxReducer from "../reducer";
import _ from "lodash";

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
        state = copy(getInitState());
        expected = copy(getInitState());
    });

    it("MARKET_CHANGED", () => {
        testChangeMarket(state, expected);
    });

    it("LOGGED_IN", () => {
        testAuthentication(state, expected)
    });

    it("ACCOUNT_RECEIVED", () => {
        [state, expected] = testChangeMarket(state, expected);
        [state, expected] = testAuthentication(state, expected);

        testAccountLoaded(state, expected);
    });

    it("MARKET_INFO_RECEIVED", () => {
        [state, expected] = testChangeMarket(state, expected);
        [state, expected] = testAuthentication(state, expected);
        [state, expected] = testAccountLoaded(state, expected);

        
        testMarketInfoReceived(state, expected)
    });

    it("calculation #1", () => {
        [state, expected] = preinit(state, expected);

        state = exchageBoxReducer(state, changeFromAmount("0"));
        expected["from_amount"] = genParam("0", null);
        expected["to_amount"] = genParam("0", ERROR_TO_AMOUNT_LT_MIN);

        expect(state).to.deep.equal(expected);
    });

    it("calculation #2", () => {
        [state, expected] = preinit(state, expected);

        state = exchageBoxReducer(state, changeRate(""));
        expected["rate"] = genParam("", ERROR_FIELD_IS_REQUIRED);
        expected["to_amount"] = genParam("", ERROR_FIELD_IS_REQUIRED);

        expect(state).to.deep.equal(expected);
    });

    it("calculation #3", () => {
        [state, expected] = preinit(state, expected);

        state = exchageBoxReducer(state, changeRate(""));
        state = exchageBoxReducer(state, changeRate("0"));

        expected["rate"] = genParam("0", ERROR_RATE_LT_MIN);
        expected["to_amount"] = genParam("", ERROR_FIELD_IS_REQUIRED);

        expect(state).to.deep.equal(expected);
    });

    it("calculation #5", () => {
        [state, expected] = preinit(state, expected);

        state = exchageBoxReducer(state, changeRate(""));

        // In this case 'to_amount' is not changing because 0 is not valid value
        state = exchageBoxReducer(state, changeRate("0"));
        state = exchageBoxReducer(state, changeRate("0,"));

        expected["rate"] = genParam("0,", ERROR_FIELD_NOT_VALID);
        expected["to_amount"] = genParam("", ERROR_FIELD_IS_REQUIRED);

        expect(state).to.deep.equal(expected);
    });

    it("calculation #6", () => {
        [state, expected] = preinit(state, expected);

        state = exchageBoxReducer(state, changeRate(""));

        // In this case 'to_amount' is not changing because 0 is not valid value
        state = exchageBoxReducer(state, changeRate("0"));
        state = exchageBoxReducer(state, changeRate("0,"));
        state = exchageBoxReducer(state, changeRate("0,0"));

        expected["rate"] = genParam("0,0", ERROR_FIELD_NOT_VALID);
        expected["to_amount"] = genParam("", ERROR_FIELD_IS_REQUIRED);

        expect(state).to.deep.equal(expected);

    });

    it("calculation #7", () => {
        [state, expected] = preinit(state, expected);

        state = exchageBoxReducer(state, changeRate(""));
        state = exchageBoxReducer(state, changeRate("0"));
        state = exchageBoxReducer(state, changeRate("0."));

        expected["rate"] = genParam("0.", ERROR_RATE_LT_MIN);
        expected["to_amount"] = genParam("", ERROR_FIELD_IS_REQUIRED);

        expect(state).to.deep.equal(expected);
    });

    it("calculation #8", () => {
        [state, expected] = preinit(state, expected);

        state = exchageBoxReducer(state, changeRate(""));
        state = exchageBoxReducer(state, changeRate("0"));
        state = exchageBoxReducer(state, changeRate("0."));
        state = exchageBoxReducer(state, changeRate("0.0"));

        expected["rate"] = genParam("0.0", ERROR_RATE_LT_MIN);
        expected["to_amount"] = genParam("", ERROR_FIELD_IS_REQUIRED);

        expect(state).to.deep.equal(expected);
    });

    it("calculation #9", () => {
        [state, expected] = preinit(state, expected);

        state = exchageBoxReducer(state, changeRate(""));
        state = exchageBoxReducer(state, changeRate("0"));
        state = exchageBoxReducer(state, changeRate("0."));
        state = exchageBoxReducer(state, changeRate("0.1"));

        expected["rate"] = genParam("0.1", null);
        expected["to_amount"] = genParam("0.4", null);

        expect(state).to.deep.equal(expected);
    });

    it("calculation #10", () => {
        [state, expected] = preinit(state, expected);

        state = exchageBoxReducer(state, changeRate("0"));
        state = exchageBoxReducer(state, changeRate("01"));

        expected["rate"] = genParam("01", null);

        expect(state).to.deep.equal(expected);
    });

    it("calculation #11", () => {
        [state, expected] = preinit(state, expected);

        state = exchageBoxReducer(state, changeRate("-"));

        expected["rate"] = genParam("-", ERROR_FIELD_NOT_VALID);

        expect(state).to.deep.equal(expected);
    });

    it("calculation #12", () => {
        [state, expected] = preinit(state, expected);

        state = exchageBoxReducer(state, changeRate("-"));
        state = exchageBoxReducer(state, changeRate("-1"));

        expected["rate"] = genParam("-1", ERROR_RATE_LT_MIN);

        expect(state).to.deep.equal(expected);
    });

    it("calculation #13", () => {
        [state, expected] = preinit(state, expected);

        state = exchageBoxReducer(state, changeToAmount(""));

        expected["to_amount"] = genParam("", ERROR_FIELD_IS_REQUIRED);
        expected["from_amount"] = genParam("", ERROR_FIELD_IS_REQUIRED);

        expect(state).to.deep.equal(expected);
    });

    it("calculation #14", () => {
        [state, expected] = preinit(state, expected);

        state = exchageBoxReducer(state, changeFromAmount(""));

        expected["from_amount"] = genParam("", ERROR_FIELD_IS_REQUIRED);
        expected["to_amount"] = genParam("", ERROR_FIELD_IS_REQUIRED);

        expect(state).to.deep.equal(expected);
    });

    it("calculation #15", () => {
        [state, expected] = preinit(state, expected);

        state = exchageBoxReducer(state, changeRate("1"));
        state = exchageBoxReducer(state, changeRate("11"));
        state = exchageBoxReducer(state, changeRate("111"));
        state = exchageBoxReducer(state, changeRate("1111"));
        state = exchageBoxReducer(state, changeRate("11111"));

        expected["rate"] = genParam("11111", ERROR_RATE_GT_MAX);
        expected["to_amount"] = genParam("444", null);

        expect(state).to.deep.equal(expected);
    });

    it("calculation #16", () => {
        [state, expected] = preinit(state, expected);

        state = exchageBoxReducer(state, changeRate(""));
        state = exchageBoxReducer(state, changeRate("0"));
        state = exchageBoxReducer(state, changeRate("0."));
        state = exchageBoxReducer(state, changeRate("0.0"));
        state = exchageBoxReducer(state, changeRate("0.00"));
        state = exchageBoxReducer(state, changeRate("0.0001"));

        expected["rate"] = genParam("0.0001", null);
        expected["to_amount"] = genParam("0.0004", ERROR_TO_AMOUNT_LT_MIN);

        expect(state).to.deep.equal(expected);
    });

    it("calculation #17", () => {
        [state, expected] = preinit(state, expected);

        state = exchageBoxReducer(state, changeToAmount(""));
        state = exchageBoxReducer(state, changeToAmount("1"));
        state = exchageBoxReducer(state, changeToAmount("10"));

        expected["to_amount"] = genParam("10", null);
        expected["from_amount"] = genParam("10", ERROR_FROM_AMOUNT_GT_BALANCE);

        expect(state).to.deep.equal(expected);
    });

    it("calculation #18", () => {
        [state, expected] = preinit(state, expected);

        state = exchageBoxReducer(state, changeToAmount(""));
        state = exchageBoxReducer(state, changeToAmount("1"));

        expected["to_amount"] = genParam("1", null);
        expected["from_amount"] = genParam("1", null);

        expect(state).to.deep.equal(expected);
    });

    it("calculation #19", () => {
        [state, expected] = preinit(state, expected);

        state = exchageBoxReducer(state, changeToAmount(""));
        state = exchageBoxReducer(state, changeToAmount("4"));

        expect(state).to.deep.equal(expected);
    });

    it("calculation #20", () => {
        [state, expected] = preinit(state, expected);

        state = exchageBoxReducer(state, changeFromAmount(""));
        state = exchageBoxReducer(state, changeFromAmount("-"));
        state = exchageBoxReducer(state, changeFromAmount("-4"));

        expected["from_amount"] = genParam("-4", ERROR_FIELD_LT_ZERO);
        expected["to_amount"] = genParam("", ERROR_FIELD_IS_REQUIRED);

        expect(state).to.deep.equal(expected);
    });
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

function testAccountLoaded(state, expected, isFirst = true) {
    state = exchageBoxReducer(state, accountsReceived(copy(accounts)));
    expected["account"] = copy(accounts["btc"]);
    expected["account"]["amount"] = 4;
    expected["isAccountLoaded"] = true;
    expected["isAccountExist"] = true;

    if (isFirst) {
        expected["from_amount"] = genParam("4", null);
    }

    expect(state).to.deep.equal(expected);

    return [state, expected]
}

function testMarketInfoReceived(state, expected, isFirst = true, isAccountLoaded = true) {
    state = exchageBoxReducer(state, marketInfoReceived(copy(marketInfo)));
    expected["isRateLoaded"] = true;

    if (isFirst) {
        expected["rate"] = genParam("1", null);

        if (isAccountLoaded) {
            expected["to_amount"] = genParam("4", null);
        }
    }

    expect(state).to.deep.equal(expected);

    return [state, expected]
}

function getInitState() {
    return exchageBoxReducer(undefined, {})
}

function preinit(state, expected) {
    [state, expected] = testChangeMarket(state, expected);
    [state, expected] = testAuthentication(state, expected);
    [state, expected] = testAccountLoaded(state, expected);
    [state, expected] = testMarketInfoReceived(state, expected);

    return [state, expected]
}


function diff(d1, d2) {
    _.merge(copy(d1), copy(d2), function (objectValue, sourceValue, key, object, source) {
        console.log(objectValue);

        if (!(_.isEqual(objectValue, sourceValue)) && (Object(objectValue) !== objectValue)) {
            console.log(key + "\n    Expected: " + sourceValue + "\n    Actual: " + objectValue);
        }
    });
}