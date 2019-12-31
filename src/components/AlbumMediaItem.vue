<template>
  <li
    :class="['is-' + format]"
    :style="style"
    :title="description">
    <img
      :alt="descriptionTheme"
      :src="mediaItem.baseUrl"
      v-if="'image' === format">
    <span v-else>{{ descriptionTheme }}</span>
  </li>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import color from 'onecolor'
import { AlbumFormat } from '@/components/types'

const BACKGROUND_COLOR = '#202124'
const BACKGROUND_COLOR_DELTA = 0.1

const COLOR = '#a7a7a7'
const COLOR_DELTA = 0.25

@Component
export default class AlbumMediaItem extends Vue {
  @Prop(Object) readonly mediaItem!: gapi.client.photoslibrary.MediaItem;
  @Prop(String) readonly format!: AlbumFormat;

  backgroundColor: string = BACKGROUND_COLOR;
  color: string = COLOR;
  descriptionTheme: string = '';

  get description () {
    const description = this.mediaItem.description

    return description ? description.trim() : ''
  }

  get style () {
    if (AlbumFormat.Image === this.format) {
      return { 'background-color': this.backgroundColor }
    }

    return {
      color: this.color,
      'font-weight': 100 * (Math.floor(Math.random() * 7) + 1)
    }
  }

  private static getRandomColor (hex: string, delta: number) {
    return color(hex).lightness(Math.random() * 2 * delta - delta, true).hex()
  }

  created () {
    this.backgroundColor = AlbumMediaItem.getRandomColor(BACKGROUND_COLOR, BACKGROUND_COLOR_DELTA)
    this.color = AlbumMediaItem.getRandomColor(COLOR, COLOR_DELTA)

    if (this.description) {
      this.descriptionTheme = `${this.extractDescriptionTheme(this.description)} `
    } else {
      console.warn('Media item does not have description', this.mediaItem)
    }
  }

  private extractDescriptionTheme (description: string) {
    let normalizedDescription = description.replace(/[\u201C\u201D]/g, '"')

    const matches = normalizedDescription.match(/[^"]*"([^"]+)"[^"]*/)

    if (normalizedDescription.split('"').length !== 3 || matches === null) {
      console.warn('Potentially unable to parse description', { description, baseUrl: this.mediaItem.baseUrl })
    }

    return matches === null ? description : matches[1]
  }
}
</script>

<style scoped>
li.is-image {
  float: left;
  overflow: hidden;
  padding-bottom: 33.333333333%;
  position: relative;
  width: 33.333333333%;
}

li.is-text {
  display: inline;
  font-size: 1.5em;
  line-height: 1.3;
  text-transform: lowercase;
}

li.is-text:hover {
  text-decoration: underline;
}

li.is-image > img {
  height: 100%;
  object-fit: cover;
  position: absolute;
  width: 100%;
}

@media screen and (min-width: 20em) {
  li.is-text {
    font-size: 2em;
  }
}

@media screen and (min-width: 30em) {
  li.is-image {
    padding-bottom: 20%;
    width: 20%;
  }
}

@media screen and (min-width: 40em) {
  li.is-image {
    padding-bottom: 16.666666667%;
    width: 16.666666667%;
  }

  li.is-text {
    font-size: 2.5em;
  }
}

@media screen and (min-width: 50em) {
  li.is-image {
    padding-bottom: 12.5%;
    width: 12.5%;
  }
}

@media screen and (min-width: 60em) {
  li.is-image {
    padding-bottom: 10%;
    width: 10%;
  }

  li.is-text {
    font-size: 3em;
  }
}

@media screen and (min-width: 70em) {
  li.is-image {
    padding-bottom: 8.3333333333%;
    width: 8.3333333333%;
  }
}

@media screen and (min-width: 91em) {
  li.is-image {
    padding-bottom: 6.666666666666667%;
    width: 6.666666666666667%;
  }
}
</style>
