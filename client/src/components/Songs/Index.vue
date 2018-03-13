<template>
  <v-layout>
    <v-flex v-if="isUserLoggedIn">
      <songs-bookmarks/>
      <recently-viewed-songs class="mt-2"/>
    </v-flex>
    <v-flex>
      <songs-search-panel/>
      <songs-panel class="mt-2"/>
    </v-flex>
  </v-layout>
</template>

<script>
import SongsPanel from './SongsPanel'
import SongsSearchPanel from './SongsSearchPanel'
import SongsBookmarks from './SongsBookmarks'
import RecentlyViewedSongs from './RecentlyViewedSongs'
import {mapState} from 'vuex'
export default {
  components: {
    SongsPanel,
    SongsSearchPanel,
    SongsBookmarks,
    RecentlyViewedSongs
  },
  computed: {
    ...mapState([
      'isUserLoggedIn'
    ])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
