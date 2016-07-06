import { expect } from "chai";
import React from "react";
import {
  ERROR_RATE_LT_MIN,
  ERROR_RATE_GT_MAX,
  ERROR_FROM_AMOUNT_GT_BALANCE,
  ERROR_TO_AMOUNT_LT_MIN
} from "../constants";
import {
  ERROR_FIELD_IS_REQUIRED,
  ERROR_FIELD_LT_ZERO
} from "containers/App/constants";
import {
  loggedIn,
  accountReceived,
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
import BigNumber from "bignumber.js";

var account = {
  address: "wxaH5tcgFYLYwJiyPmMNFgSLFyKKMP",
  amount: 4,
  currency: "btc",
  pk: 2
};

var marketInfo = {
  btc: {
    eth: {
      rate: "1.00000000",
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

  afterEach(() => {
    expect(state).to.deep.equal(expected);
  });

  it("MARKET_CHANGED", () => {
    [state, expected] = testChangeMarket(state, expected);
  });

  it("LOGGED_IN", () => {
    [state, expected] = testAuthentication(state, expected);
  });

  it("ACCOUNT_RECEIVED", () => {
    [state, expected] = testChangeMarket(state, expected);
    [state, expected] = testAuthentication(state, expected);
    [state, expected] = testAccountLoaded(state, expected);
  });

  it("MARKET_INFO_RECEIVED", () => {
    [state, expected] = testChangeMarket(state, expected);
    [state, expected] = testAuthentication(state, expected);
    [state, expected] = testAccountLoaded(state, expected);
    [state, expected] = testMarketInfoReceived(state, expected);
  });

  it("calculation #1", () => {
    [state, expected] = preinit(state, expected);

    state = exchageBoxReducer(state, changeFromAmount("0"));
    expected["from_amount"] = genParam("0", null);
    expected["to_amount"] = genParam("0", ERROR_TO_AMOUNT_LT_MIN);
  });

  it("calculation #2", () => {
    [state, expected] = preinit(state, expected);

    state = exchageBoxReducer(state, changeRate(""));
    expected["rate"] = genParam("", ERROR_FIELD_IS_REQUIRED);
    expected["to_amount"] = genParam("", ERROR_FIELD_IS_REQUIRED);
  });

  it("calculation #3", () => {
    [state, expected] = preinit(state, expected);

    state = exchageBoxReducer(state, changeRate(""));
    state = exchageBoxReducer(state, changeRate("0"));

    expected["rate"] = genParam("0", ERROR_RATE_LT_MIN);
    expected["to_amount"] = genParam("", ERROR_FIELD_IS_REQUIRED);
  });

  it("calculation #7", () => {
    [state, expected] = preinit(state, expected);

    state = exchageBoxReducer(state, changeRate(""));
    state = exchageBoxReducer(state, changeRate("0"));
    state = exchageBoxReducer(state, changeRate("0."));

    expected["rate"] = genParam("0.", ERROR_RATE_LT_MIN);
    expected["to_amount"] = genParam("", ERROR_FIELD_IS_REQUIRED);
  });

  it("calculation #8", () => {
    [state, expected] = preinit(state, expected);

    state = exchageBoxReducer(state, changeRate(""));
    state = exchageBoxReducer(state, changeRate("0"));
    state = exchageBoxReducer(state, changeRate("0."));
    state = exchageBoxReducer(state, changeRate("0.0"));

    expected["rate"] = genParam("0.0", ERROR_RATE_LT_MIN);
    expected["to_amount"] = genParam("", ERROR_FIELD_IS_REQUIRED);
  });

  it("calculation #9", () => {
    [state, expected] = preinit(state, expected);

    state = exchageBoxReducer(state, changeRate(""));
    state = exchageBoxReducer(state, changeRate("0"));
    state = exchageBoxReducer(state, changeRate("0."));
    state = exchageBoxReducer(state, changeRate("0.1"));

    expected["rate"] = genParam("0.1", null);
    expected["to_amount"] = genParam("0.4", null);
  });

  it("calculation #10", () => {
    [state, expected] = preinit(state, expected);

    state = exchageBoxReducer(state, changeRate("0"));
    state = exchageBoxReducer(state, changeRate("01"));

    expected["rate"] = genParam("01", null);
  });

  it("calculation #12", () => {
    [state, expected] = preinit(state, expected);

    state = exchageBoxReducer(state, changeRate("-"));
    state = exchageBoxReducer(state, changeRate("-1"));

    expected["rate"] = genParam("-1", ERROR_RATE_LT_MIN);
  });

  it("calculation #13", () => {
    [state, expected] = preinit(state, expected);

    state = exchageBoxReducer(state, changeToAmount(""));

    expected["to_amount"] = genParam("", ERROR_FIELD_IS_REQUIRED);
    expected["from_amount"] = genParam("", ERROR_FIELD_IS_REQUIRED);
  });

  it("calculation #14", () => {
    [state, expected] = preinit(state, expected);

    state = exchageBoxReducer(state, changeFromAmount(""));

    expected["from_amount"] = genParam("", ERROR_FIELD_IS_REQUIRED);
    expected["to_amount"] = genParam("", ERROR_FIELD_IS_REQUIRED);
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
  });

  it("calculation #17", () => {
    [state, expected] = preinit(state, expected);

    state = exchageBoxReducer(state, changeToAmount(""));
    state = exchageBoxReducer(state, changeToAmount("1"));
    state = exchageBoxReducer(state, changeToAmount("10"));
    expected["last_changed"] = "to_amount";


    expected["to_amount"] = genParam("10", null);
    expected["from_amount"] = genParam("10", ERROR_FROM_AMOUNT_GT_BALANCE);
  });

  it("calculation #18", () => {
    [state, expected] = preinit(state, expected);

    state = exchageBoxReducer(state, changeToAmount(""));
    state = exchageBoxReducer(state, changeToAmount("1"));
    expected["last_changed"] = "to_amount";

    expected["to_amount"] = genParam("1", null);
    expected["from_amount"] = genParam("1", null);
  });

  it("calculation #19", () => {
    [state, expected] = preinit(state, expected);

    state = exchageBoxReducer(state, changeToAmount(""));
    state = exchageBoxReducer(state, changeToAmount("4"));
    expected["last_changed"] = "to_amount";
  });

  it("calculation #20", () => {
    [state, expected] = preinit(state, expected);

    state = exchageBoxReducer(state, changeFromAmount(""));
    state = exchageBoxReducer(state, changeFromAmount("-"));
    state = exchageBoxReducer(state, changeFromAmount("-4"));
    expected["last_changed"] = "from_amount";

    expected["from_amount"] = genParam("-4", ERROR_FIELD_LT_ZERO);
    expected["to_amount"] = genParam("", ERROR_FIELD_IS_REQUIRED);
  });

  it("calculation #21", () => {
    [state, expected] = preinit(state, expected);

    state = exchageBoxReducer(state, changeRate("14"));
    state = exchageBoxReducer(state, changeToAmount("1"));
    expected["last_changed"] = "to_amount";

    expected["from_amount"] = genParam("0.07142857142857142857", null);
    expected["rate"] = genParam("14", null);
    expected["to_amount"] = genParam("1", null);
  });
});

function testChangeMarket(state, expected) {
  state = exchageBoxReducer(state, marketChanged("btc", "eth"));
  expected["from_currency"] = "btc";
  expected["to_currency"] = "eth";

  return [state, expected]
}

function testAuthentication(state, expected) {
  state = exchageBoxReducer(state, loggedIn());
  expected["isAuthenticated"] = true;

  return [state, expected]
}

function testAccountLoaded(state, expected, isFirst = true) {
  state = exchageBoxReducer(state, accountReceived(account));
  expected["balance"] = new BigNumber(4);
  expected["isAccountLoaded"] = true;
  expected["isAccountExist"] = true;

  if (isFirst) {
    expected["from_amount"] = genParam("4", null);
    expected["last_changed"] = "from_amount";
  }

  return [state, expected]
}

function testMarketInfoReceived(state, expected, isFirst = true) {
  state = exchageBoxReducer(state, marketInfoReceived(marketInfo));
  expected["isRateLoaded"] = true;
  expected["market_rate"] = new BigNumber("1");

  if (isFirst) {
    expected["rate"] = genParam("1", null);

    if (expected["isAccountLoaded"]) {
      expected["to_amount"] = genParam("4", null);
    }
  }

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