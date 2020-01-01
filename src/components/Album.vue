<template>
  <div v-if="album">
    <div class="header">
      <h1>{{ album.title }}</h1>
      <div class="format-controls">
        <input type="radio" id="format-image" value="photo" v-model="format">
        <label for="format-image">Photo</label>
        <input type="radio" id="format-text" value="text" v-model="format">
        <label for="format-text">Text</label>
      </div>
    </div>
    <ul>
      <AlbumMediaItem
        :format="format"
        :key="mediaItem.id"
        :media-item="mediaItem"
        v-for="mediaItem in mediaItems"
      />
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import AlbumMediaItem from '@/components/AlbumMediaItem.vue'
import { AlbumFormat } from '@/components/types'
import { mapActions, mapState } from 'vuex'
import { State } from '@/store'
import MediaItem = gapi.client.photoslibrary.MediaItem;

@Component({
  components: {
    AlbumMediaItem
  },
  computed: mapState<State>('albums', [
    'album',
    'mediaItems'
  ]),
  methods: mapActions('albums', {
    getAlbum: 'get'
  })
})
export default class Album extends Vue {
  @Prop(String) readonly albumId!: string;

  album!: gapi.client.photoslibrary.Album|null;
  format: AlbumFormat = AlbumFormat.Photo;
  mediaItems!: MediaItem[];

  @Watch('albumId')
  getAlbum!: Function;

  created () {
    this.$gapi.listenUserSignIn((isSignedIn: boolean) => {
      if (!isSignedIn) {
        this.mediaItems = []
      }
    })
  }
}
</script>

<style scoped>
.header {
  margin: 1.5em 0;
  padding: 0 1em;
  position: relative;
}

h1 {
  font-size: 2em;
  font-weight: 200;
  margin: 0;
}

.format-controls {
  line-height: 2;
}

input[type="radio"] {
  opacity: 0;
  position: fixed;
}

label {
  opacity: .5;
  margin-right: 2em;
  cursor: pointer;
}

input[type="radio"]:checked + label {
  opacity: 1;
}

ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  text-align: justify;
}

@media screen and (min-width: 30em) {
  .format-controls {
    position: absolute;
    right: 0;
    top: 0;
  }
}
</style>
