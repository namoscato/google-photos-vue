<template>
  <textarea :value="state" readonly />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { State } from '@/store'

@Component({})
export default class TextareaExternalState extends Vue {
  get state () {
    const state: State = JSON.parse(JSON.stringify(this.$store.state))
    const baseUrlDirectory = `${document.title.replace('/', '_')}_files`

    state.photos.albums = []

    state.photos.mediaItems = state.photos.mediaItems.map(function (mediaItem) {
      const filenameParts = mediaItem.filename!.replace('~', '_').split('.')

      if (filenameParts[filenameParts.length - 1] === 'HEIC') {
        filenameParts[filenameParts.length - 1] = 'jpg'
      }

      mediaItem.baseUrl = `${baseUrlDirectory}/${filenameParts.join('.')}`

      return mediaItem
    })

    return JSON.stringify(state)
  }
}
</script>
