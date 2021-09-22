<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script>
export default {
  name: 'App',
  preFetch ({ store }) {
    // initialize products in store here
    store.dispatch('products/getAllBundles')
    store.dispatch('products/getAllProducts')
  }
}
</script>
