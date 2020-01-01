import Vue from 'vue'
import VueGApi from 'vue-gapi'
import store from '@/store'
import App from '@/components/App.vue'
import googlePhotos from '@/api/google-photos'

Vue.config.productionTip = false

Vue.use(VueGApi, {
  discoveryDocs: ['https://photoslibrary.googleapis.com/$discovery/rest?version=v1'],
  clientId: '643157340864-6dlup4og9711115j4phha6meqp02hd6b.apps.googleusercontent.com',
  scope: 'https://www.googleapis.com/auth/photoslibrary.readonly'
})

new Vue({
  created () {
    googlePhotos.initialize(this.$gapi) // TODO figure out a better way to do this
  },
  render: h => h(App),
  store
}).$mount('#app')
