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
import { Watch } from 'vue-property-decorator';
import { createNamespacedHelpers } from 'vuex';
import { Options, props } from "vue-class-component";
import Album = gapi.client.photoslibrary.Album;

const { mapActions, mapState } = createNamespacedHelpers('photos')

const Props = props({
  value: {
    type: String,
    required: true
  }
});

@Options({
  computed: mapState([
    'albums',
    'isSignedIn'
  ]),
  methods: mapActions([
    'listAlbums'
  ])
})
export default class SelectAlbum extends Props {
  readonly albums!: Album[];
  readonly isSignedIn!: boolean;

  @Watch('isSignedIn')
  listAlbums!: Function;

  created () {
    this.listAlbums()
  }
}
</script>
