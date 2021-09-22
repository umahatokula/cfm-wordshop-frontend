<template>
  <div class="q-pa-md" style="width: auto" clickable>
    <div class="">
      <div class="row">
        <div class="col-xs-12 col-sm-6">
          <q-img
            :src="product.large_image_path"
            style="max-width: 650px; height: auto;"
            :ratio="1"
          >
          </q-img>
        </div>
        <div class="col-xs-12 col-sm-6">
          <div class="row">
            <div class="col-12 q-mb-xs">
              <strong><span class="text-h6">{{ product.name }}</span></strong> <span class="text-caption">({{ product.file_size }}MB)</span>
            </div>
            <div class="col-12 text-h6 q-mb-md text-caption text-weight-light q-mb-sm">
              {{ product.preacher ? product.preacher.name : "" }}
            </div>
            <div v-if="product.description" class="col-12 text-body1 q-mb-md">
              {{ product.description }}
            </div>
            <div class="col-12 text-weight-light q-mb-md">
              {{ datePreached }}
            </div>
            <div v-if="product.unit_price == 0" class="col-12 text-subtitle1 q-mb-lg">
              Free
            </div>
            <div v-if="product.unit_price > 0" class="col-12 text-subtitle1 q-mb-lg">
              {{ product.unit_price }} NGN
            </div>
          </div>
          <q-btn
            color="accent"
            icon="file_download"
            label="Download"
            @click="downloadFile(product)"
            push
            style="width: 100%"
            class="q-mb-sm"
            v-if="product.unit_price == 0"
          />
          <q-btn
            color="primary"
            icon="add_shopping_cart"
            label="Add To Cart"
            @click="addToCart(product)"
            push
            style="width: 100%"
            class="q-mb-sm"
            v-if="product.unit_price > 0"
          />
          <q-btn
            color="secondary"
            icon="content_paste"
            label="Copy Link"
            @click="clipboard(product)"
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
  name: 'Product',
  props: ['slug'],
  data () {
    return {
      product: {},
      showDialog: true,
      message: '',
      url: '',
      resolve: null,
      reject: null,
      facebookAppID: '457810507967972'
    }
  },
  computed: {
    datePreached () {
      return date.formatDate(this.product.date_preached, 'DD MMM YYYY')
    }
  },
  methods: {
    addToCart (product) {
      product.order_qty = 1
      this.$store.dispatch('products/addToCart', product)
      this.$q.notify('Item(s) added to cart')
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
          this.product.name
      )
      this.showDialog = false
      this.resolve()
    },
    linkedin () {
      window.open(
        'https://www.linkedin.com/sharing/share-offsite/?url=' +
          encodeURIComponent(this.url) +
          '&message=' +
          encodeURIComponent(this.product.name)
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
    clipboard (product) {
      copyToClipboard(this.url + product.slug)
        .then(() => {
          // success!
          this.$q.notify('Link copied to clipboard')
          // console.log('success ')
        })
        .catch(() => {
          // fail
        })
    },
    downloadFile (product) {
      window.open(product.free_download_link, '_blank')
    },
    getData () {
      axios
        .get(`/api/products/details/${this.slug}`)
        .then(response => {
          // console.log(response)
          this.product = response.data.data
        })
        .catch(e => {
          // console.log(e)
        })
    }
  },
  created: function () {
    this.url = 'https://wordshop.christfamilyministries.org/#/product/'
    this.getData()
  }
}
</script>
