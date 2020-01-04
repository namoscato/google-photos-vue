<template>
  <span :style="style">{{ descriptionTheme }}</span>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { getRandomColor } from '@/utils'

const COLOR = '#a7a7a7'
const COLOR_DELTA = 0.25

@Component
export default class AlbumMediaItemText extends Vue {
  @Prop(String) readonly descriptionTheme!: string;

  color: string = getRandomColor(COLOR, COLOR_DELTA);

  get style () {
    return {
      color: this.color,
      'font-weight': 100 * (Math.floor(Math.random() * 7) + 1)
    }
  }
}
</script>
