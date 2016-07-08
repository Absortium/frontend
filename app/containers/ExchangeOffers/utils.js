import BigNumber from "bignumber.js";

function getIndex(offers, price) {
  let index = -1;
  for (var i = 0, len = offers.length; i < len; i++) {
    if (offers[i].price.equals(price)) {
      index = i;
      break;
    }
  }
  return index
}

function merge(offers, newOffers) {
  for (let offer of newOffers) {
    let index = getIndex(offers, offer.price);

    if (index != -1) {
      offers[index] = offer;
    } else {
      offers.push(offer);
    }
  }
  return offers;
}

function clean(offers) {
  for (var i = 0, len = offers.length; i < len; i++) {
    let offer = offers[i];

    if (offer.amount.isZero()) {
      offers.splice(i, 1);
    }
  }

  return offers;
}

function sortOffers(offers) {
  function compare(a, b) {
    if (a.price.lessThan(b.price))
      return 1;
    if (a.price.greaterThan(b.price))
      return -1;
    return 0;
  }

  offers.sort(compare);
  return offers;
}

function transform(offers) {
  let data = [];

  for (let offer of offers) {
    let price = new BigNumber(offer.price);
    let amount = new BigNumber(offer.amount);
    let to_amount = amount.times(price);

    data.push({
      price: price,
      amount: amount,
      to_amount: to_amount
    });
  }

  return data;
}

export function process(_offers, _newOffers) {
  let newOffers = Object.assign([], _newOffers);
  let offers = Object.assign([], _offers);

  newOffers = transform(newOffers);

  offers = merge(offers, newOffers);
  offers = clean(offers);
  offers = sortOffers(offers);
  return offers
}