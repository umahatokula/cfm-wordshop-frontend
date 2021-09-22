<template>
  <div>
    <div class="q-pa-md">
      <h5 class="text-h6 text-weight-medium">My Orders</h5>
      <q-list bordered separator v-for="order in orders" :key="order.id" class="q-my-md">
        <q-item>
          <q-item-section top>
            <q-item-label lines="1">
              <span class="text-weight-medium">{{ order.order_number }}</span>
            </q-item-label>
            <q-item-label caption lines="1">
              <span class="text-weight-bold"> &#8358; {{ order.amount }}</span>
              <p>On {{ orderDate(order) }}</p>
            </q-item-label>
          </q-item-section>

          <q-item-section top side>
            <div class="text-grey-8 q-gutter-xs">
              <q-btn class="gt-xs" size="12px" flat dense round icon="delete" />
              <q-btn class="gt-xs" size="12px" flat dense round icon="done" />
              <q-btn size="12px" flat dense round icon="more_vert">
                <q-menu auto-close :offset="[110, 0]">
                  <q-list style="min-width: 150px" dense @click="orderDetails(order)">
                    <q-item clickable>
                      <q-item-section>See Details</q-item-section>
                    </q-item>
                  </q-list>
                  <q-list style="min-width: 150px" dense @click="reOrder(order)">
                    <q-item clickable>
                      <q-item-section>Re-order</q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-btn>
            </div>
          </q-item-section>
        </q-item>
      </q-list>
    </div>

    <q-dialog v-model="showBundleItems">
      <q-card style="width: 100%;">
        <q-card-section>
          <div class="text-subtitle2">Titles in Order</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-list bordered separator>
            <q-item v-for="(detail, index) in clickedOrder.order_details" :key="index">
              <q-item-section>
                <q-item-label>{{ detail.product ? detail.product.name : ""}}</q-item-label>
                <q-item-label caption>{{
                  detail.product ? detail.product.preacher ? detail.product.preacher.name : "" : ""
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
import axios from 'axios'
import { date } from 'quasar'
export default {
  name: 'Orders',
  data () {
    return {
      orders: [],
      clickedOrder: {},
      showBundleItems: false
    }
  },
  computed: {
    user () {
      return this.$store.state.user.user
    },
    token () {
      return this.$store.state.user.token
    }
  },
  methods: {
    orderDetails (order) {
      this.clickedOrder = order
      this.showBundleItems = true
    },
    reOrder (order) {
      for (var i = order.order_details.length - 1; i >= 0; i--) {
        this.addToCart(order.order_details[i].product)
      }
    },
    addToCart (product) {
      product.order_qty = 1
      this.$store.dispatch('products/addToCart', product)
      this.$q.notify('Item(s) added to cart')
    },
    orderDate (order) {
      return date.formatDate(order.created_at, 'DD MMM YYYY')
    },
    getData () {
      axios.get('api/orders')
        .then(res => {
          // console.log(res.data)
          this.orders = res.data.data
        })
        .catch(e => {
          // console.log(e)
          if (!e.response) {
            // network error
            this.$q.notify({
              type: 'negative',
              message: 'Error: Network Error'
            })
          } else {
            if (e.response.status === 401) {
              this.$q.notify({
                type: 'negative',
                // message: e.response.data.message
                message: 'Kindly login to access this page'
              })
            }
          }
        })
    }
  },
  created () {
    this.getData()
  }
}
</script>
