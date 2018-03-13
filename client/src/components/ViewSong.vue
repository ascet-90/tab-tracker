<template>
  <v-container grid-list-lg>
    <v-layout>
      <v-flex xs6>
        <v-card class='grey lighten-3'>
          <v-toolbar flat dense class="amber accent-3" dark>
            <v-toolbar-title>
              Song Metadata
            </v-toolbar-title>
          </v-toolbar>
          <v-container grid-list-lg>
            <v-layout>
              <v-flex xs12>
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
                      <v-btn dark class="amber accent-3" :to="'/songs/' + song.id + '/edit'">Edit
                      </v-btn>
                      <v-btn dark class="amber accent-3"
                      @click="unBookmark" v-if="isUserLoggedIn && bookmark">Unbookmark
                      </v-btn>
                      <v-btn dark class="amber accent-3"
                      @click="setAsBookmark" v-if="isUserLoggedIn && !bookmark">Bookmark
                      </v-btn>
                    </v-flex>
                    <v-flex xs4>
                      <v-card-media :src="song.albumImageUrl" height="200px" contain>
                      </v-card-media>
                      {{ song.album }}
                    </v-flex>
                  </v-layout>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
      <v-flex xs6>
        <v-card>
          <v-toolbar flat dense class="amber accent-3" dark>
            <v-toolbar-title>
              Youtube Video
            </v-toolbar-title>
          </v-toolbar>
          <youtube
            :video-id="song.youtubeId"
            player-width="800"
            player-height="300"
          ></youtube>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex xs6>
        <v-card>
          <v-toolbar flat dense class="amber accent-3" dark>
            <v-toolbar-title>
              Lyrics
            </v-toolbar-title>
          </v-toolbar>
          <v-text-field
            readonly
            v-model="song.lyrics"
            multi-line
            class="song-tab"
          ></v-text-field>
        </v-card>
      </v-flex>
      <v-flex xs6>
        <v-card>
          <v-toolbar flat dense class="amber accent-3" dark>
            <v-toolbar-title>
              Tabs
            </v-toolbar-title>
          </v-toolbar>
          <v-text-field
            readonly
            v-model="song.tab"
            multi-line
            class="song-tab"
          ></v-text-field>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import SongsService from '@/services/SongsService'
import BookmarksService from '@/services/BookmarksService'
import SongHistoryService from '@/services/SongHistoryService'
import {mapState} from 'vuex'

export default {
  data () {
    return {
      song: {},
      bookmark: null
    }
  },
  computed: {
    ...mapState([
      'isUserLoggedIn',
      'user'
    ])
  },
  methods: {
    async setAsBookmark () {
      try {
        this.bookmark = (await BookmarksService.post({
          songId: this.song.id
        })).data
      } catch (error) {
        console.log(error)
      }
    },
    async unBookmark () {
      try {
        await BookmarksService.delete(this.bookmark.id)
        this.bookmark = null
      } catch (error) {
        console.log(error)
      }
    }
  },
  async mounted () {
    try {
      const songId = this.$store.state.route.params.id
      this.song = (await SongsService.show(songId)).data
    } catch (error) {
      console.log(error)
    }
    if (!this.isUserLoggedIn) {
      return
    }
    try {
      SongHistoryService.post({
        songId: this.song.id
      })
      this.bookmark = (await BookmarksService.index({
        songId: this.song.id
      })).data[0]
    } catch (error) {
      console.log(error)
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
<style>
  .song-tab textarea {
    font-family: monospace;
    height: 600px;
    border: none;
    border-style: none;
    border-color: transparent;
    padding: 40px;
  }
</style>
