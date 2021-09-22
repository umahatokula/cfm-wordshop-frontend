<template>
  <div>
    <q-pull-to-refresh @refresh="refresh">
      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="series">
          <div class="row justify-start q-col-gutter-md">
            <div
              v-for="(bundle, index) in bundles"
              :key="index"
              class="col-xs-12 col-sm-6 col-md-3 q-mb-xs"
            >
              <q-card class="gt-md" flat bordered square>
                <q-card-section horizontal>
                  <q-img
                    class="col cursor-pointer"
                    :src="bundle.large_image_path"
                    @click="bundleDetail(bundle)"
                  />

                  <q-card-actions vertical class="justify-around">
                    <q-btn
                      @click="getBundleItems(bundle.products)"
                      flat
                      round
                      color="secondary"
                      icon="visibility"
                    />
                    <q-btn
                      @click="addBundleToCart(bundle)"
                      flat
                      round
                      color="secondary"
                      icon="shopping_cart"
                    />
                    <q-btn
                      flat
                      round
                      color="secondary"
                      icon="share"
                      @click="bundleClipboard(bundle)"
                    />
                  </q-card-actions>
                </q-card-section>
                <q-separator />
                <q-card-section class="q-pl-md q-pb-md q-pa-xs">
                  <div
                    class="text-subtitle2 q-mt-sm cursor-pointer"
                    @click="bundleDetail(bundle)"
                  >
                    {{ bundle.name }}
                  </div>
                  <div class="text-caption q-mt-none">
                    {{ bundle.price }} NGN
                  </div>
                </q-card-section>
              </q-card>
              <q-card class="lt-lg">
                <q-card-section horizontal>
                  <q-img
                    class="col-5 cursor-pointer"
                    :src="bundle.large_image_path"
                    @click="bundleDetail(bundle)"
                  />

                  <q-card-section>
                    <div
                      class="text-subtitle1 q-mt-sm cursor-pointer"
                      @click="bundleDetail(bundle)"
                    >
                      {{ bundle.name }}
                    </div>
                    <div class="text-caption q-mt-none">
                      {{ bundle.price }} NGN
                    </div>
                  </q-card-section>
                </q-card-section>

                <q-separator />

                <q-card-actions class="justify-around q-pa-none">
                  <q-btn flat>
                    <q-btn
                      @click="getBundleItems(bundle.products)"
                      flat
                      round
                      color="secondary"
                      icon="visibility"
                    />
                  </q-btn>
                  <q-btn flat>
                    <q-btn
                      @click="addBundleToCart(bundle)"
                      flat
                      round
                      color="secondary"
                      icon="shopping_cart"
                    />
                  </q-btn>
                  <q-btn flat color="primary">
                    <q-btn
                      flat
                      round
                      color="secondary"
                      icon="share"
                      @click="bundleClipboard(bundle)"
                    />
                  </q-btn>
                </q-card-actions>
              </q-card>
            </div>
          </div>
        </q-tab-panel>

        <q-tab-panel name="single">
          <div class="row justify-start q-col-gutter-md">
            <div
              v-for="(product, index) in products"
              :key="index"
              class="col-xs-12 col-sm-6 col-md-3 q-mb-xs"
            >
              <q-card class="gt-md">
                <q-img
                  :src="product.large_image_path"
                  class="cursor-pointer"
                  @click="productDetail(product)"
                />

                <q-card-section>
                  <div
                    class="text-subtitle1 cursor-pointer"
                    @click="productDetail(product)"
                  >
                    {{ product.name }}
                  </div>
                  <div class="text-subtitle2">
                    {{ datePreached(product.date_preached) }}
                  </div>
                </q-card-section>

                <q-card-section
                  v-if="product.unit_price == 0"
                  class="q-pt-none"
                >
                  Free
                </q-card-section>
                <q-card-section v-else class="q-pt-none">
                  {{ product.unit_price }} NGN
                </q-card-section>
                <q-card-section>
                  <div class="col-6 text-right text-caption text-weight-light">
                    <q-btn
                      color="primary"
                      label="Add To Cart"
                      @click="addToCart(product)"
                      push
                      style="width: 100%"
                      icon="add_shopping_cart"
                      v-if="product.unit_price > 0"
                    />
                    <q-btn
                      color="accent"
                      label="Download"
                      @click="downloadFile(product)"
                      push
                      style="width: 100%"
                      icon="file_download"
                      v-if="product.unit_price == 0"
                    />
                  </div>
                </q-card-section>
              </q-card>
              <q-card class="lt-lg" bordered>
                <div class="row">
                  <div class="col-4">
                    <q-img
                      :src="product.large_image_path"
                      style="width: 100%; height: auto;"
                      :ratio="1"
                      @click="productDetail(product)"
                      class="cursor-pointer"
                    >
                    </q-img>
                  </div>
                  <div class="col-8 q-pa-sm">
                    <div class="column justify-evenly">
                      <div class="col-12">
                        <div
                          class="text-subtitle2 cursor-pointer"
                          style="line-height: 1rem;"
                          @click="productDetail(product)"
                        >
                          {{ product.name }}
                        </div>
                        <div class="text-caption text-weight-light q-mt-sm">
                          {{ product.preacher ? product.preacher.name : "" }}
                        </div>
                        <div class="text-caption text-weight-thin q-mt-sm">
                          {{ datePreached(product.date_preached) }}
                        </div>
                        <div class="q-mt-xs"></div>
                      </div>
                    </div>
                  </div>
                  <div
                    class="col-12 q-pa-sm purple-3"
                    style="border-top: 1px solid #5e5d60"
                  >
                    <div class="row justify-evenly">
                      <div
                        class="col-6 text-left text-caption text-weight-light"
                        v-if="product.unit_price == 0"
                      >
                        Free
                      </div>
                      <div
                        class="col-6 text-left text-caption text-weight-light"
                        v-else
                      >
                        {{ product.unit_price }} NGN
                      </div>
                      <div
                        class="col-6 text-right text-caption text-weight-light"
                      >
                        <a
                          class="u-link text-accent text-weight-bold cursor-pointer"
                          v-if="product.unit_price == 0"
                          @click="downloadFile(product)"
                        >
                          Download
                        </a>
                        <a
                          class="u-link text-primary text-weight-bold cursor-pointer"
                          v-else
                          @click="addToCart(product)"
                        >
                          Add To Cart
                        </a>
                        |
                        <a
                          class="u-link text-secondary text-weight-bold cursor-pointer"
                          @click="productDetail(product)"
                        >
                          Details
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </q-card>
            </div>
          </div>
          <div class="q-pa-lg flex flex-center">
            <q-pagination
              v-model="pagination_current"
              :max="pagination_max"
              :max-pages="1"
              color="primary"
              @click="set"
              :direction-links="true"
              :boundary-links="true"
              icon-first="skip_previous"
              icon-last="skip_next"
              icon-prev="fast_rewind"
              icon-next="fast_forward"
            >
            </q-pagination>
          </div>
        </q-tab-panel>
      </q-tab-panels>
      <template v-slot:loading>
        <div class="row justify-center q-my-md">
          <q-spinner-dots color="primary" size="40px" />
        </div>
      </template>
    </q-pull-to-refresh>

    <q-dialog v-model="showBundleItems">
      <q-card style="width: 100%;">
        <q-card-section>
          <div class="text-subtitle2">Titles in series</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-list bordered separator>
            <q-item v-for="(item, index) in bundleItems" :key="index">
              <q-item-section>
                <q-item-label>{{ item.name }}</q-item-label>
                <q-item-label caption>{{
                  item.preacher ? item.preacher.name : ""
                }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Close" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
// import axios from 'axios'
import { copyToClipboard, date } from 'quasar'
export default {
  name: 'PageIndex',
  data () {
    return {
      slide: 1,
      autoplay: false,
      showBundleItems: false,
      bundleItems: [],
      message: '',
      url: ''
    }
  },
  computed: {
    bundles () {
      const searchString = this.$store.state.products.searchString

      if (searchString === '' || searchString === 'undefined') {
        return this.$store.state.products.bundles
      }
      return this.$store.state.products.bundles
    },
    products () {
      const searchString = this.$store.state.products.searchString

      if (searchString === '' || searchString === 'undefined') {
        return this.$store.state.products.products
      }
      return this.$store.state.products.products
    },
    tab: {
      // getter
      get: function () {
        return this.$store.state.products.tab
      },
      set: function (tab) {
        this.$store.commit('products/setTab', tab)
      }
    },
    pagination_current: {
      // getter
      get: function () {
        return this.$store.state.products.pagination.current
      },
      set: function (currentpage) {
        this.$store.commit('products/setPagination', currentpage)
      }
    },
    pagination_max () {
      return this.$store.state.products.pagination.max
    }
  },
  methods: {
    getBundleItems (products) {
      this.bundleItems = products
      this.showBundleItems = true
    },
    datePreached (messageDate) {
      return date.formatDate(messageDate, 'DD MMM YYYY')
    },
    addBundleToCart (product) {
      product.order_qty = 1
      this.$store.dispatch('products/addBundleToCart', product)
      this.$q.notify('Series added to cart')
    },
    addToCart (product) {
      product.order_qty = 1
      this.$store.dispatch('products/addToCart', product)
      this.$q.notify('Item added to cart')
    },
    productDetail: function (product) {
      const path = `/product/${product.slug}`
      if (this.$route.path !== path) this.$router.push(path)
    },
    refresh (done) {
      this.$store.dispatch('products/getAllBundles')
      this.$store.dispatch('products/getAllProducts')
      done()
    },
    getProducts () {
      this.$store.dispatch('products/getAllProducts', this.pagination_current)
    },
    set () {
      this.getProducts()
    },
    bundleClipboard (bundle) {
      copyToClipboard(this.url + bundle.slug)
        .then(() => {
          // success!
          this.$q.notify('Link copied to clipboard')
          // console.log('success ')
        })
        .catch(() => {
          // fail
        })
    },
    bundleDetail: function (bundle) {
      const path = `/bundle/${bundle.slug}`
      if (this.$route.path !== path) this.$router.push(path)
    },
    downloadFile (product) {
      window.open(product.free_download_link, '_blank')
    }
  },
  created () {
    this.url = 'https://wordshop.christfamilyministries.org/#/bundle/'
    this.getProducts()
  }
}
</script>

<style lang="sass" scoped>
.my-card
  max-width: 100%

.u-link
  text-decoration: none
</style>
