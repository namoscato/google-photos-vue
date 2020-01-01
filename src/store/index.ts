import Vue from 'vue'
import Vuex, { StoreOptions } from 'vuex'
import albums from '@/store/modules/albums'
import google, { GoogleState } from '@/store/modules/google'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

export interface State {
  albums: any,
  google: GoogleState
}

const debug = process.env.NODE_ENV !== 'production'

const store: StoreOptions<State> = {
  modules: {
    albums,
    google
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
}

export default new Vuex.Store<State>(store)
