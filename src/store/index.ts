import Vue from 'vue'
import Vuex, { StoreOptions } from 'vuex'
import photos, { PhotosState } from '@/store/modules/photos'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

export interface State {
  photos: PhotosState
}

const debug = process.env.NODE_ENV !== 'production'

const store: StoreOptions<State> = {
  modules: {
    photos
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
}

export default new Vuex.Store<State>(store)
