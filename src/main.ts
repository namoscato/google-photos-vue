import Vue from 'vue'
import VueGApi from 'vue-gapi'
import App from '@/App.vue'

Vue.config.productionTip = false

Vue.use(VueGApi, {
  discoveryDocs: ['https://photoslibrary.googleapis.com/$discovery/rest?version=v1'],
  clientId: '643157340864-6dlup4og9711115j4phha6meqp02hd6b.apps.googleusercontent.com',
  scope: 'https://www.googleapis.com/auth/photoslibrary.readonly'
})

new Vue({
  render: h => h(App)
}).$mount('#app')
