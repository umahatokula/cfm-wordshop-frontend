"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCategories = getCategories;
exports.setSearchString = setSearchString;
exports.search = search;
exports.setTab = setTab;
exports.getAllProducts = getAllProducts;
exports.getAllBundles = getAllBundles;
exports.addBundleToCart = addBundleToCart;
exports.addToCart = addToCart;
exports.removeBundleFromCart = removeBundleFromCart;
exports.removeFromCart = removeFromCart;
exports.clearCart = clearCart;
exports.increaseItemQtyInCart = increaseItemQtyInCart;
exports.decreaseItemQtyInCart = decreaseItemQtyInCart;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function getCategories(state, payload) {
  _axios["default"].get('api/categories').then(function (res) {
    state.categories = res.data.data;
  });
}

function setSearchString(state, payload) {
  state.searchString = payload;
}

function search(state, payload) {
  state.products = payload.data.data;
  state.pagination.current = payload.data.current_page;
  state.pagination.max = payload.data.last_page;
}

function setTab(state, payload) {
  state.tab = payload;
}

function getAllProducts(state, payload) {
  state.products = payload.data.data;
  state.pagination.current = payload.data.current_page;
  state.pagination.max = payload.data.last_page;
}

function getAllBundles(state, payload) {
  state.bundles = payload;
}

function addBundleToCart(state, bundle) {
  state.cart.bundles.push(bundle);
}

function addToCart(state, product) {
  console.log(state.cart.products);
  state.cart.products.push(product);
}

function removeBundleFromCart(state, bundle) {
  // get index of bundle to be removed
  var index = state.cart.bundles.findIndex(function (b) {
    return b.id === bundle.id;
  }); // remove bundle from cart

  state.cart.bundles.splice(index, 1);
}

function removeFromCart(state, product) {
  // get index of product to be removed
  var index = state.cart.products.findIndex(function (p) {
    return p.sku === product.sku;
  }); // remove product from cart

  state.cart.products.splice(index, 1);

  _axios["default"].put("products/".concat(product.id, "/update/quantity/increase")).then(function (res) {// console.log(res)
  })["catch"](function (e) {
    console.log(e);
  });
}

function clearCart(state, payload) {
  state.cart.bundles = [];
  state.cart.products = [];
}

function increaseItemQtyInCart(state, product) {
  // find the product
  var found = state.cart.products.find(function (p) {
    return p.id === product.id;
  }); // increase item in cart by 1

  if (found.order_qty !== undefined) {
    found.order_qty++;
  }
}

function decreaseItemQtyInCart(state, product) {
  // find the product
  var found = state.cart.products.find(function (p) {
    return p.sku === product.sku;
  }); // decrease item in cart by 1

  if (found.order_qty !== undefined) {
    found.order_qty--;
  }
}