import { expect } from "chai";
import React from "react";
import {locationOfOffer, transform, sortOffers, insertOffer} from "containers/ExchangeOffers/utils"
import { pprint } from "../../../utils/general";

function t(offer) {
  let data = {};
  for (let key in offer) data[key] = parseFloat(offer[key] + "")
  return data
}

describe("ExchangeOffers utils", () => {

  it("transform", () => {
    const offers = transform([{ price: 2, amount: 2 }, { price: 1, amount: 1 }]);
    for (let offer of offers) {
      expect(typeof(offer.price)).to.equal("object");
      expect(typeof(offer.amount)).to.equal("object");
      expect(typeof(offer.total)).to.equal("object");
    }

  });

  it("sortOffers", () => {
    let offers = transform([
      { price: 4, amount: 1 },
      { price: 3, amount: 2 },
      { price: 2, amount: 3 },
      { price: 1, amount: 4 }
    ]);

    offers = sortOffers(offers);
    expect(t(offers[0]).price).to.equal(1);
    expect(t(offers[1]).price).to.equal(2);
    expect(t(offers[2]).price).to.equal(3);
    expect(t(offers[3]).price).to.equal(4);

  });

  it("locationOfOffer lower than all", () => {
    let newOffers = transform([{ price: 1, amount: 1 }]);
    let offers = sortOffers(transform([{ price: 2, amount: 2 }]));

    let [index, isExist] = locationOfOffer(newOffers[0], offers);
    expect(index).to.equal(0);
    expect(isExist).to.equal(false);
  });

  it("locationOfOffer same price", () => {
    let newOffers = transform([{ price: 1, amount: 2 }]);
    let offers = sortOffers(transform([
      { price: 1, amount: 2 },
      { price: 2, amount: 2 }
    ]));

    let [index, isExist] = locationOfOffer(newOffers[0], offers);
    expect(index).to.equal(0);
    expect(isExist).to.equal(true);
  });

  it("locationOfOffer bigger than all", () => {
    let newOffers = transform([{ price: 5, amount: 2 }]);
    let offers = sortOffers(transform([
      { price: 1, amount: 2 },
      { price: 2, amount: 2 },
      { price: 3, amount: 2 }
    ]));

    let [index, isExist] = locationOfOffer(newOffers[0], offers);
    expect(index).to.equal(3);
    expect(isExist).to.equal(false);
  });


  it("locationOfOffer in the middle", () => {
    let newOffers = transform([{ price: 2, amount: 2 }]);
    let offers = sortOffers(transform([
      { price: 1, amount: 2 },
      { price: 3, amount: 2 }
    ]));

    let [index, isExist] = locationOfOffer(newOffers[0], offers);
    expect(index).to.equal(1);
    expect(isExist).to.equal(false);
  });


  it("insertOffer update", () => {
    let newOffers = transform([{ price: 1, amount: 1 }]);
    let offers = sortOffers(transform([
      { price: 1, amount: 2 },
      { price: 2, amount: 2 }
    ]));

    offers = insertOffer(newOffers[0], offers);
    expect(t(offers[0]).amount).to.equal(1);
  });

  it("insertOffer delete", () => {
    let newOffers = transform([{ price: 1, amount: 0 }]);
    let offers = sortOffers(transform([
      { price: 1, amount: 1 },
      { price: 2, amount: 2 }
    ]));

    offers = insertOffer(newOffers[0], offers);

    expect(t(offers[0]).price).to.equal(2);
    expect(t(offers[0]).amount).to.equal(2);
    expect(offers.length).to.equal(1);
  });

  it("insertOffer insert", () => {
    let newOffers = transform([{ price: 2, amount: 2}]);
    let offers = sortOffers(transform([
      { price: 1, amount: 1 },
      { price: 3, amount: 3 }
    ]));

    offers = insertOffer(newOffers[0], offers);

    expect(t(offers[1]).price).to.equal(2);
    expect(t(offers[1]).amount).to.equal(2);
    expect(offers.length).to.equal(3);
  });

});
