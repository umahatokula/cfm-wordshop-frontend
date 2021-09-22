"use strict";

var _vue = _interopRequireDefault(require("vue"));

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_vue["default"].prototype.$axios = _axios["default"]; // Vue.prototype.$axios.defaults.baseURL = 'http://localhost/cfm-shop/public/'
// Vue.prototype.$axios.defaults.baseURL = 'http://127.0.0.1:8000/'

_vue["default"].prototype.$axios.defaults.baseURL = 'https://shop-resource-server.christfamilyministries.org/public/';