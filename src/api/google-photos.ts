import { GApi } from '@/types/gapi'
import Album = gapi.client.photoslibrary.Album;
import SearchMediaItemsResponse = gapi.client.photoslibrary.SearchMediaItemsResponse;

export class GooglePhotos {
  private gapi!: GApi;

  initialize (gapi: GApi) {
    this.gapi = gapi

    return this
  }

  getAlbum (albumId: string) {
    return this.handle<Album|null>(
      function (client) {
        return client.albums.get({ albumId }).then(function (response) {
          return response.result
        })
      },
      null
    )
  }

  listAlbums () {
    return this.handle<Album[]>(
      (client) => {
        return client.albums.list({}).then(function (response) {
          return response.result.albums!
        })
      },
      []
    )
  }

  searchMediaItems (albumId: string, pageToken?: string) {
    return this.handle<SearchMediaItemsResponse>(function (client) {
      return client.mediaItems.search({
        resource: {
          albumId,
          pageSize: 100,
          pageToken
        }
      }).then(function (response) {
        return response.result
      })
    })
  }

  /**
   * Handles Google API client calls
   *
   * @param callback invoked with Google Photos client when user is signed in
   * @param defaultResponse return value when user is not signed in
   */
  private handle<T> (callback: (client: typeof gapi.client.photoslibrary) => PromiseLike<T>, defaultResponse?: T) {
    return this.gapi.getGapiClient().then((gapi) => {
      return this.gapi.isSignedIn().then(function (isSignedIn) {
        return isSignedIn ? callback(gapi.client.photoslibrary) : defaultResponse!
      })
    })
  }
}

const googlePhotos = new GooglePhotos()
export default googlePhotos
