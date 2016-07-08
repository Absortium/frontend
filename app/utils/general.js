/**
 * Created by andrey on 08/06/16.
 */


import {
  ERROR_RATE_LT_MIN,
  ERROR_RATE_GT_MAX,
  ERROR_GT_BALANCE,
  ERROR_TOTAL_LT_MIN,
  TOTAL_MIN,
  RATE_MIN,
  RATE_MAX,
  ERROR_NOT_TOUCHED
} from "containers/ExchangeBox/constants";
import {
  ERROR_WITHDRAWAL_AMOUNT_GT_BALANCE,
  ERROR_WITHDRAWAL_AMOUNT_LT_MIN,
  WITHDRAWAL_AMOUNT_MIN
} from "containers/WithdrawalDialog/constants";
import {
  ERROR_FIELD_IS_REQUIRED,
  ERROR_FIELD_NOT_VALID,
  ERROR_FIELD_LT_ZERO
} from "containers/App/constants";
import Q from "q";
import BigNumber from "bignumber.js";

const visible = 8;

export function isEmpty(value) {
  return value == null || value === ""
}

export function isArrayEmpty(array) {
  return array.length == 0;
}

export function isDirty(value) {
  return value != null
}

export function normalize(value) {
  if (typeof value == "string") value = parseFloat(value);
  return value.toFixed(visible);
}

export function isValid(value) {
  try {
    new BigNumber(value);
    return true
  } catch (err) {
    return false
  }
}

export function errExist(error) {
  return error != null
}
export function num2str(value) {
  return value + ''
}

export function cut(value) {
  // cut all numbers after 8th.
  value = value.toFixed(visible);

  // make from this string and cut the zeros
  value = parseFloat(value);

  return value.toString();
}

export function getErrorText(error) {
  switch (error) {
    case ERROR_FIELD_NOT_VALID:
      return "This field is not valid";

    case ERROR_FIELD_IS_REQUIRED:
      return "This field is required";

    case ERROR_RATE_LT_MIN:
      return "Rate is lower than " + RATE_MIN;

    case ERROR_RATE_GT_MAX:
      return "Rate is greater than " + RATE_MAX;

    case ERROR_GT_BALANCE:
      return "Not enough money";

    case ERROR_TOTAL_LT_MIN:
      return "Total amount lower than " + TOTAL_MIN;

    case ERROR_FIELD_LT_ZERO:
      return "Field is negative";

    case ERROR_WITHDRAWAL_AMOUNT_GT_BALANCE:
      return "Not enough money";

    case ERROR_WITHDRAWAL_AMOUNT_LT_MIN:
      return "Withdrawal amount lower than " + WITHDRAWAL_AMOUNT_MIN;

    case ERROR_NOT_TOUCHED:
      return null;

    default:
      return null
  }
}

export function convertCurrencyName(short) {
  switch (short) {
    case 'btc':
      return 'bitcoin';
    case 'eth':
      return 'ethereum';
  }

}

export function setIntervalGenerator(g, ...args) {
  let fn = function () {
    let c = g();

    let r = c.next();
    while (!r.done) {
      console.log(r);
      r = c.next();
    }
  };

  return setInterval(fn, ...args);
}

export function setTimeoutGenerator(g, ...args) {
  let fn = function () {
    let c = g();

    let r = c.next();
    while (!r.done) {
      r = c.next();
    }
  };

  return setTimeout(fn, ...args);
}

export function sleep(millis) {
  var deferredResult = Q.defer();
  setTimeout(function () {
    deferredResult.resolve();
  }, millis);
  return deferredResult.promise;
}

export function include(arr, obj) {
  return (arr.indexOf(obj) != -1);
}

export function extractCurrencies(s) {
  let r = /\/exchange\/(btc|eth)-(eth|btc)/g;
  return r.exec(s);
}

export function representation(value) {
  if (isValid(value)) {
    value = cut(new BigNumber(value))
  }
  return value
}

export function genParam(value, error) {
  if (typeof value == "number" || typeof value == "object") value = value.toString();

  return {
    value: value,
    error: error
  }
}

export function copy(obj) {
  return JSON.parse(JSON.stringify(obj))
}

export function pprint(obj) {
  console.log(JSON.stringify(copy(obj), null, 2));
}

export function updateState(state, substate) {
  return Object.assign({}, state, substate);
}

export function needConvert(currency) {
  return currency == "btc"
}

export function isGeneralPair(from_currency, to_currency) {
  let pair = from_currency.toLowerCase() + "_" + to_currency.toLowerCase();

  if (include(["eth_btc"], pair)) {
    // Order ETH->BTC
    // In this case we want to sell the ethereum and buy bitcoin
    return false

  } else if (include(["btc_eth"], pair)) {
    // Order BTC->ETH
    // In this case we want to buy the ethereum and sell the bitcoin
    return true
  }
}

export function reverseOrderType(order_type) {
  return order_type == "buy" ? "sell" : "buy"
}

export function getPrimaryCurrency(pair) {
  return pair.split("_")[0]
}

export function getSecondaryCurrency(pair) {
  return pair.split("_")[1]
}

export function getPair(from_currency, to_currency) {
  if (isGeneralPair(from_currency, to_currency)) {
    return from_currency + "_" + to_currency
  } else {
    return to_currency + "_" + from_currency
  }
}

export function getType(from_currency, to_currency) {
  if (isGeneralPair(from_currency, to_currency)) {
    return "buy"
  } else {
    return "sell"
  }
}
