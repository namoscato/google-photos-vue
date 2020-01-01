<template>
  <div id="app">
    <Login />
    <SelectAlbum v-model="selectedAlbumId" />
    <hr>
    <Album :album-id="selectedAlbumId" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import SelectAlbum from '@/components/SelectAlbum.vue'
import Album from '@/components/Album.vue'
import { createNamespacedHelpers } from 'vuex'
import Login from '@/components/Login.vue'

const { mapActions, mapState } = createNamespacedHelpers('photos')

@Component({
  components: {
    Login,
    Album,
    SelectAlbum
  },
  computed: mapState([
    'isSignedIn'
  ]),
  methods: mapActions([
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
