<template>
  <div class="row justify-center">
    <div class="col-12 col-md-8 q-pa-md">
      <q-card class="my-card" flat>
        <q-card-section class="q-pa-none">
          <div style="">
            <q-list separator v-if="noOfItemsIncart > 0">
              <q-item-label header>Cart Items</q-item-label>

              <div v-if="cart.products">
              <q-item v-for="(bundle) in cart.bundles" :key="bundle.id">
                <img :src="bundle.large_image_path" ratio="1" style="width: 80px">
                <q-item-section top avatar>
                  <q-item-section thumbnail>
                  </q-item-section>
                </q-item-section>

                <q-item-section>
                  <q-item-label class="text-subtitle2">{{ bundle.name }}</q-item-label>
                  <q-item-label class="text-caption text-weight-light" caption lines="2">
                    <a href="#" class="text-secondary" @click.prevent="getBundleItems(bundle.products)">{{ bundle.products.length }} title(s) in series</a>
                  </q-item-label>
                  <div class="text-caption text-weight-bold q-mt-md">&#8358; {{ bundle.price }}</div>
                </q-item-section>

                <q-item-section side top class="column justify-center">
                  <q-icon name="delete" color="red" size="xs" @click="removeBundleFromCart(bundle)" class="cursor-pointer" />
                </q-item-section>
              </q-item>

              <q-item v-for="(product) in cart.products" :key="product.id">
                <img :src="product.large_image_path" ratio="1" style="width: 80px">
                <q-item-section top avatar>
                  <q-item-section thumbnail>
                  </q-item-section>
                </q-item-section>

                <q-item-section>
                  <q-item-label class="text-subtitle2">{{ product.name }}</q-item-label>
                  <q-item-label class="text-caption text-weight-light" caption lines="2">{{ product.preacher ? product.preacher.name : '' }}</q-item-label>
                  <div class="text-caption text-weight-bold q-mt-md">&#8358; {{ product.unit_price }}</div>
                </q-item-section>

                <q-item-section side top class="column justify-center">
                  <q-icon name="delete" color="red" size="xs" @click="removeFromCart(product)" class="cursor-pointer" />
                </q-item-section>
              </q-item>
              </div>

              <q-item dense class="q-pa-md">
                <q-item-section side top class="column justify-center">
                  <div class="">
                    <strong>Total:</strong> &#8358; {{ cartTotal }}
                  </div>
                </q-item-section>

                <q-space />

                <q-item-section side top class="column justify-center">
                  <div class="row justify-end">
                    <q-btn flat dense color="red" label="Clear cart" class="q-mr-sm" @click="clearCart" />
                    <q-btn flat dense color="primary" label="Pay" @click="pay = true" />
                  </div>
                </q-item-section>
              </q-item>
            </q-list>
          <div v-else>
            <p>There are no items in your cart. Go do some shopping.</p>
          </div>
          </div>
        </q-card-section>
      </q-card>
    </div>

    <template>
      <div class="q-pa-md q-gutter-sm">

        <q-dialog v-model="pay" style="width: 400px;">
          <q-card style="min-width: 350px">

            <q-card-section v-if="errors.length > 0">
              <q-list v-for="(error, index) in errors" :key="index" dense bordered padding class="rounded-borders">
                <q-item clickable v-ripple>
                  <q-item-section>
                    {{ error }}
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card-section>

            <q-card-section class="q-pt-lg">
              <q-input type="email" dense v-model="customer.email" label="Email" autofocus @keyup.enter="prompt = false" />
            </q-card-section>

            <q-card-actions align="right" class="text-primary">
              <q-btn v-if="token" color="amber-9" unelevated label="Wallet Pay" @click="confirmWalletPay = true" />
              <q-btn color="primary" unelevated label="PIN Pay" @click="payWithETicket = true" />
              <paystack
                  :amount="cartTotal * 100"
                  :email="customer.email"
                  :paystackkey="paystackkey"
                  :reference="reference"
                  :callback="callback"
                  :close="close"
                  class="u-btn cursor-pointer"
                  style="border-radius: 4px; padding: 8px 15px; text-decoration: none; color: white; border: 0; margin: 15px 8px; font-weight: 500;"
                >
                  CARD PAY
              </paystack>
            </q-card-actions>
          </q-card>
        </q-dialog>

        <q-dialog v-model="payWithETicket" persistent transition-show="scale" transition-hide="scale">
          <q-card class="bg-white text-black" style="width: 300px">
            <q-card-section class="row items-center q-pb-none">
              <div class="text-h6">Pay with PIN</div>
              <q-space />
              <q-btn icon="close" flat round dense v-close-popup />
            </q-card-section>

            <q-card-section v-if="errors.length > 0">
              <q-list v-for="(error, index) in errors" :key="index" dense bordered padding class="rounded-borders">
                <q-item clickable v-ripple>
                  <q-item-section>
                    {{ error }}
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card-section>

            <q-card-section>

              <q-card v-if="Object.keys(errors).length > 0" flat bordered class="bg-red-8 text-white my-card q-mb-sm">
                <q-card-section>
                  <ul>
                    <li v-for="(error, index) in errors" :key="index" style="list-style: none;">{{ error[0] }}</li>
                  </ul>
                </q-card-section>
              </q-card>

              <q-badge v-if="trxn.is_filled && !trxn.status" color="red">
                <span>{{ trxn.message }}</span>
              </q-badge>

              <q-badge v-if="trxn.is_filled && trxn.status" color="green">
                <span>{{ trxn.message }}</span>
              </q-badge>
            </q-card-section>

            <q-card-section>
              <q-input v-model="customer.email" label="Email" :dense="false" />
              <q-space />
              <q-input v-model="eTicket.pin" label="PIN" autofocus :dense="false" />
              <div class="q-pt-md q-gutter-sm items-center q-mt-lg">
                <q-btn @click="pinPay" color="primary" label="E-Ticket" />
              </div>
            </q-card-section>

          </q-card>
        </q-dialog>
      </div>
    </template>

    <q-dialog v-model="showBundleItems">
      <q-card style="min-width: 100%">
        <q-card-section>
          <div class="text-subtitle2">Titles in series</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-list v-for="(item, index) in bundleItems" :key="index" bordered separator>
            <q-item>
              <q-item-section>
                <q-item-label>{{ item.name }}</q-item-label>
                <q-item-label caption>{{ item.preacher ? item.preacher.name : '' }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Close" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="confirmWalletPay" persistent  :position="'top'">
      <q-card style="width: 350px">
        <q-card-section class="row items-center">
          <span class="q-ml-sm">Pay {{ cartTotal }} NGN from wallet?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="No" color="red" v-close-popup />
          <q-btn @click="payFromWallet" flat label="Yes, Pay" color="green" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import axios from 'axios'
import { mapGetters, mapActions } from 'vuex'
import paystack from 'vue-paystack'
export default {
  name: 'Cart',
  components: {
    paystack
  },
  data () {
    return {
      pay: false,
      payWithETicket: false,
      customer: {
        full_name: '',
        email: ''
      },
      eTicket: {
        pin: ''
      },
      errors: [],
      trxn: {
        is_filled: false,
        status: null,
        message: ''
      },
      // paystackkey: 'pk_test_b7d6e536a44f6168e78a5f34333c10824c451475',
      paystackkey: 'pk_live_e2c0036b4d47e3b0e8551e74e1e4a0e6a8166ea5',
      showBundleItems: false,
      bundleItems: [],
      confirmWalletPay: false
    }
  },
  computed: {
    ...mapGetters('products', ['cart', 'noOfItemsIncart']),
    cart () {
      return this.$store.state.products.cart
    },
    cartTotal () {
      const cartTotalAmount = this.$store.getters['products/cartTotal']
      return +cartTotalAmount.bundlesTotal + +cartTotalAmount.singlesTotal
    },
    noOfItemsIncart () {
      const totalNoOfItemsIncart = this.$store.getters['products/noOfItemsIncart']
      return totalNoOfItemsIncart.noOfProductsInBundle + totalNoOfItemsIncart.noOfSingles
    },
    reference () {
      let text = ''
      const possible =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
      for (let i = 0; i < 10; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
      }
      return text
    },
    user () {
      return this.$store.state.user.user
    },
    token () {
      return this.$store.state.user.token
    }
  },
  methods: {
    ...mapActions('products', ['clearCart']),
    getBundleItems (products) {
      this.bundleItems = products
      this.showBundleItems = true
    },
    removeBundleFromCart (bundle) {
      this.$store.dispatch('products/removeBundleFromCart', bundle)
      this.$q.notify('Series removed from cart')
    },
    removeFromCart (product) {
      this.$store.dispatch('products/removeFromCart', product)
      this.$q.notify('Item removed from cart')
    },
    moveTosavedItems (product) {
      this.$store.dispatch('products/moveTosavedItems', product)
      this.$store.dispatch('products/removeFromCart', product)
    },
    increaseItemQtyInCart (product) {
      this.$store.dispatch('increaseItemQtyInCart', product)
    },
    decreaseItemQtyInCart (product) {
      this.$store.dispatch('decreaseItemQtyInCart', product)
    },
    makeid (length) {
      var result = ''
      var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
      var charactersLength = characters.length
      for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength))
      }
      return result
    },
    payFromWallet () {
      this.eTicket.email = this.customer.email
      this.eTicket.customer_id = this.user.id ?? null
      this.eTicket.amount = this.cartTotal
      this.eTicket.trxref = this.makeid(10)
      this.eTicket.bundles = this.cart.bundles
      this.eTicket.products = this.cart.products

      axios.post('api/transactions/pay/wallet', this.eTicket)
        .then(response => {
        //   console.log(response.data.transaction)
          this.trxn = response.data
          this.trxn.is_filled = true
          if (response.data.status) {
            this.clearCart()
            this.$q.notify({
              type: 'positive',
              message: response.data.message
            })
            this.$router.push({ path: `downloads/${response.data.transaction}` })
          } else {
            this.$q.notify({
              type: 'negative',
              message: response.data.message
            })
          }
        })
        .catch(e => {
        //   console.log(e)
          if (!e.response) {
          // network error
            this.$q.notify({
              type: 'negative',
              message: 'Error: Network Error'
            })
          } else {
            if (e.response.status === 422) {
              this.errors = e.response.data.errors
            // this.$q.notify('Ensure')
            }
          }
        })
    },
    pinPay () {
      this.eTicket.email = this.customer.email
      this.eTicket.customer_id = this.user.id ?? null
      this.eTicket.amount = this.cartTotal
      this.eTicket.trxref = this.makeid(10)
      this.eTicket.bundles = this.cart.bundles
      this.eTicket.products = this.cart.products

      axios.post('api/transactions/pay/pin', this.eTicket)
        .then(response => {
        //   console.log(response.data.transaction)
          this.trxn = response.data
          this.trxn.is_filled = true
          if (response.data.status) {
            this.clearCart()
            this.$router.push({ path: `downloads/${response.data.transaction}` })
          }
        })
        .catch(e => {
        //   console.log(e)
          if (!e.response) {
          // network error
            this.$q.notify({
              type: 'negative',
              message: 'Error: Network Error'
            })
          } else {
            if (e.response.status === 422) {
              this.errors = e.response.data.errors
            // this.$q.notify('Ensure')
            }
          }
        })
    },
    callback: function (response) {
      this.trxn = response
      this.trxn.is_filled = true
      this.trxn.email = this.customer.email
      this.trxn.customer_id = this.user.id ?? null
      this.trxn.amount = this.cartTotal
      this.trxn.bundles = this.cart.bundles
      this.trxn.products = this.cart.products

      axios.post('api/transactions/pay/online', this.trxn)
        .then(res => {
        //   console.log(res.data)
          this.trxn = res.data
          this.trxn.is_filled = true
          if (res.data.status) {
            this.clearCart()
            this.$router.push({ path: `downloads/${res.data.transaction}` })
          }
        })
        .catch(e => {
        //   console.log(e)
          if (!e.response) {
          // network error
            this.$q.notify({
              type: 'negative',
              message: 'Error: Network Error'
            })
          } else {
            if (e.response.status === 422) {
              this.errors = e.response.data.errors
            }
          }
        })
    },
    close: function () {
      console.log('Payment closed')
    }
  },
  created () {
    this.customer.email = this.user.email
  }
}
</script>

<style lang="sass" scoped>
.u-btn
  border-radius: 4px;
  padding: 15px
  text-decoration: none;
  background-color: $primary
</style>
