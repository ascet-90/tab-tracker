<template>
  <v-card>
    <v-toolbar flat dense class="amber accent-3" dark>
      <v-toolbar-title>
        Search
      </v-toolbar-title>
    </v-toolbar>
    <v-container>
      <v-layout>
        <v-text-field
          name="search"
          label="Search by song title, artist, album or genre"
          v-model="search"
        ></v-text-field>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
import _ from 'lodash'
export default {
  data () {
    return {
      search: ''
    }
  },
  watch: {
    search: _.debounce(async function (value) {
      const route = {
        name: 'Songs'
      }
      if (this.search !== '') {
        route.query = {
          search: this.search
        }
      }
      this.$router.push(route)
    }, 700),
    '$route.query.search': {
      immediate: true,
      handler (value) {
        this.search = value
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
