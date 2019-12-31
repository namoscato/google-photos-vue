<template>
  <ul>
    <li :key="mediaItem.id" v-for="mediaItem in mediaItems">
      <figure>
        <img :alt="mediaItem.description" :src="mediaItem.baseUrl">
        <figcaption>{{ mediaItem.description }}</figcaption>
      </figure>
    </li>
  </ul>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'

@Component
export default class Album extends Vue {
  @Prop(String) readonly albumId!: string;

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
}

li:nth-child(odd) {
  text-align: right;
}

img {
  max-height: 25em;
  max-width: 25em;
}
</style>
