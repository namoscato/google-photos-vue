import Vue from 'vue'

interface GApi {
  getGapiClient: () => Promise<typeof gapi>
  isSignedIn: () => Promise<boolean>
  listenUserSignIn: (callback: (isSignedIn: boolean) => void) => Promise<boolean>
  login: (callback?: Function) => Promise<void>
  logout: (callback?: Function) => Promise<void>
}

declare module 'vue/types/vue' {
  interface Vue {
    $gapi: GApi
  }
}
