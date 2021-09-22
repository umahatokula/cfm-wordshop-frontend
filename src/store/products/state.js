export default function () {
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
      max: 3
    }
  }
}
