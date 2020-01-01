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
import { Component, Vue } from 'vue-property-decorator'
import { createNamespacedHelpers } from 'vuex'

const { mapState } = createNamespacedHelpers('photos')

@Component({
  computed: mapState([
    'isSignedIn'
  ])
})
export default class Login extends Vue {
  readonly isSignedIn!: boolean|null;

  login () {
    this.$gapi.login(function () {})
  }

  logout () {
    this.$gapi.logout(function () {})
  }
}
</script>
