import { createLogger, createStore, StoreOptions } from 'vuex';
import photos, { PhotosState } from '@/store/modules/photos';

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

export default createStore(store);
