<template>
  <li :style="{ 'background-color': backgroundColor }">
    <img
      :alt="mediaItem.description"
      :src="mediaItem.baseUrl"
      :title="mediaItem.description">
  </li>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import color from 'onecolor'

const COLOR = '#202124'
const COLOR_DELTA = 0.1

@Component
export default class AlbumMediaItem extends Vue {
  @Prop(Object) readonly mediaItem!: gapi.client.photoslibrary.MediaItem;

  backgroundColor: string = COLOR;

  created () {
    this.backgroundColor = color(COLOR)
      .lightness(Math.random() * 2 * COLOR_DELTA - COLOR_DELTA, true)
      .hex()
  }
}
</script>

<style scoped>
li {
  float: left;
  overflow: hidden;
  padding-bottom: 33.333333333%;
  position: relative;
  width: 33.333333333%;
}

img {
  height: 100%;
  object-fit: cover;
  position: absolute;
  width: 100%;
}

@media screen and (min-width: 30em) {
  li {
    padding-bottom: 20%;
    width: 20%;
  }
}

@media screen and (min-width: 40em) {
  li {
    padding-bottom: 16.666666667%;
    width: 16.666666667%;
  }
}

@media screen and (min-width: 50em) {
  li {
    padding-bottom: 12.5%;
    width: 12.5%;
  }
}

@media screen and (min-width: 60em) {
  li {
    padding-bottom: 10%;
    width: 10%;
  }
}

@media screen and (min-width: 70em) {
  li {
    padding-bottom: 8.3333333333%;
    width: 8.3333333333%;
  }
}

@media screen and (min-width: 91em) {
  li {
    padding-bottom: 6.666666666666667%;
    width: 6.666666666666667%;
  }
}
</style>
