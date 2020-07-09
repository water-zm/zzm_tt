import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant, { Lazyload } from 'vant'
import 'vant/lib/index.css'
import './style/index.css'
import '@/filter/timef'
import pluginObj from './utils/myplugin'

Vue.use(Vant)
Vue.use(Lazyload)
Vue.use(pluginObj)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
