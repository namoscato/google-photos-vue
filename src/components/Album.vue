<template>
  <div>
    <input type="radio" id="format-image" value="image" v-model="format">
    <label for="format-image">Image</label>
    <input type="radio" id="format-text" value="text" v-model="format">
    <label for="format-text">Text</label>
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

  format: AlbumFormat = AlbumFormat.Image;

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
      })
    } else {
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
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  text-align: justify;
}
</style>
