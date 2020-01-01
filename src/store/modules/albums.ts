import { ActionTree, Commit, GetterTree, Module, MutationTree } from 'vuex'
import { State } from '@/store'
import googlePhotos from '@/api/google-photos'
import Album = gapi.client.photoslibrary.Album;
import MediaItem = gapi.client.photoslibrary.MediaItem;

export interface AlbumsState {
  album: Album|null;
  all: Album[];
  mediaItems: MediaItem[]
}

const state: AlbumsState = {
  album: null,
  all: [],
  mediaItems: []
}

const getters: GetterTree<AlbumsState, State> = {}

const actions: ActionTree<AlbumsState, State> = {
  get ({ commit, state }, albumId?: string) {
    if (!albumId) {
      return commit('setSelected', null)
    }

    return new Promise(function (resolve) {
      const album = state.all.find(function (album) {
        return albumId === album.id
      })

      if (album) {
        resolve(album)
      } else {
        googlePhotos.getAlbum(albumId).then(resolve)
      }
    }).then(function (album) {
      commit('setAlbum', album)

      searchMediaItems(commit, albumId)
    })
  },
  list ({ commit }) {
    commit('setAlbums', [])

    return googlePhotos.listAlbums().then(function (albums) {
      commit('setAlbums', albums)
    })
  }
}

function searchMediaItems (commit: Commit, albumId: string, pageToken?: string) {
  return googlePhotos.searchMediaItems(albumId, pageToken).then(function (response) {
    commit(pageToken ? 'addMediaItems' : 'setMediaItems', response.mediaItems)

    const nextPageToken = response.nextPageToken

    if (nextPageToken) {
      searchMediaItems(commit, albumId, nextPageToken)
    }
  })
}

const mutations: MutationTree<AlbumsState> = {
  setAlbums (state, albums) {
    state.all = albums
  },
  setAlbum (state, album) {
    state.album = album
    state.mediaItems = []
  },
  setMediaItems (state, mediaItems) {
    state.mediaItems = mediaItems
  },
  addMediaItems (state, mediaItems) {
    state.mediaItems = state.mediaItems.concat(mediaItems)
  }
}

const module: Module<AlbumsState, State> = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

export default module
