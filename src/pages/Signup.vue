<template>
  <div class="q-pa-md row wrap justify-center">
    <div class="q-gutter-md" style="width: 100%">
      <q-input outlined v-model="user.name" label="Name" />
      <q-input outlined v-model="user.email" label="Email" />
      <q-input outlined v-model="user.password" label="Password" type="password" />
      <q-input outlined v-model="user.password_confirmation" label="Password Confirmation" type="password" />
      <q-btn @click="submit" color="primary" label="signup" />
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Signup',
  data () {
    return {
      user: {
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
      },
      errorMessage: ''
    }
  },
  methods: {
    submit () {
      axios.post('/api/signup', this.user).then((res) => {
        console.log(res.data.token)
        this.$store.dispatch('user/setUser', res.data.user)
        this.$store.dispatch('user/setAccessToken', res.data.token)
        this.$q.notify({
          type: 'negative',
          message: this.errorMessage
        })
      }).catch((e) => {
        // console.log(e)
        if (!e.response) {
          // network error
          this.$q.notify({
            type: 'negative',
            message: 'Error: Network Error'
          })
        } else {
          if (e.response.status === 422) {
            this.errorMessage = e.response.data.message
            this.$q.notify({
              type: 'negative',
              message: this.errorMessage
            })
          }
        }
      })
    }
  }
}
</script>
