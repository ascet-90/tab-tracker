<template>
  <v-layout column>
    <v-flex xs6 offset-xs3>
      <div class="white elevation-2">
        <v-toolbar flat dense class="amber accent-3" dark>
          <v-toolbar-title>
            Register
          </v-toolbar-title>
        </v-toolbar>
        <div class="pl-4 pr-4 pt-2 pb-2">
          <form name="tab-tracker-form" @submit.prevent="">
            <v-text-field
              name="email"
              label="Email"
              v-model="email"
              required
              :type="'email'"
            ></v-text-field>
            <v-text-field
              name="password"
              label="Password"
              v-model="password"
              required
              :type="'password'"
            ></v-text-field>
            <div class="error white--text" v-html="error"></div>
            <v-btn @click="register" type="submit" class="amber accent-3" dark>Register</v-btn>
          </form>
        </div>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
export default {
  name: 'Register',
  data () {
    return {
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    async register () {
      try {
        const response = await AuthenticationService.register({
          email: this.email,
          password: this.password
        })
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
        this.$router.push('/songs')
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .error {
    color: red;
  }
  input {
    padding: 5px 0;
  }
</style>
