<template>
  <v-card class='grey lighten-3'>
    <v-toolbar flat dense class="amber accent-3" dark>
      <v-toolbar-title>
        Songs
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon to="/songs/create" dark title="Create">
        <v-icon style="font-size:35px">add_circle</v-icon>
      </v-btn>
    </v-toolbar>
    <v-container grid-list-lg>
      <v-layout column>
        <v-flex xs12 v-for="song in songs" :key="song.id">
          <v-card class="song">
            <v-layout>
              <v-flex xs8>
                <div class="song-title">
                  {{ song.title }}
                </div>
                <div class="song-artist">
                  {{ song.artist }}
                </div>
                <div class="song-genre">
                  {{ song.genre }}
                </div>
                <v-btn dark class="amber accent-3 mt-3" :to="'/songs/' + song.id">View</v-btn>
              </v-flex>
              <v-flex xs4>
                <v-card-media :src="song.albumImageUrl" height="200px" contain>
                </v-card-media>
              </v-flex>
            </v-layout>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
import SongsService from '@/services/SongsService'
export default {
  data () {
    return {
      songs: []
    }
  },
  watch: {
    '$route.query.search': {
      immediate: true,
      async handler (value) {
        this.songs = (await SongsService.index(value)).data
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .song {
    padding: 20px;
    overflow: hidden;
  }
  .song-title {
    font-size: 30px;
  }
  .song-artist {
    font-size: 24px;
  }
  .song-genre {
    font-size: 18px;
  }
</style>
