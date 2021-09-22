<template>
  <div class="q-pa-md">
    <div class="row">
      <div class="col-12 col-md-6 q-pa-lg">
        <div class="q-gutter-md q-mb-lg">
          <h5 class="text-h5 text-weight-medium text-orange-7">Login</h5>
          <q-input v-model="user_login.email" label="E-mail" />
          <q-input v-model="user_login.password" label="Password" type="password" />
          <q-btn @click="submitLogin" color="primary" label="Login" size="md" />
        </div>
      </div>
      <div class="col-12 col-md-6 q-pa-lg">
        <div class="q-gutter-md q-mb-lg">
          <h5 class="text-h5 text-weight-medium text-orange-7">Create your Wordshop account</h5>
          <q-input v-model="user_signup.name" label="Name" />
          <q-input v-model="user_signup.email" label="Email" />
          <q-input v-model="user_signup.password" label="Password" type="password" />
          <q-input v-model="user_signup.password_confirmation" label="Password Confirmation" type="password" />
          <q-btn @click="submitSignup" color="primary" label="signup" size="md" style="display: block;" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
export default {
  name: 'Login',
  data () {
    return {
      user_login: {
        email: '',
        password: ''
      },
      user_signup: {
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
      },
      validationErrors: [],
      errorMessage: ''
    }
  },
  methods: {
    submitLogin () {
      axios.post('/api/login', this.user_login).then((res) => {
        // console.log(res.data.token)
        Vue.prototype.$axios.defaults.headers.common.Authorization = `Bearer ${res.data.token}`
        this.$store.dispatch('user/setUser', res.data.user)
        this.$store.dispatch('user/setAccessToken', res.data.token)
        this.$q.notify({
          type: 'positive',
          message: 'Login successful.'
        })
        if (res.data.success) {
          this.$router.push({ path: 'profile' })
        }
      }).catch((e) => {
        // console.log(e.response.data.message)
        if (!e.response) {
          // network error
          this.$q.notify({
            type: 'negative',
            message: 'Error: Network Error'
          })
        } else {
          if (e.response.status === 422) {
            this.validationErrors = e.response.data.errors
            this.errorMessage = e.response.data.message
            this.$q.notify({
              type: 'negative',
              message: this.errorMessage
            })
          }
        }
      })
    },
    submitSignup () {
      axios.post('/api/signup', this.user_signup).then((res) => {
        // console.log(res.data.token)
        Vue.prototype.$axios.defaults.headers.common.Authorization = `Bearer ${res.data.token}`
        this.$store.dispatch('user/setUser', res.data.user)
        this.$store.dispatch('user/setAccessToken', res.data.token)
        this.$q.notify({
          type: 'positive',
          message: 'Signup Successful'
        })
        if (res.data.success) {
          this.$router.push({ path: 'profile' })
        }
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
