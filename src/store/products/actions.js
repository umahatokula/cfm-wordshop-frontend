import axios from 'axios'
import { Loading } from 'quasar'

export function getCategories (context) {
  context.commit('getCategories')
}

export function setSearchString (context, searchString) {
  context.commit('setSearchString', searchString)
  //   axios.get(`/api/bundles/search/${searchString}`)
  //     .then(response => {
  //       const bundles = response
  //       context.commit('searchBundles', bundles)
  //     })
  axios.get(`/api/products/search/${searchString}`)
    .then(response => {
      const products = response
      context.commit('searchProducts', products)
    })
}

export function setTab (context, tab) {
  context.commit('setTab', tab)
}

export function getAllProducts ({ commit }, currentPage) {
  Loading.show()
  axios.get('/api/products?page=' + currentPage)
    .then(response => {
      const products = response
      commit('getAllProducts', products)
      Loading.hide()
    })
    .catch(e => {
      console.log(e)
      Loading.hide()
    })
}

export function getAllBundles ({ commit }) {
  axios.get('api/bundles')
    .then(res => {
      const bundles = res.data.data
      commit('getAllBundles', bundles)
    })
}

export function addBundleToCart (context, bundle) {
  const existingBundle = context.state.cart.bundles.find(
    b => b.id === bundle.id
  )

  if (!existingBundle || existingBundle === 'undefined') {
    context.commit('addBundleToCart', bundle)
  }
}

export function addToCart (context, product) {
  const existingProduct = context.state.cart.products.find(
    p => p.id === product.id
  )

  if (!existingProduct || existingProduct === 'undefined') {
    context.commit('addToCart', product)
  }

  axios
    .put(`api/products/${product.id}/update/quantity/decrease`)
    .then(res => {
      context.dispatch('getAllProducts')
    })
    .catch(e => {
      console.log(e)
    })
}
export function removeBundleFromCart (context, bundle) {
  context.commit('removeBundleFromCart', bundle)
}

export function removeFromCart (context, product) {
  context.commit('removeFromCart', product)
}

export function clearCart (context) {
  context.commit('clearCart')
}

export function increaseItemQtyInCart (context, product) {
  context.commit('increaseItemQtyInCart', product)
}

export function decreaseItemQtyInCart (context, product) {
  context.commit('decreaseItemQtyInCart', product)
}

export function setIntendedRoute (context, route) {
  context.commit('setIntendedRoute', route)
}
