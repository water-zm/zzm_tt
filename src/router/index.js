import Vue from 'vue'
import VueRouter from 'vue-router'
import useVant from '../views/Vant/useVant.vue'
import login from '../views/login/login.vue'
import home from '../views/home/home.vue'
import index from '../views/home/index/index.vue'
import search from '../views/home/search/search.vue'
import video from '../views/home/video/video.vue'
import my from '../views/home/my/my.vue'
import searchResult from '../views/searchResult/searchResult.vue'
import detail from '../views/detail/detail.vue'

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
      { path: '/video', component: video },
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
  }
]

const router = new VueRouter({
  routes
})

export default router
