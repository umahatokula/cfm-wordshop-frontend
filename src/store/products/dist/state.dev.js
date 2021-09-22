"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

function _default() {
  return {
    products: [],
    bundles: [],
    categories: [],
    cart: {
      bundles: [],
      products: []
    },
    tab: 'series',
    searchString: '',
    pagination: {
      current: 1,
      max: 1
    }
  };
}