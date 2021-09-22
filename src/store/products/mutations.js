import axios from 'axios'

export function getCategories (state, payload) {
  axios.get('api/categories')
    .then(res => {
      state.categories = res.data.data
    })
}

export function setSearchString (state, payload) {
  state.searchString = payload
}

export function searchBundles (state, payload) {
  state.bundles = payload.data.data
  state.pagination.current = payload.data.current_page
  state.pagination.max = payload.data.last_page
}

export function searchProducts (state, payload) {
  state.products = payload.data.data
  state.pagination.current = payload.data.current_page
  state.pagination.max = payload.data.last_page
}

export function setTab (state, payload) {
  state.tab = payload
}

export function setPagination (state, payload) {
  state.pagination.current = payload
}

export function getAllProducts (state, payload) {
  state.products = payload.data.data
  state.pagination.current = payload.data.current_page
  state.pagination.max = payload.data.last_page
}

export function getAllBundles (state, payload) {
  state.bundles = payload
}

export function addBundleToCart (state, bundle) {
  state.cart.bundles.push(bundle)
}

export function addToCart (state, product) {
  console.log(state.cart.products)
  state.cart.products.push(product)
}

export function removeBundleFromCart (state, bundle) {
  // get index of bundle to be removed
  const index = state.cart.bundles.findIndex(b => {
    return b.id === bundle.id
  })

  // remove bundle from cart
  state.cart.bundles.splice(index, 1)
}

export function removeFromCart (state, product) {
  // get index of product to be removed
  const index = state.cart.products.findIndex(p => {
    return p.sku === product.sku
  })

  // remove product from cart
  state.cart.products.splice(index, 1)

  axios.put(`products/${product.id}/update/quantity/increase`)
    .then(res => {
      // console.log(res)
    })
    .catch(e => {
      console.log(e)
    })
}

export function clearCart (state, payload) {
  state.cart.bundles = []
  state.cart.products = []
}

export function increaseItemQtyInCart (state, product) {
  // find the product
  const found = state.cart.products.find(p => {
    return p.id === product.id
  })

  // increase item in cart by 1
  if (found.order_qty !== undefined) {
    found.order_qty++
  }
}

export function decreaseItemQtyInCart (state, product) {
  // find the product
  const found = state.cart.products.find(p => {
    return p.sku === product.sku
  })

  // decrease item in cart by 1
  if (found.order_qty !== undefined) {
    found.order_qty--
  }
}
