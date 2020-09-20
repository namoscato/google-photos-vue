<template>
  <span :style="style">{{ descriptionTheme }}</span>
</template>

<script lang="ts">
import { getRandomColor } from '@/utils';
import { props } from "vue-class-component";

const COLOR = '#a7a7a7'
const COLOR_DELTA = 0.25

const Props = props({
  descriptionTheme: {
    type: String,
    required: true
  }
});

export default class AlbumMediaItemText extends Props {
  color: string = getRandomColor(COLOR, COLOR_DELTA);

  get style () {
    return {
      color: this.color,
      'font-weight': 100 * (Math.floor(Math.random() * 7) + 1)
    }
  }
}
</script>
