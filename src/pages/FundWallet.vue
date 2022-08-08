<template>
  <div class="q-pa-md row wrap justify-center">
    <div class="q-gutter-md" style="width: 100%">
      <q-input v-model="user.email" label="Email" readonly />
      <q-input v-model="wallet.amount" label="Amount" />
      <paystack
          :amount="wallet.amount * 100"
          :email="user.email"
          :paystackkey="paystackkey"
          :reference="reference"
          :callback="callback"
          :close="close"
          class="u-btn cursor-pointer"
          style="border-radius: 4px; padding: 8px 15px; text-decoration: none; color: white; border: 0; margin: 15px 8px; font-weight: 500; background-color: goldenrod; width: 100%;"
        >
          CARD PAY
      </paystack>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import paystack from 'vue-paystack'
export default {
  name: 'FundWallet',
  props: ['slug'],
  components: {
    paystack
  },
  data () {
    return {
      user: {
        id: null,
        email: null
      },
      wallet: {
        amount: ''
      },
      // paystackkey: 'pk_test_57594caa2c9282d668487b60efe3fd8419f69cb7'
      paystackkey: 'pk_live_e2c0036b4d47e3b0e8551e74e1e4a0e6a8166ea5'
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
      data.wallet = this.wallet
      data.user = this.user

      axios.post('/api/wallet/fund', data)
        .then(res => {
          console.log(res.data)
          this.$router.push({ path: '/wallet' })
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
    this.user = this.$store.state.user.user
  }
}
</script>
