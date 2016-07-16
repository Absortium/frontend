import { expect } from "chai";
import { copy } from "utils/general";
import React from "react";
import {
  offerReceived,
  offersChanged
} from "containers/App/actions";
import exchangeOffersReducer from "../reducer";

function makeTestable(offer) {
  let data = {};
  for (let key in offer) data[key] = parseFloat(offer[key] + "")
  return data
}

describe("ExchangeOffers reducer", () => {
  let state;
  let expected;


  beforeEach(() => {
    state = copy(getInitState());
    expected = copy(getInitState());
  });

  it("check action OFFERS_RECEIVED", () => {
    const offers = [{ price: 1, amount: 2 }];

    state = exchangeOffersReducer(state, offerReceived(offers));

    expect(state).to.have.property("offers").and.not.equal(null);
    expect(state).to.have.property("offersLoaded").and.equal(true);
    expect(makeTestable(state.offers[0])).to.deep.equal({
      price: 1,
      amount: 2,
      total: 2
    });
  });

  it("check action OFFERS_CHANGED", () => {
    const offers = [{ price: 1, amount: 2 }];
    const update = [{ price: 1, amount: 3 }];

    state = exchangeOffersReducer(state, offerReceived(offers));
    state = exchangeOffersReducer(state, offersChanged(update));

    expect(state).to.have.property("offers").and.not.equal(null);
    expect(state).to.have.property("offersLoaded").and.equal(true);

    expect(makeTestable(state.offers[0])).to.deep.equal({
      price: 1,
      amount: 3,
      total: 3
    });
  });
});

function getInitState() {
  return exchangeOffersReducer(undefined, {})
}