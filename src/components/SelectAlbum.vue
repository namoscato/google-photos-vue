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
import { createNamespacedHelpers } from 'vuex'
import Album = gapi.client.photoslibrary.Album;

const { mapActions, mapState } = createNamespacedHelpers('photos')

@Component({
  computed: mapState([
    'albums',
    'isSignedIn'
  ]),
  methods: mapActions([
    'listAlbums'
  ])
})
export default class SelectAlbum extends Vue {
  readonly albums!: Album[];
  readonly isSignedIn!: boolean;
  @Prop(String) readonly value!: string;

  @Watch('isSignedIn')
  listAlbums!: Function;

  created () {
    this.listAlbums()
  }
}
</script>
