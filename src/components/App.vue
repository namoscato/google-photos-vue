<template>
  <div id="app">
    <div v-if="!externalStatePath">
      <Login />
      <SelectAlbum v-model="selectedAlbumId" />
      <TextareaExternalState v-if="selectedAlbumId" />
      <hr>
    </div>
    <Album :album-id="selectedAlbumId" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import SelectAlbum from '@/components/SelectAlbum.vue'
import Album from '@/components/Album.vue'
import { createNamespacedHelpers } from 'vuex'
import Login from '@/components/Login.vue'
import TextareaExternalState from '@/components/TextareaExternalState.vue'

const { mapActions, mapState } = createNamespacedHelpers('photos')

@Component({
  components: {
    TextareaExternalState,
    Login,
    Album,
    SelectAlbum
  },
  computed: mapState([
    'album',
    'isSignedIn'
  ]),
  methods: mapActions([
    'signIn'
  ])
})
export default class App extends Vue {
  @Prop(String) readonly externalStatePath!: string|null
  readonly isSignedIn!: boolean|null;

  defaultTitle: string = '';
  selectedAlbumId: string = '';

  signIn!: (isSignedIn: boolean) => void

  created () {
    if (this.$gapi) {
      this.$gapi.isSignedIn().then(this.signIn)
      this.$gapi.listenUserSignIn(this.signIn)
    }

    this.defaultTitle = document.title
  }

  @Watch('album')
  onAlbumChange (album: gapi.client.photoslibrary.Album|null) {
    document.title = album && album.title ? album.title : this.defaultTitle
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
