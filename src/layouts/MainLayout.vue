<template>
  <q-layout view="hHh lpR fFf" class="bg-grey-1">
    <q-header elevated class="bg-white text-primary q-py-xs" height-hint="58">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
          icon="menu"
        />

        <div class="q-pt-lg q-px-md q-py-md">
          <img class="absolute-center" width="150" alt="Wordshop logo" src="logo.png">
        </div>

        <q-space />

        <q-space />

        <div class="q-gutter-sm row items-center no-wrap">
          <q-btn @click="showSearch = !showSearch" flat round dense icon="search" exact active clickable v-ripple />
          <q-btn flat round dense icon="shopping_cart" to="/cart" exact active clickable v-ripple>
            <q-badge floating color="red">{{ noOfItemsIncart }}</q-badge>
            <q-tooltip>Shopping Cart</q-tooltip>
          </q-btn>
<!--           <q-btn round flat icon="more_vert">
            <q-menu auto-close :offset="[110, 0]">
              <q-list style="min-width: 150px">
                <q-item @click="logout" clickable>
                  <q-item-section>Logout</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn> -->
        </div>
      </q-toolbar>
      <div v-show="showSearch || searchString" class="q-pa-sm">
        <transition
          appear
          enter-active-class="animated fadeIn"
          leave-active-class="animated fadeOut"
        >
          <q-input v-on:keyup.enter="search" autofocus dense outlined v-model="searchString" placeholder="Search" class="bg-white col" type="search" />
        </transition>
      </div>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" side="left" overlay behavior="mobile" elevated :width="240">
      <q-scroll-area class="fit">
        <q-list padding class="menu-list">
          <q-item to="/" exact clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="home" />
            </q-item-section>

            <q-item-section>
              Home
            </q-item-section>
          </q-item>

          <q-item to="/cart" exact active clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="shopping_cart" />
            </q-item-section>

            <q-item-section>
              My Cart
            </q-item-section>
          </q-item>

          <q-item to="/pre-order" exact active clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="shopping_cart" />
            </q-item-section>

            <q-item-section>
              Pre-order
            </q-item-section>
          </q-item>

          <q-item v-if="token" to="/orders" exact active clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="shopping_cart" />
            </q-item-section>

            <q-item-section>
              Orders
            </q-item-section>
          </q-item>

          <q-item v-if="token" to="/wallet" exact active clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="shopping_cart" />
            </q-item-section>

            <q-item-section>
              Wallet
            </q-item-section>
          </q-item>

          <q-item v-if="!token" to="/login" exact active clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="shopping_cart" />
            </q-item-section>

            <q-item-section>
              Login
            </q-item-section>
          </q-item>

          <q-item v-if="token" @click="logout" exact active clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="shopping_cart" />
            </q-item-section>

            <q-item-section>
              Logout
            </q-item-section>
          </q-item>

        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container class="q-pb-xl">
      <router-view />
      <!-- place QPageScroller at end of page -->
      <q-page-scroller position="bottom-right" :scroll-offset="150" :offset="[18, 58]">
        <q-btn fab icon="keyboard_arrow_up" color="primary" />
      </q-page-scroller>
    </q-page-container>
    <q-tabs
      v-model="tab"
      class="text-white fixed-bottom bg-primary"
      active-color="white"
      indicator-color="secondary"
      align="justify"
      narrow-indicator
    >
      <q-tab @click="setTab('series')" name="series" label="Series" />
      <q-tab @click="setTab('single')" name="single" label="Single" />
    </q-tabs>

    <q-separator />

  </q-layout>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
export default {
  name: 'MainLayout',
  data () {
    return {
      leftDrawerOpen: false,
      tab: 'series',
      showSearch: false
    }
  },
  computed: {
    user () {
      return this.$store.getters['user/user']
    },
    token () {
      return this.$store.getters['user/token']
    },
    cart () {
      return this.$store.state.products.cart
    },
    noOfItemsIncart () {
      const totalNoOfItemsIncart = this.$store.getters['products/noOfItemsIncart']
      return totalNoOfItemsIncart.noOfProductsInBundle + totalNoOfItemsIncart.noOfSingles
    },
    searchString: {
      // getter
      get: function () {
        return this.$store.state.products.searchString
      },
      set: function (searchString) {
        this.$store.dispatch('products/setSearchString', searchString)
      }
    }
  },
  methods: {
    search () {
      console.log('search hit')
      const searchString = this.$store.state.products.searchString
      this.$store.dispatch('products/search', searchString)
    },
    setTab (tabName) {
      this.$router.push('/')
      this.$store.commit('products/setTab', tabName)
    },
    logout () {
      axios.post('/api/logout')
        .then(
          json => {
            // console.log(json)
            this.$store.dispatch('user/unSetUser')
            this.$store.dispatch('user/unSetAccessToken')
            this.$router.push({ path: '/' })
            this.$q.notify({
              type: 'positive',
              message: json.data.message
            })
          })
        .catch(
          err => {
            console.log(err)
            this.$q.notify({
              type: 'negative',
              message: this.errorMessage
            })
          })
    }
  },
  created () {
    Vue.prototype.$axios.defaults.headers.common.Authorization = `Bearer ${this.$store.getters['user/token']}`
  }
}
</script>
<style lang="sass">
.YL
  &__toolbar-input-container
    min-width: 100px
    width: 55%
  &__toolbar-input-btn
    border-radius: 0
    border-style: solid
    border-width: 1px 1px 1px 0
    border-color: rgba(0,0,0,.24)
    max-width: 60px
    width: 100%
  &__drawer-footer-link
    color: inherit
    text-decoration: none
    font-weight: 500
    font-size: .75rem
    &:hover
      color: #000
</style>
