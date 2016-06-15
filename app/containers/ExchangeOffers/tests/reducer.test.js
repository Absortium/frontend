import { expect } from "chai";
import {
    shallow,
    mount
} from "enzyme";
import {pprint} from "utils/general"
import React from "react";
import { offerReceived, offersChanged } from "containers/App/actions";
import { copy } from "utils/general";
import exchangeOffersReducer from "../reducer";

let offers = [
    { price: "1.00", amount: 2 * Math.pow(10, 8) },
    { price: "2.00", amount: 2 * Math.pow(10, 8) }
];


let update = [
    { price: "1.00", amount: 3 * Math.pow(10, 8) }
];

function checkPurity() {
    for (let offer of offers) {
        expect(offer).to.have.property("price");
        expect(offer).to.have.property("amount").and.equal(2 * Math.pow(10, 8));
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
            expect(amount).equal("2.0000000");
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

            if (price == "1.0000000") {
                expect(amount).equal("3.0000000");
            } else {
                expect(amount).equal("2.0000000");
            }
        }
    });
});

function getInitState() {
    return exchangeOffersReducer(undefined, {})
}