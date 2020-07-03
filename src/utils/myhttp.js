import axios from 'axios'
import store from '@/store/index.js'

const instance = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn'
})

instance.interceptors.request.use(function (config) {
  const token = store.state.userInfo.token
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
}, function (error) {
  return Promise.reject(error)
})

instance.interceptors.response.use(function (response) {
  return response
}, function (error) {
  return Promise.reject(error)
})

export default instance
