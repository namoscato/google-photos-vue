import Vue from 'vue'

declare module 'vue/types/vue' {
    interface Vue {
        $gapi: {
            getGapiClient: () => Promise<typeof gapi>
            isSignedIn: () => Promise<boolean>
            listenUserSignIn: (callback: (isSignedIn: boolean) => void) => Promise<boolean>
            login: (callback: Function) => Promise<void>
            logout: (callback: Function) => Promise<void>
        }
    }
}
