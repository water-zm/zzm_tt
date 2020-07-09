import instance from '../utils/myhttp'

export function toLogin (data) {
  return instance({
    url: '/app/v1_0/authorizations',
    method: 'POST',
    data
  })
}

export function apiBlackLists (autId) {
  return instance({
    url: '/app/v1_0/user/blacklists',
    method: 'POST',
    data: {
      target: autId
    }
  })
}
