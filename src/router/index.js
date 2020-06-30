import Vue from 'vue'
import VueRouter from 'vue-router'
import useVant from '../views/Vant/useVant.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/useVant',
    component: useVant
  }
]

const router = new VueRouter({
  routes
})

export default router
