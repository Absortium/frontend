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

export function merge(offers, newOffers) {
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

export function sortOffers(offers) {
  function compare(a, b) {
    if (a.price.lessThan(b.price))
      return -1;
    if (a.price.greaterThan(b.price))
      return 1;
    return 0;
  }

  offers.sort(compare);
  return offers;
}

export function transform(offers) {
  let data = [];

  for (let offer of offers) {
    let price = new BigNumber(offer.price);
    let amount = new BigNumber(offer.amount);
    let total = amount.times(price);

    data.push({
      price: price,
      amount: amount,
      total: total
    });
  }

  return data;
}

export function insertOffer(offer, offers) {
  let index = locationOfOffer(offer, offers);

  if (offers[index].amount.isZero()) {
    offers.splice(index, 1);
  } else {
    offers.splice(index + 1, 0, offer);
  }

  return offers;
}

export function locationOfOffer(offer, offers, start, end) {
  start = start || 0;
  end = end || offers.length;

  var pivot = parseInt(start + (end - start) / 2, 10);

  if (offers[pivot].price.equals(offer.price)) return pivot;

  if (end - start <= 1)
    return offers[pivot].price.greaterThan(offer.price) ? pivot - 1 : pivot;

  if (offers[pivot].price.lessThan(offer.price)) {
    return locationOfOffer(offer, offers, pivot, end);
  } else {
    return locationOfOffer(offer, offers, start, pivot);
  }
}