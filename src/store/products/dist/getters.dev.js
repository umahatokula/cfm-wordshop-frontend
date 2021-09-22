"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.categories = categories;
exports.products = products;
exports.bundles = bundles;
exports.tab = tab;
exports.cart = cart;
exports.noOfItemsIncart = noOfItemsIncart;
exports.cartTotal = cartTotal;
exports.isLoggedIn = isLoggedIn;
exports.isLoading = isLoading;
exports.currentUser = currentUser;
exports.authError = authError;

function categories(state) {
  return state.categories;
}

function products(state) {
  return state.products;
}

function bundles(state) {
  return state.bundles;
}

function tab(state) {
  return state.tab;
}

function cart(state) {
  return state.cart;
}

function noOfItemsIncart(state) {
  var noOfProductsInBundle = 0;
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = state.cart.bundles[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var bundle = _step.value;
      noOfProductsInBundle = noOfProductsInBundle + bundle.products.length;
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  var noOfSingles = state.cart.products.reduce(function (itemsNumber, item) {
    return itemsNumber + item.order_qty;
  }, 0);
  var totalNoOfItemsIncart = {
    noOfProductsInBundle: noOfProductsInBundle,
    noOfSingles: noOfSingles
  };
  return totalNoOfItemsIncart;
}

function cartTotal(state) {
  var bundlesTotal = 0;
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = state.cart.bundles[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var bundle = _step2.value;
      bundlesTotal = +bundlesTotal + +bundle.price;
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
        _iterator2["return"]();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  var singlesTotal = state.cart.products.reduce(function (itemsNumber, item) {
    return itemsNumber + item.order_qty * item.unit_price;
  }, 0);
  var cartTotalAmount = {
    bundlesTotal: bundlesTotal,
    singlesTotal: singlesTotal
  };
  return cartTotalAmount;
}

function isLoggedIn(state) {
  return state.isLoggedIn;
}

function isLoading(state) {
  return state.loading;
}

function currentUser(state) {
  return state.currentUser;
}

function authError(state) {
  return state.auth_error;
}