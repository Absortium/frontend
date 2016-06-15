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

const initialState = {
    offers: {},
    offersLoaded: false
};

var offers = [
    {price: 1, amount: 1},
    {price: 2, amount: 1}
];


describe("ExchangeOffersReducer", () => {
    let state;
    let expected;

    beforeEach(() => {
        state = copy(getInitState());
        expected = copy(getInitState());
    });

    // it("offer received", () => {
    //     testChangeMarket(state, expected);
    // });
    //
    // it("is authenticated", () => {
    //     testAuthentication(state, expected)
    // });
    //
    // it("accounts loaded", () => {
    //     [state, expected] = testChangeMarket(state, expected);
    //     [state, expected] = testAuthentication(state, expected);
    //
    //     testAccountLoaded(state, expected);
    // });
    //
    // it("market info received", () => {
    //     [state, expected] = testChangeMarket(state, expected);
    //     [state, expected] = testAuthentication(state, expected);
    //     [state, expected] = testAccountLoaded(state, expected);
    //
    //     testMarketInfoReceived(state, expected)
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