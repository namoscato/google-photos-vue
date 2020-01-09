<template>
  <textarea :value="state" readonly />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { State } from '@/store'

@Component({})
export default class TextareaExternalState extends Vue {
  get state () {
    const filenameCountMap: { [filename: string]: number } = {}
    const state: State = JSON.parse(JSON.stringify(this.$store.state))
    const baseUrlDirectory = `${document.title.replace('/', '_')}_files`

    state.photos.albums = []

    state.photos.mediaItems = state.photos.mediaItems.map(function (mediaItem) {
      let filename = mediaItem.filename!
      const lastDot = filename.lastIndexOf('.')
      let extension = filename.substring(1 + lastDot, filename.length)

      if (extension === 'HEIC') {
        extension = 'jpg'
      }

      filename = filename.substring(0, lastDot).replace('~', '_')
      const filenameNormalized = filename.toLowerCase()

      if (typeof filenameCountMap[filenameNormalized] !== 'undefined') {
        filename += `(${filenameCountMap[filenameNormalized]++})`
      } else {
        filenameCountMap[filenameNormalized] = 1
      }

      mediaItem.baseUrl = `${baseUrlDirectory}/${filename}.${extension}`

      return mediaItem
    })

    return JSON.stringify(state)
  }
}
</script>
