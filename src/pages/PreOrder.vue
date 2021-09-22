<template>
  <div class="q-pa-md">
    <div v-if="showPreOrder" class="row">
      <div class="col-12 col-md-12 q-pa-lg">
        <div class="q-gutter-md q-mb-lg">
          <q-img
            src="preorder.jpg"
            :ratio="16/9"
          />
          <h5 class="text-h5 text-weight-medium" style="color: #51d628">Pre-order FA'21 Sermons</h5>
          <q-input v-model="preOrder.name" label="Name" />
          <q-input v-model="preOrder.email" label="E-mail" />
          <q-input v-model="preOrder.amount" label="Amount" readonly />
          <paystack
              :amount="preOrder.amount * 100"
              :email="preOrder.email"
              :paystackkey="paystackkey"
              :reference="reference"
              :callback="callback"
              :close="close"
              class="u-btn cursor-pointer"
              style="border-radius: 4px; padding: 12px 15px; text-decoration: none; color: white; border: 0; margin: 15px 8px; font-weight: 500; background-color: #4b2bd9; width: 100%; font-size: 20px;"
            >
              PRE-ORDER
          </paystack>
        </div>
      </div>
    </div>
    <div v-else>
      <p>Pre-order is closed</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import paystack from 'vue-paystack'
export default {
  name: 'PreOrder',
  components: {
    paystack
  },
  data () {
    return {
      showPreOrder: false,
      preOrder: {
        email: '',
        name: '',
        amount: 1600
      },
      // paystackkey: 'pk_test_57594caa2c9282d668487b60efe3fd8419f69cb7',
      paystackkey: 'pk_live_e2c0036b4d47e3b0e8551e74e1e4a0e6a8166ea5',
      bundles: [
        {
          name: 'Full',
          amount: 2100
        },
        {
          name: 'Half',
          amount: 1100
        }
      ],
      selected: null,
      validationErrors: [],
      errorMessage: ''
    }
  },
  watch: {
    selected: function (val) {
      this.preOrder.amount = val.amount
    }
  },
  computed: {
    reference () {
      let text = ''
      const possible =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
      for (let i = 0; i < 10; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
      }
      return text
    }
  },
  methods: {
    callback (response) {
      var data = {}
      data.transaction = response
      data.name = this.preOrder ? this.preOrder.name : null
      data.email = this.preOrder ? this.preOrder.email : null
      data.amount = this.preOrder ? this.preOrder.amount : null

      axios.post('api/pre-order', data)
        .then(res => {
          // console.log(res.data)
          this.preOrder.name = this.$store.state.user.user.name
          this.preOrder.email = this.$store.state.user.user.email
          this.$q.notify({
            type: 'positive',
            message: 'Thanks. Please check your email'
          })
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
    makeid (length) {
      var result = ''
      var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
      var charactersLength = characters.length
      for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength))
      }
      return result
    },
    close: function () {
      console.log('Payment closed')
    }
  },
  created: function () {
    this.preOrder.name = this.$store.state.user.user.name
    this.preOrder.email = this.$store.state.user.user.email
  }
}
</script>
