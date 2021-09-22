<template>
  <div class="q-pa-md" style="width: auto">
    <div class="">
      <div class="row">
        <div class="col-xs-12 col-sm-6 q-mb-lg">
          <q-img
            :src="bundle.large_image_path"
            style="max-width: 650px; height: auto;"
            :ratio="1"
          >
          </q-img>
        </div>
        <div class="col-xs-12 col-sm-6 q-pa-none">
            <div class="q-pa-none q-mb-lg" style="max-width: 100%">
                <q-list bordered separator>

                <q-item clickable v-ripple v-for="(product, index) in bundle.products" :key="index">
                    <q-item-section>
                    <q-item-label>{{ product.name }} <span class="text-caption">({{ product.file_size }}MB)</span></q-item-label>
                    <q-item-label><span class="text-caption  text-weight-light">{{ product.preacher ? product.preacher.name : "" }}</span></q-item-label>
                    <q-item-label caption>{{ datePreached(product) }}</q-item-label>
                    </q-item-section>
                </q-item>

                </q-list>
            </div>
          <q-btn
            color="primary"
            icon="add_shopping_cart"
            label="Add To Cart"
            @click="addBundleToCart(bundle)"
            push
            style="width: 100%"
            class="q-mb-sm"
          />
          <q-btn
            color="secondary"
            icon="content_paste"
            label="Copy Link"
            @click="clipboard(bundle)"
            push
            :rounded="false"
            unelevated
            style="width: 100%"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import { copyToClipboard, date } from 'quasar'
export default {
  name: 'Bundle',
  props: ['slug'],
  data () {
    return {
      bundle: {},
      showDialog: true,
      message: '',
      url: '',
      resolve: null,
      reject: null,
      facebookAppID: '457810507967972'
    }
  },
  computed: {},
  methods: {
    datePreached (product) {
      return date.formatDate(product.date_preached, 'DD MMM YYYY')
    },
    addBundleToCart (product) {
      product.order_qty = 1
      this.$store.dispatch('products/addBundleToCart', product)
      this.$q.notify('Series added to cart')
    },
    show (message, url) {
      this.message = message
      this.url = url
      this.showDialog = true
      return new Promise((resolve, reject) => {
        this.resolve = resolve
        this.reject = reject
      })
    },
    cancel () {
      this.showDialog = false
      this.reject()
    },
    facebook () {
      window.open(
        'https://www.facebook.com/dialog/share?app_id=' +
          this.facebookAppID +
          '&display=popup&href=' +
          this.url +
          '&quote=' +
          this.bundle.name
      )
      this.showDialog = false
      this.resolve()
    },
    linkedin () {
      window.open(
        'https://www.linkedin.com/sharing/share-offsite/?url=' +
          encodeURIComponent(this.url) +
          '&message=' +
          encodeURIComponent(this.bundle.name)
      )
      this.showDialog = false
      this.resolve()
    },
    twitter () {
      window.open(
        'https://twitter.com/intent/tweet?url=' +
          encodeURIComponent(this.url) +
          '&text=' +
          encodeURIComponent(this.product.name)
      )
      this.showDialog = false
      this.resolve()
    },
    clipboard (bundlebundle) {
      copyToClipboard(this.url + bundlebundle.slug)
        .then(() => {
          // success!
          this.$q.notify('Link copied to clipboard')
          // console.log('success ')
        })
        .catch(() => {
          // fail
        })
    },
    getData () {
      axios
        .get(`/api/bundles/details/${this.slug}`)
        .then(response => {
          // console.log(response)
          this.bundle = response.data.data
        })
        .catch(e => {
          // console.log(e)
        })
    }
  },
  created: function () {
    this.url = 'https://wordshop.christfamilyministries.org/#/bundle/'
    this.getData()
  }
}
</script>
