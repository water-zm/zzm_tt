import Vue from 'vue'
import router from '../router/index'
import store from '../store/index'
import { Toast } from 'vant'
Vue.use(Toast)

const pluginObj = {}

pluginObj.install = function (Vue) {
  Vue.prototype.$login = function (msg) {
    const token = store.state.userInfo.token
    if (!token) {
      Toast(msg)
      router.push('/checkLogin')
      return false
    }
    return true
  }
}

export default pluginObj
