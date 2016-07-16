import { expect } from "chai";
import React from "react";
import {
  ERROR_RATE_LT_MIN,
  ERROR_RATE_GT_MAX,
  ERROR_GT_BALANCE,
  ERROR_TOTAL_LT_MIN
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
  changeAmount,
  changeTotal,
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
  rate: "1.00000000",
  rate_24h_max: "0.00000000",
  rate_24h_min: "0.00000000",
  volume_24h: 0,
  pair: "btc_eth"
};

describe("ExchangeBox", () => {
  let state;
  let expected;

  beforeEach(() => {
    state = copy(getInitState());
    expected = copy(getInitState());
  });

  it("MARKET_CHANGED", () => {
    [state, expected] = testChangeMarket(state, expected);
    expect(state).to.deep.equal(expected);
  });

  it("LOGGED_IN", () => {
    [state, expected] = testAuthentication(state, expected);
    expect(state).to.deep.equal(expected);
  });

  it("ACCOUNT_RECEIVED", () => {
    [state, expected] = testChangeMarket(state, expected);
    [state, expected] = testAuthentication(state, expected);
    [state, expected] = testAccountLoaded(state, expected);
    expect(state).to.deep.equal(expected);
  });

  it("MARKET_INFO_RECEIVED", () => {
    [state, expected] = testChangeMarket(state, expected);
    [state, expected] = testAuthentication(state, expected);
    [state, expected] = testAccountLoaded(state, expected);
    [state, expected] = testMarketInfoReceived(state, expected);
    expect(state).to.deep.equal(expected);
  });

  it("calculation #1", () => {
    [state, expected] = preinit(state, expected);

    state = exchageBoxReducer(state, changeAmount("0"));
    expected["amount"] = genParam("0", null);
    expected["total"] = genParam("0", ERROR_TOTAL_LT_MIN);
    expect(state).to.deep.equal(expected);
  });

  it("calculation #2", () => {
    [state, expected] = preinit(state, expected);

    state = exchageBoxReducer(state, changeRate(""));
    expected["rate"] = genParam("", ERROR_FIELD_IS_REQUIRED);
    expected["total"] = genParam("", ERROR_FIELD_IS_REQUIRED);
    expect(state).to.deep.equal(expected);
  });

  it("calculation #3", () => {
    [state, expected] = preinit(state, expected);

    state = exchageBoxReducer(state, changeRate(""));
    state = exchageBoxReducer(state, changeRate("0"));

    expected["rate"] = genParam("0", ERROR_RATE_LT_MIN);
    expected["total"] = genParam("", ERROR_FIELD_IS_REQUIRED);
    expect(state).to.deep.equal(expected);
  });

  it("calculation #4", () => {
    [state, expected] = preinit(state, expected);

    state = exchageBoxReducer(state, changeRate(""));
    state = exchageBoxReducer(state, changeRate("0"));
    state = exchageBoxReducer(state, changeRate("0."));

    expected["rate"] = genParam("0.", ERROR_RATE_LT_MIN);
    expected["total"] = genParam("", ERROR_FIELD_IS_REQUIRED);
    expect(state).to.deep.equal(expected);
  });

  it("calculation #5", () => {
    [state, expected] = preinit(state, expected);

    state = exchageBoxReducer(state, changeRate(""));
    state = exchageBoxReducer(state, changeRate("0"));
    state = exchageBoxReducer(state, changeRate("0."));
    state = exchageBoxReducer(state, changeRate("0.0"));

    expected["rate"] = genParam("0.0", ERROR_RATE_LT_MIN);
    expected["total"] = genParam("", ERROR_FIELD_IS_REQUIRED);
    expect(state).to.deep.equal(expected);
  });

  it("calculation #6", () => {
    [state, expected] = preinit(state, expected);

    state = exchageBoxReducer(state, changeRate(""));
    state = exchageBoxReducer(state, changeRate("0"));
    state = exchageBoxReducer(state, changeRate("0."));
    state = exchageBoxReducer(state, changeRate("0.1"));

    expected["rate"] = genParam("0.1", null);
    expected["total"] = genParam("0.4", null);
    expect(state).to.deep.equal(expected);
  });

  it("calculation #7", () => {
    [state, expected] = preinit(state, expected);

    state = exchageBoxReducer(state, changeRate("0"));
    state = exchageBoxReducer(state, changeRate("01"));

    expected["rate"] = genParam("01", null);
    expect(state).to.deep.equal(expected);
  });

  it("calculation #8", () => {
    [state, expected] = preinit(state, expected);

    state = exchageBoxReducer(state, changeRate("-"));
    state = exchageBoxReducer(state, changeRate("-1"));

    expected["rate"] = genParam("-1", ERROR_RATE_LT_MIN);
    expect(state).to.deep.equal(expected);
  });

  it("calculation #9", () => {
    [state, expected] = preinit(state, expected);

    state = exchageBoxReducer(state, changeTotal(""));
    expected["total"] = genParam("", ERROR_FIELD_IS_REQUIRED);
    expected["amount"] = genParam("", ERROR_FIELD_IS_REQUIRED);
    expected["last_changed"] = "total";
    expect(state).to.deep.equal(expected);
  });

  it("calculation #10", () => {
    [state, expected] = preinit(state, expected);

    state = exchageBoxReducer(state, changeAmount(""));

    expected["amount"] = genParam("", ERROR_FIELD_IS_REQUIRED);
    expected["total"] = genParam("", ERROR_FIELD_IS_REQUIRED);
    expect(state).to.deep.equal(expected);
  });

  it("calculation #11", () => {
    [state, expected] = preinit(state, expected);

    state = exchageBoxReducer(state, changeRate("1"));
    state = exchageBoxReducer(state, changeRate("11"));
    state = exchageBoxReducer(state, changeRate("111"));
    state = exchageBoxReducer(state, changeRate("1111"));
    state = exchageBoxReducer(state, changeRate("11111"));

    expected["rate"] = genParam("11111", ERROR_RATE_GT_MAX);
    expected["total"] = genParam("444", null);
    expect(state).to.deep.equal(expected);
  });

  it("calculation #12", () => {
    [state, expected] = preinit(state, expected);

    state = exchageBoxReducer(state, changeRate(""));
    state = exchageBoxReducer(state, changeRate("0"));
    state = exchageBoxReducer(state, changeRate("0."));
    state = exchageBoxReducer(state, changeRate("0.0"));
    state = exchageBoxReducer(state, changeRate("0.00"));
    state = exchageBoxReducer(state, changeRate("0.0001"));

    expected["rate"] = genParam("0.0001", null);
    expected["total"] = genParam("0.0004", ERROR_TOTAL_LT_MIN);
    expect(state).to.deep.equal(expected);
  });

  it("calculation #13", () => {
    [state, expected] = preinit(state, expected);

    state = exchageBoxReducer(state, changeTotal(""));
    state = exchageBoxReducer(state, changeTotal("1"));
    state = exchageBoxReducer(state, changeTotal("10"));
    expected["last_changed"] = "total";


    expected["total"] = genParam("10", null);
    expected["amount"] = genParam("10", ERROR_GT_BALANCE);
    expect(state).to.deep.equal(expected);
  });

  it("calculation #14", () => {
    [state, expected] = preinit(state, expected);

    state = exchageBoxReducer(state, changeTotal(""));
    state = exchageBoxReducer(state, changeTotal("1"));
    expected["last_changed"] = "total";

    expected["total"] = genParam("1", null);
    expected["amount"] = genParam("1", null);
    expect(state).to.deep.equal(expected);
  });

  it("calculation #15", () => {
    [state, expected] = preinit(state, expected);

    state = exchageBoxReducer(state, changeTotal(""));
    state = exchageBoxReducer(state, changeTotal("4"));
    expected["last_changed"] = "total";
    expect(state).to.deep.equal(expected);
  });

  it("calculation #16", () => {
    [state, expected] = preinit(state, expected);

    state = exchageBoxReducer(state, changeAmount(""));
    state = exchageBoxReducer(state, changeAmount("-"));
    state = exchageBoxReducer(state, changeAmount("-4"));
    expected["last_changed"] = "amount";

    expected["amount"] = genParam("-4", ERROR_FIELD_LT_ZERO);
    expected["total"] = genParam("", ERROR_FIELD_IS_REQUIRED);
    expect(state).to.deep.equal(expected);
  });

  it("calculation #17", () => {
    [state, expected] = preinit(state, expected);

    state = exchageBoxReducer(state, changeRate("14"));
    state = exchageBoxReducer(state, changeTotal("1"));
    expected["last_changed"] = "total";

    expected["amount"] = genParam("0.07142857", null);
    expected["rate"] = genParam("14", null);
    expected["total"] = genParam("1", null);
    expect(state).to.deep.equal(expected);
  });
});

function testChangeMarket(state, expected) {
  state = exchageBoxReducer(state, marketChanged("btc", "eth", "btc_eth", "sell"));
  expected["from_currency"] = "btc";
  expected["to_currency"] = "eth";
  expected["pair"] = "btc_eth";
  expected["order_type"] = "sell";

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
    expected["amount"] = genParam("4", null);
    expected["last_changed"] = "amount";
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
      expected["total"] = genParam("4", null);
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