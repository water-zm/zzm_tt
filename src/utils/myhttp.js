import axios from 'axios'
import store from '@/store/index.js'
import jsonbigint from 'json-bigint'
import { localSet } from '@/utils/mylocal'

const instance = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn',
  transformResponse: [function (data) {
    return jsonbigint.parse(data)
  }]
})

const instanceToken = axios.create({
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
}, async function (error) {
  console.dir(error)
  if (error.response.status === 401) {
    const refToken = store.state.userInfo.refresh_token
    const res = await instanceToken({
      url: '/app/v1_0/authorizations',
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${refToken}`
      }
    })
    const objToken = {
      token: res.data.data.token,
      refresh_token: refToken
    }
    console.log(res)
    store.commit('setUserInfo', objToken)
    localSet(objToken)
    return instance(error.config)
  }
  return Promise.reject(error)
})

export default instance
