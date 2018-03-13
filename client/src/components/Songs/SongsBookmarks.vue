<template>
  <v-card>
    <v-toolbar flat dense class="amber accent-3" dark>
      <v-toolbar-title>
        Bookmarks
      </v-toolbar-title>
    </v-toolbar>
    <v-data-table
      :headers="headers"
      :pagination.sync="pagination"
      :items="bookmarks"
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td class="text-xs-left">{{ props.item.title }}</td>
        <td class="text-xs-left">{{ props.item.artist }}</td>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import {mapState} from 'vuex'
import BookmarksService from '@/services/BookmarksService'
export default {
  data () {
    return {
      headers: [
        {
          text: 'Title',
          value: 'title'
        },
        {
          text: 'Artist',
          value: 'artist'
        }
      ],
      pagination: {
        sortBy: 'createdAt',
        descending: true
      },
      bookmarks: [
      ]
    }
  },
  computed: {
    ...mapState([
      'isUserLoggedIn',
      'user'
    ])
  },
  async mounted () {
    if (this.isUserLoggedIn) {
      this.bookmarks = (await BookmarksService.index()).data
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
