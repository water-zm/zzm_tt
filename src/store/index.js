import Vue from 'vue'
import Vuex from 'vuex'
import { localGet } from '@/utils/mylocal'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: localGet() || {}
  },
  mutations: {
    setUserInfo (state, obj) {
      state.userInfo = obj
    }
  },
  actions: {
  },
  modules: {
  }
})
