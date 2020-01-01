<template>
  <div id="app">
    <button
      @click="logout()"
      type="button"
      v-if="isSignedIn">
      Logout
    </button>
    <button
      :disabled="isSignedIn === null"
      @click="login()"
      type="button"
      v-if="!isSignedIn">
      Login
    </button>
    <SelectAlbum :is-signed-in="isSignedIn" v-model="selectedAlbumId" />
    <hr>
    <Album :album-id="selectedAlbumId" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import SelectAlbum from '@/components/SelectAlbum.vue'
import Album from '@/components/Album.vue'
import { mapActions, mapState } from 'vuex'

@Component({
  components: {
    Album,
    SelectAlbum
  },
  computed: mapState('google', [
    'isSignedIn'
  ]),
  methods: mapActions('google', [
    'signIn'
  ])
})
export default class App extends Vue {
  isSignedIn!: boolean|null;
  selectedAlbumId: string = '';

  signIn!: (isSignedIn: boolean) => void

  created () {
    this.$gapi.isSignedIn().then(this.signIn)
    this.$gapi.listenUserSignIn(this.signIn)
  }

  login () {
    this.$gapi.login(function () {})
  }

  logout () {
    this.$gapi.logout(function () {})
  }
}
</script>

<style>
body,
html {
  margin: 0;
}

body {
  background-color: #202124;
  color: #e8eaed;
  font-family: "Helvetica Neue", sans-serif;
}
</style>
