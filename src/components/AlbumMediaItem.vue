<template>
  <li
    :class="['is-' + format]"
    :title="description">
    <a @click="view()">
      <AlbumMediaItemImage
        :description-theme="descriptionTheme"
        :media-item="mediaItem"
        v-if="'photo' === format"
      />
      <AlbumMediaItemText
        :description-theme="descriptionTheme"
        v-else
      />
    </a>
  </li>
</template>

<script lang="ts">
import { AlbumFormat } from '@/components/types';
import AlbumMediaItemImage from '@/components/AlbumMediaItemImage.vue';
import AlbumMediaItemText from '@/components/AlbumMediaItemText.vue';
import { createNamespacedHelpers } from 'vuex';
import { Options, props } from "vue-class-component";
import { PropType } from 'vue';
import MediaItem = gapi.client.photoslibrary.MediaItem;

const { mapActions } = createNamespacedHelpers('photos')

const Props = props({
  mediaItem: {
    type: Object as PropType<MediaItem>,
    required: true
  },
  format: {
    type: Object as PropType<AlbumFormat>,
    required: true
  }
});

@Options({
  components: { AlbumMediaItemText, AlbumMediaItemImage },
  methods: mapActions([
    'viewMediaItem'
  ])
})
export default class AlbumMediaItem extends Props {
  descriptionTheme: string = '';
  viewMediaItem!: (mediaItem: MediaItem|null) => void;

  get description () {
    const description = this.mediaItem.description

    return description ? description.trim() : ''
  }

  created () {
    if (this.description) {
      this.descriptionTheme = `${this.extractDescriptionTheme(this.description)} `
    } else {
      console.warn('Media item does not have description', this.mediaItem)
    }
  }

  view () {
    this.viewMediaItem(this.mediaItem)

    // if (typeof this.$gtag !== 'undefined') {
    //   this.$gtag.event('Click', { event_category: this.format, event_label: this.descriptionTheme })
    // }
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
li.is-photo {
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

li > a {
  cursor: pointer;
}

@media screen and (min-width: 20em) {
  li.is-text {
    font-size: 2em;
  }
}

@media screen and (min-width: 30em) {
  li.is-photo {
    padding-bottom: 20%;
    width: 20%;
  }
}

@media screen and (min-width: 40em) {
  li.is-photo {
    padding-bottom: 16.666666667%;
    width: 16.666666667%;
  }

  li.is-text {
    font-size: 2.5em;
  }
}

@media screen and (min-width: 50em) {
  li.is-photo {
    padding-bottom: 12.5%;
    width: 12.5%;
  }
}

@media screen and (min-width: 60em) {
  li.is-photo {
    padding-bottom: 10%;
    width: 10%;
  }

  li.is-text {
    font-size: 3em;
  }
}

@media screen and (min-width: 70em) {
  li.is-photo {
    padding-bottom: 8.3333333333%;
    width: 8.3333333333%;
  }
}

@media screen and (min-width: 91em) {
  li.is-photo {
    padding-bottom: 6.666666666666667%;
    width: 6.666666666666667%;
  }
}
</style>
