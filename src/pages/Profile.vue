<template>
<div></div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Profile',
  data () {
    return {}
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
    getData () {
      axios.get('api/profile')
        .then(res => {
          // console.log(res)
        })
        .catch(e => {
          // console.log(e.response)
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
