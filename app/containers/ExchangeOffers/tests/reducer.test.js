import { expect } from "chai";
import {
    shallow,
    mount
} from "enzyme";
import { copy } from "utils/general";
import React from "react";
import {
    offerReceived,
    offersChanged
} from "containers/App/actions";
import exchangeOffersReducer from "../reducer";

let offers = [
    { price: 1, amount: 2 },
    { price: 2, amount: 2 }
];


let update = [
    { price: 1, amount: 3 }
];

function checkPurity() {
    for (let offer of offers) {
        expect(offer).to.have.property("price");
        expect(offer).to.have.property("amount").and.equal(2);
    }
}

describe("ExchangeOffersReducer", () => {
    let state;
    let expected;

    beforeEach(() => {
        state = copy(getInitState());
        expected = copy(getInitState());
    });

    it("OFFERS_RECEIVED", () => {
        state = exchangeOffersReducer(state, offerReceived(offers));

        expect(state).to.have.property("offers").and.not.equal(null);
        expect(state).to.have.property("offersLoaded").and.equal(true);


        for (let price in state.offers) {
            let amount = state.offers[price];
            expect(amount).equal(2);
        }

        checkPurity();
    });

    it("OFFERS_CHANGED", () => {
        state = exchangeOffersReducer(state, offerReceived(offers));
        state = exchangeOffersReducer(state, offersChanged(update));

        expect(state).to.have.property("offers").and.not.equal(null);
        expect(state).to.have.property("offersLoaded").and.equal(true);

        for (let price in state.offers) {
            let amount = state.offers[price];

            if (price == 1) {
                expect(amount).equal(3);
            } else {
                expect(amount).equal(2);
            }
        }
    });
});

function getInitState() {
    return exchangeOffersReducer(undefined, {})
}