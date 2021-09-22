<template>
  <div class="q-pa-md">
    <div class="q-py-md justify-end">
      <q-btn :to="'/wallet/fund'" align="right" class="btn-fixed-width" color="teal-10" label="Add Units" flat />
    </div>
    <p class="text-h6">Overview</p>
    <div class="row justify-between">
      <div class="col-6 q-pa-lg " style="min-height: 100px;">
        Balance
      </div>
      <div class="col-6 q-pa-lg" style="min-height: 100px;">
        Used Credit
      </div>
    </div>
    <div>
    <p class="text-h6 q-mt-md">History</p>
    <q-table
      dense
      :rows="transactions"
      :columns="columns"
      row-key="name"
    />
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'MyWallet',
  props: ['slug'],
  data () {
    return {
      columns: [
        { name: 'amount', align: 'center', label: 'Amount', field: 'amount', sortable: true },
        { name: 'balance', label: 'Balance', field: 'balance', sortable: true },
        { name: 'type', label: 'Type', field: 'type' }
      ],
      transactions: []
    }
  },
  methods: {
    getData () {
      axios
        .get('/api/wallet/transactions')
        .then(response => {
          // console.log(response.data)
          this.transactions = response.data.transactions
        })
        .catch(e => {
          // console.log(e)
          if (!e.response) {
          // network error
            this.$q.notify({
              type: 'negative',
              message: 'Error: Network Error'
            })
          } else {}
        })
    }
  },
  created: function () {
    this.getData()
  }
}
</script>
