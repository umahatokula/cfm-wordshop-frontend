import Vue from 'vue'
import axios from 'axios'

// Vue.prototype.$axios.defaults.headers.common.Authorization = $store.state.user.token
Vue.prototype.$axios = axios

// Vue.prototype.$axios.defaults.baseURL = 'http://localhost/cfm-wordshop-v2/public/'
Vue.prototype.$axios.defaults.baseURL = 'http://127.0.0.1:8000/'
// Vue.prototype.$axios.defaults.baseURL = 'https://shop-resource-server.christfamilyministries.org/public/'
