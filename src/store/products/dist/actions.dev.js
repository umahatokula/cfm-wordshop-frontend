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
exports.setIntendedRoute = setIntendedRoute;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function getCategories(context) {
  context.commit('getCategories');
}

function setSearchString(context, searchString) {
  context.commit('setSearchString', searchString);
}

function search(_ref, searchString) {
  var commit = _ref.commit;

  _axios["default"].get("/api/products/search/".concat(searchString)).then(function (response) {
    var products = response;
    commit('search', products);
  });
}

function setTab(context, tab) {
  context.commit('setTab', tab);
}

function getAllProducts(_ref2, currentPage) {
  var commit = _ref2.commit;

  _axios["default"].get('/api/products?page=' + currentPage).then(function (response) {
    var products = response;
    commit('getAllProducts', products);
  });
}

function getAllBundles(_ref3) {
  var commit = _ref3.commit;

  _axios["default"].get('api/bundles').then(function (res) {
    var bundles = res.data;
    commit('getAllBundles', bundles);
  });
}

function addBundleToCart(context, bundle) {
  var existingBundle = context.state.cart.bundles.find(function (b) {
    return b.id === bundle.id;
  });

  if (!existingBundle || existingBundle === 'undefined') {
    context.commit('addBundleToCart', bundle);
  }
}

function addToCart(context, product) {
  var existingProduct = context.state.cart.products.find(function (p) {
    return p.id === product.id;
  });

  if (!existingProduct || existingProduct === 'undefined') {
    context.commit('addToCart', product);
  }

  _axios["default"].put("api/products/".concat(product.id, "/update/quantity/decrease")).then(function (res) {
    context.dispatch('getAllProducts');
  })["catch"](function (e) {
    console.log(e);
  });
}

function removeBundleFromCart(context, bundle) {
  context.commit('removeBundleFromCart', bundle);
}

function removeFromCart(context, product) {
  context.commit('removeFromCart', product);
}

function clearCart(context) {
  context.commit('clearCart');
}

function increaseItemQtyInCart(context, product) {
  context.commit('increaseItemQtyInCart', product);
}

function decreaseItemQtyInCart(context, product) {
  context.commit('decreaseItemQtyInCart', product);
}

function setIntendedRoute(context, route) {
  context.commit('setIntendedRoute', route);
}