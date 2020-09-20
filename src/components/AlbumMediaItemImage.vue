<template>
  <img
    :alt="descriptionTheme"
    :src="mediaItem.baseUrl"
    :style="{ 'background-color': backgroundColor }">
</template>

<script lang="ts">
import { getRandomColor } from '@/utils';
import { props } from "vue-class-component";
import { PropType } from 'vue';
import MediaItem = gapi.client.photoslibrary.MediaItem;

const BACKGROUND_COLOR = '#202124'
const BACKGROUND_COLOR_DELTA = 0.1

const Props = props({
  descriptionTheme: {
    type: String,
    required: true
  },
  mediaItem: {
    type: Object as PropType<MediaItem>,
    required: true
  }
});

export default class AlbumMediaItemImage extends Props {
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
