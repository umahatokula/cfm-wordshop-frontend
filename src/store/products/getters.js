export function categories (state) {
  return state.categories
}

export function products (state) {
  return state.products
}

export function bundles (state) {
  return state.bundles
}

export function tab (state) {
  return state.tab
}

export function cart (state) {
  return state.cart
}

export function noOfItemsIncart (state) {
  let noOfProductsInBundle = 0
  if (state.cart.bundles !== undefined) {
    for (const bundle of state.cart.bundles) {
      noOfProductsInBundle = noOfProductsInBundle + bundle.products.length
    }
  }

  let noOfSingles = 0
  if (state.cart.products !== undefined) {
    noOfSingles = state.cart.products.reduce((itemsNumber, item) => {
      return itemsNumber + item.order_qty
    }, 0)
  }

  const totalNoOfItemsIncart = { noOfProductsInBundle, noOfSingles }

  return totalNoOfItemsIncart
}

export function cartTotal (state) {
  let bundlesTotal = 0
  for (const bundle of state.cart.bundles) {
    bundlesTotal = +bundlesTotal + +bundle.price
  }
  const singlesTotal = state.cart.products.reduce((itemsNumber, item) => {
    return itemsNumber + (item.order_qty * item.unit_price)
  }, 0)

  const cartTotalAmount = { bundlesTotal, singlesTotal }
  return cartTotalAmount
}

export function isLoggedIn (state) {
  return state.isLoggedIn
}

export function isLoading (state) {
  return state.loading
}

export function currentUser (state) {
  return state.currentUser
}

export function authError (state) {
  return state.auth_error
}
