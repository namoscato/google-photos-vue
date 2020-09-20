import Vue, { createApp, h } from 'vue';
import VueGApi from 'vue-gapi'
import store from '@/store'
import App from '@/components/App.vue'
import googlePhotos from '@/api/google-photos'
import VueGtag from 'vue-gtag'

/**
 * Google OAuth 2.0 Client ID
 *
 * @see https://support.google.com/googleapi/answer/6158849
 */
const GOOGLE_OAUTH2_CLIENT_ID = 'TODO'

/**
 * Optional Google Analytics ID
 *
 * @see https://support.google.com/analytics/answer/1008080
 */
const GOOGLE_ANALYTICS_ID = null

const elementId = 'app'
const externalStatePath = document.getElementById(elementId)!.dataset.externalStatePath

if (externalStatePath) {
  fetch(externalStatePath).then((response) => {
    return response.json().then(store.replaceState.bind(store))
  })
} else {
  // Vue.use(VueGApi, {
  //   discoveryDocs: ['https://photoslibrary.googleapis.com/$discovery/rest?version=v1'],
  //   clientId: GOOGLE_OAUTH2_CLIENT_ID,
  //   scope: 'https://www.googleapis.com/auth/photoslibrary.readonly'
  // })
}

// noinspection PointlessBooleanExpressionJS
if (GOOGLE_ANALYTICS_ID) {
  // Vue.use(VueGtag, {
  //   config: { id: GOOGLE_ANALYTICS_ID }
  // })
}

const app = createApp(App, {
  created() {
    console.log('init')
    // googlePhotos.initialize(this.$gapi)
  },
  props: {
    externalStatePath
  }
});

app.use(store);
app.mount(`#${elementId}`);

