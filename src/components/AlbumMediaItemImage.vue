<template>
  <img
    :alt="descriptionTheme"
    :src="mediaItem.baseUrl"
    :style="{ 'background-color': backgroundColor }">
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { getRandomColor } from '@/utils'
import MediaItem = gapi.client.photoslibrary.MediaItem;

const BACKGROUND_COLOR = '#202124'
const BACKGROUND_COLOR_DELTA = 0.1

@Component
export default class AlbumMediaItemImage extends Vue {
  @Prop(String) readonly descriptionTheme!: string;
  @Prop(Object) readonly mediaItem!: MediaItem;

  backgroundColor: string = getRandomColor(BACKGROUND_COLOR, BACKGROUND_COLOR_DELTA);
}
</script>

<style scoped>
img {
  height: 100%;
  object-fit: cover;
  position: absolute;
  width: 100%;
}
</style>
