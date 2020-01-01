import { ActionTree, Commit, Module, MutationTree } from 'vuex'
import { State } from '@/store'
import googlePhotos from '@/api/google-photos'
import Album = gapi.client.photoslibrary.Album;
import MediaItem = gapi.client.photoslibrary.MediaItem;

export interface PhotosState {
  album: Album|null
  albums: Album[]
  isSignedIn: boolean|null
  mediaItems: MediaItem[]
}

const state: PhotosState = {
  album: null,
  albums: [],
  isSignedIn: null,
  mediaItems: []
}

const actions: ActionTree<PhotosState, State> = {
  getAlbum ({ commit, state }, albumId?: string) {
    if (!albumId) {
      return commit('setAlbum', null)
    }

    return new Promise(function (resolve) {
      const album = state.albums.find(function (album) {
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
  listAlbums ({ commit }) {
    commit('setAlbums', [])

    return googlePhotos.listAlbums().then(function (albums) {
      commit('setAlbums', albums)
    })
  },
  signIn ({ commit }, isSignedIn) {
    commit('setIsSignedIn', isSignedIn)
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

const mutations: MutationTree<PhotosState> = {
  setAlbums (state, albums) {
    state.albums = albums
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
  },
  setIsSignedIn (state, isSignedIn) {
    state.isSignedIn = isSignedIn

    if (!isSignedIn) {
      state.album = null
      state.albums = []
      state.mediaItems = []
    }
  }
}

const module: Module<PhotosState, State> = {
  namespaced: true,
  state,
  actions,
  mutations
}

export default module
