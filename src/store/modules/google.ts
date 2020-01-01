import { ActionTree, GetterTree, Module, MutationTree } from 'vuex'
import { State } from '@/store'

export interface GoogleState {
  isSignedIn: boolean|null
}

const state: GoogleState = {
  isSignedIn: null
}

const getters: GetterTree<GoogleState, State> = {}

const actions: ActionTree<GoogleState, State> = {
  signIn ({ commit }, isSignedIn) {
    commit('signIn', isSignedIn)
  }
}

const mutations: MutationTree<GoogleState> = {
  signIn (state, isSignedIn) {
    state.isSignedIn = isSignedIn
  }
}

const module: Module<GoogleState, State> = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

export default module
