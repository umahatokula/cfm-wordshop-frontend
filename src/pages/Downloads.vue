<template>
  <div class="q-pa-md" style="width: auto">
    <q-card class="my-card q-mb-lg">
      <q-card-section>
        <p>Note: Your download links will expire in <b>48 hours</b></p>
        <p>For complaints and enquiries, kindly send a Whatsapp message to +2348164932264</p>
      </q-card-section>
    </q-card>

    <q-list v-for="orderItem in orderItems" :key="orderItem.id" bordered class="q-mb-sm">
      <q-item  v-ripple>
        <q-item-section>
          {{ orderItem.product.name }}
          <div class="text-caption text-weight-light q-mt-sm">{{ orderItem.product.preacher.name }}</div>
        </q-item-section>
        <q-item-section avatar>
          <a
            :href ="orderItem.temp_link"
            download
            target="_blank"
            class="q-pa-sm bg-secondary text-white text-caption text-weight-light"
            style="border-radius: 4px; text-decoration: none;"
          >Download</a>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'Downloads',
  props: ['transaction_number'],
  data () {
    return {
      transaction: '',
      loading3: false,
      percentage3: 0,
      orderItems: []
    }
  },
  methods: {
    download (tempLink) {
      axios
        .get(`/api/orders/download/links/${this.transaction_number}`, {
          responseType: 'arraybuffer'
        })
        .then(res => {
          console.log(res)

          var url = URL.createObjectURL(tempLink)

          const link = document.createElement('a')
          link.href = url
          link.setAttribute('download', 'monthly_report.pdf')
          document.body.appendChild(link)
          link.click()
          link.parentNode.removeChild(link)
        })
        .catch(e => {
          console.log(e)
        })
    },
    getData () {
      axios.get(`/api/orders/download/links/${this.transaction_number}`)
        .then(response => {
          console.log(response)
          this.transaction = response.data.transaction
          this.orderItems = response.data.products
        })
        .catch(e => {
          console.log(e)
        })
    }
  },
  created: function () {
    // `this` points to the vm instance
    console.log('a is: ')
    this.getData()
  }
}
</script>
