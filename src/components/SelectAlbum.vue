<template>
  <select
    :disabled="!isSignedIn || 0 === albums.length"
    :value="value"
    @input="$emit('input', $event.target.value)">
    <option value="">Select Album...</option>
    <option
      :key="album.id"
      :value="album.id"
      v-for="album in albums">
      {{ album.title }}
    </option>
  </select>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'

@Component({})
export default class SelectAlbum extends Vue {
  @Prop(Boolean) readonly isSignedIn!: boolean;
  @Prop(String) readonly value!: string;

  albums: gapi.client.photoslibrary.Album[] = [];

  created () {
    this.fetchAlbums()
  }

  @Watch('isSignedIn')
  private fetchAlbums () {
    if (this.isSignedIn) {
      this.$gapi.getGapiClient().then((gapi) => {
        gapi.client.photoslibrary.albums.list({}).then((response) => {
          this.albums = response.result.albums!
        })
      })
    } else {
      this.albums = []
    }
  }
}
</script>
