import Vue from 'vue'
import VueRouter from 'vue-router'
import useVant from '../views/Vant/useVant.vue'
import login from '../views/login/login.vue'
import home from '../views/home/home.vue'
import index from '../views/home/index/index.vue'
import question from '../views/home/question/question.vue'
import video from '../views/home/video/video.vue'
import my from '../views/home/my/my.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: login
  },
  {
    path: '/useVant',
    component: useVant
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
      { path: '/question', component: question },
      { path: '/video', component: video },
      { path: '/my', component: my }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
