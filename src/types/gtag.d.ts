import Vue from 'vue'

interface GTag {
  event: (action: string, parameters?: object) => void
}

declare module 'vue/types/vue' {
  interface Vue {
    $gtag: GTag
  }
}
