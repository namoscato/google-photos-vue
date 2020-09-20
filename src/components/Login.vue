<template>
  <span>
    <button
      @click="logout()"
      type="button"
      v-if="isSignedIn">
      Logout
    </button>
    <button
      :disabled="isSignedIn === null"
      @click="login()"
      type="button"
      v-if="!isSignedIn">
      Login
    </button>
  </span>
</template>

<script lang="ts">
import { createNamespacedHelpers } from 'vuex';
import { Options, Vue } from "vue-class-component";

const { mapState } = createNamespacedHelpers('photos')

@Options({
  computed: mapState([
    'isSignedIn'
  ])
})
export default class Login extends Vue {
  readonly isSignedIn!: boolean|null;

  login () {
    // this.$gapi.login()
  }

  logout () {
    // this.$gapi.logout()
  }
}
</script>
