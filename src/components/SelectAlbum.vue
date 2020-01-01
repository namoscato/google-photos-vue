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
import { mapActions, mapState } from 'vuex'
import { State } from '@/store'
import Album = gapi.client.photoslibrary.Album;

@Component({
  computed: mapState<State>({
    albums: (state: State) => state.albums.all,
    isSignedIn: (state: State) => state.google.isSignedIn
  }),
  methods: mapActions('albums', {
    listAlbums: 'list'
  })
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
