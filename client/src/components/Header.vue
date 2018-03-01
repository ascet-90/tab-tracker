<template>
  <v-toolbar fixed dark class="amber accent-3">
    <v-toolbar-title class="mr-4">
      <router-link to="/" tag="span" class="home">
        TabTracker
      </router-link></v-toolbar-title>
    <v-toolbar-items>
      <v-btn flat dark to="/songs">
        Browse
      </v-btn>
    </v-toolbar-items>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn flat dark to="/login" v-if="!$store.state.isUserLoggedIn">
        Login
      </v-btn>
      <v-btn flat dark to="/register" v-if="!$store.state.isUserLoggedIn">
        Sign Up
      </v-btn>
      <v-btn flat dark @click.native="logout" v-if="$store.state.isUserLoggedIn">
        Log Out
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  methods: {
    logout () {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      this.$router.push('/')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .home {
    cursor: pointer;
    transition: color .5s;
  }
  .home:hover {
    color: #000;
  }
</style>
