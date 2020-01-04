<template>
  <div :class="{'is-viewing-media-item': mediaItem}" v-if="album">
    <header>
      <h1>{{ album.title }}</h1>
      <nav>
        <input type="radio" id="format-image" value="photo" v-model="format">
        <label for="format-image">Photo</label>
        <input type="radio" id="format-text" value="text" v-model="format">
        <label for="format-text">Text</label>
      </nav>
    </header>
    <ul>
      <AlbumMediaItem
        :format="format"
        :key="item.id"
        :media-item="item"
        v-for="item in mediaItems"
      />
    </ul>
    <aside
      @click="viewMediaItem(null)"
      v-if="mediaItem">
      <img :src="mediaItem.baseUrl">
    </aside>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import AlbumMediaItem from '@/components/AlbumMediaItem.vue'
import { AlbumFormat } from '@/components/types'
import { createNamespacedHelpers } from 'vuex'
import MediaItem = gapi.client.photoslibrary.MediaItem;

const { mapActions, mapState } = createNamespacedHelpers('photos')

@Component({
  components: {
    AlbumMediaItem
  },
  computed: mapState([
    'album',
    'mediaItem',
    'mediaItems'
  ]),
  methods: mapActions([
    'getAlbum',
    'viewMediaItem'
  ])
})
export default class Album extends Vue {
  @Prop(String) readonly albumId!: string;

  album!: gapi.client.photoslibrary.Album|null;
  format: AlbumFormat = AlbumFormat.Photo;
  mediaItem!: MediaItem|null;
  mediaItems!: MediaItem[];

  @Watch('albumId')
  getAlbum!: Function;
}
</script>

<style scoped>
header {
  margin: 1.5em 0;
  padding: 0 1em;
  position: relative;
}

h1 {
  font-size: 2em;
  font-weight: 200;
  margin: 0;
}

nav {
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

aside {
  background-color: rgba(32, 33, 36, 0.8);
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
}

aside > img {
  box-shadow: 0 0 2em #111113;
  left: 50%;
  max-height: 100%;
  max-width: 100%;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
}

.is-viewing-media-item ul {
  filter: grayscale(100%);
}

@media screen and (min-width: 30em) {
  nav {
    position: absolute;
    right: 0;
    top: 0;
  }
}
</style>
