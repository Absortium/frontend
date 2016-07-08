import { expect } from "chai";
import { copy } from "utils/general";
import React from "react";
import {
  offerReceived,
  offersChanged
} from "containers/App/actions";
import exchangeOffersReducer from "../reducer";
import { pprint } from "../../../utils/general";

function transform(offer) {
    let data = {};
    for (let key in offer) data[key] = parseFloat(offer[key] + "")
    return data
}

describe("ExchangeOffersReducer", () => {
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
    expect(transform(state.offers[0])).to.deep.equal({
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

    expect(transform(state.offers[0])).to.deep.equal({
      price: 1,
      amount: 3,
      total: 3
    });
  });

  it("check add new offer", () => {
    const offers = [{ price: 1, amount: 2 }];
    const update = [{ price: 2, amount: 2 }];

    state = exchangeOffersReducer(state, offerReceived(offers));
    state = exchangeOffersReducer(state, offersChanged(update));

    expect(state).to.have.property("offers").and.not.equal(null);
    expect(state).to.have.property("offersLoaded").and.equal(true);

    expect(transform(state.offers[0])).to.deep.equal({
      price: 1,
      amount: 2,
      total: 2
    });

    expect(transform(state.offers[1])).to.deep.equal({
      price: 0.5,
      amount: 2,
      total: 4
    });
  });

  it("check offer sorting", () => {
    const offers = [{ price: 1, amount: 2 }];
    const update = [
      { price: 2, amount: 2 },
      { price: 4, amount: 2 }
    ];


    state = exchangeOffersReducer(state, offerReceived(offers));
    state = exchangeOffersReducer(state, offersChanged(update));

    expect(state).to.have.property("offers").and.not.equal(null);
    expect(state).to.have.property("offersLoaded").and.equal(true);

    expect(transform(state.offers[0]).price).and.equal(1);
    expect(transform(state.offers[1]).price).and.equal(0.5);
    expect(transform(state.offers[2]).price).and.equal(0.25);
  });

  it("check delete offer", () => {
    const offers = [{ price: 1, amount: 2 }];
    const update = [{ price: 1, amount: 0 }];


    state = exchangeOffersReducer(state, offerReceived(offers));
    state = exchangeOffersReducer(state, offersChanged(update));

    expect(state).to.have.property("offers").and.not.equal(null);
    expect(state).to.have.property("offersLoaded").and.equal(true);

    expect(state.offers).and.deep.equal([]);
  });
});

function getInitState() {
  return exchangeOffersReducer(undefined, {})
}