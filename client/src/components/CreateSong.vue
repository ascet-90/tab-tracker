<template>
  <v-layout row wrap>
    <v-flex xs4>
      <v-card>
        <v-toolbar flat dense class="amber accent-3" dark>
          <v-toolbar-title>
            Song Metadata
          </v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-text-field
            label="Title"
            v-model="song.title"
            required
            :rules="[rules.required]"
          ></v-text-field>
          <v-text-field
            label="Artist"
            v-model="song.artist"
            required
            :rules="[rules.required]"
          ></v-text-field>
          <v-text-field
            label="Genre"
            v-model="song.genre"
            required
            :rules="[rules.required]"
          ></v-text-field>
          <v-text-field
            label="Album"
            v-model="song.album"
            required
            :rules="[rules.required]"
          ></v-text-field>
          <v-text-field
            label="Album Image Url"
            v-model="song.albumImageUrl"
            required
            :rules="[rules.required]"
          ></v-text-field>
          <v-text-field
            label="Youtube ID"
            v-model="song.youtubeId"
            required
            :rules="[rules.required]"
          ></v-text-field>
        </v-card-text>
      </v-card>
    </v-flex>
    <v-flex xs8 class="pl-2">
      <v-card>
        <v-toolbar flat dense class="amber accent-3" dark>
          <v-toolbar-title>
            Song Structure
          </v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-text-field
            label="Lyrics"
            v-model="song.lyrics"
            multi-line
            required
            :rules="[rules.required]"
          ></v-text-field>
          <v-text-field
            label="Tab"
            v-model="song.tab"
            multi-line
            required
            :rules="[rules.required]"
          ></v-text-field>
        </v-card-text>
      </v-card>
       <v-alert color="error" v-model="error" dismissible outline>
        {{ errorMessage}}
      </v-alert>
      <v-btn dark class="amber accent-3 mt-3" @click="create">Create Song</v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
import SongsService from '@/services/SongsService'
export default {
  data () {
    return {
      song: {
        title: '',
        artist: '',
        genre: '',
        album: '',
        albumImageUrl: '',
        youtubeId: '',
        lyrics: '',
        tab: ''
      },
      error: null,
      errorMessage: '',
      rules: {
        required: (value) => !!value || 'Required'
      }
    }
  },
  methods: {
    async create () {
      const songIsValid = Object.keys(this.song).every(key => !!this.song[key])
      if (!songIsValid) {
        this.error = true
        this.errorMessage = 'Please fill in all the required fields!'
        return
      }
      try {
        if (this.song.title !== '' && this.song.artist !== '' && this.song.album !== '') {
          await SongsService.post(this.song)
          this.$router.push('/songs')
        }
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
