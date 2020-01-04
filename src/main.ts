import Vue from 'vue'
import VueGApi from 'vue-gapi'
import store from '@/store'
import App from '@/components/App.vue'
import googlePhotos from '@/api/google-photos'
import VueGtag from 'vue-gtag'

Vue.config.productionTip = false

const elementId = 'app'
const externalStatePath = document.getElementById(elementId)!.dataset.externalStatePath

if (externalStatePath) {
  fetch(externalStatePath).then((response) => {
    return response.json().then(store.replaceState.bind(store))
  })
} else {
  Vue.use(VueGApi, {
    discoveryDocs: ['https://photoslibrary.googleapis.com/$discovery/rest?version=v1'],
    clientId: '643157340864-6dlup4og9711115j4phha6meqp02hd6b.apps.googleusercontent.com',
    scope: 'https://www.googleapis.com/auth/photoslibrary.readonly'
  })
}

Vue.use(VueGtag, {
  config: { id: 'UA-17188743-25' }
})

new Vue({
  created () {
    googlePhotos.initialize(this.$gapi) // TODO figure out a better way to do this
  },
  render: h => h(App, {
    props: {
      externalStatePath
    }
  }),
  store
}).$mount(`#${elementId}`)
