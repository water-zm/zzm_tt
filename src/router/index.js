import Vue from 'vue'
import VueRouter from 'vue-router'
import useVant from '../views/Vant/useVant.vue'
import login from '../views/login/login.vue'
import home from '../views/home/home.vue'
import index from '../views/home/index/index.vue'
import search from '../views/home/search/search.vue'
import my from '../views/home/my/my.vue'
import searchResult from '../views/searchResult/searchResult.vue'
import detail from '../views/detail/detail.vue'
import info from '../views/info/info.vue'
import robot from '../views/robot/robot.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/useVant',
    component: useVant
  },
  {
    path: '/checkLogin',
    component: login
  },
  {
    path: '/login',
    component: login
  },
  {
    path: '/home',
    component: home,
    redirect: '/index',
    children: [
      { path: '/index', component: index },
      { path: '/search', component: search },
      { path: '/my', component: my }
    ]
  },
  {
    path: '/searchResult/:key',
    component: searchResult
  },
  {
    path: '/detail/:artid',
    component: detail
  },
  {
    path: '/info',
    component: info
  },
  {
    path: '/robot',
    component: robot
  }
]

const router = new VueRouter({
  routes
})

export default router
