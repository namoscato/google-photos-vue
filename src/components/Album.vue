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

@Component({
  components: {
    AlbumMediaItem
  }
})
export default class Album extends Vue {
  @Prop(String) readonly albumId!: string;

  album: gapi.client.photoslibrary.Album|null = null;
  format: AlbumFormat = AlbumFormat.Photo;
  mediaItems: gapi.client.photoslibrary.MediaItem[] = [];

  created () {
    this.$gapi.listenUserSignIn((isSignedIn: boolean) => {
      if (!isSignedIn) {
        this.mediaItems = []
      }
    })
  }

  @Watch('albumId')
  onAlbumIdChange (albumId: string) {
    if (albumId) {
      this.$gapi.getGapiClient().then(() => {
        this.fetchMediaItems(albumId)

        gapi.client.photoslibrary.albums.get({ albumId }).then((response) => {
          this.album = response.result
        })
      })
    } else {
      this.album = null
      this.mediaItems = []
    }
  }

  private fetchMediaItems (albumId: string, pageToken?: string) {
    return gapi.client.photoslibrary.mediaItems.search({
      resource: {
        albumId,
        pageSize: 100,
        pageToken
      }
    }).then((response) => {
      const nextPageToken = response.result.nextPageToken

      if (nextPageToken) {
        this.fetchMediaItems(albumId, nextPageToken)
      }

      this.mediaItems = this.mediaItems.concat(response.result.mediaItems!)
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
