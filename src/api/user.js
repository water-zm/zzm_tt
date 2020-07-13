import instance from '../utils/myhttp'

// 登录
export function toLogin (data) {
  return instance({
    url: '/app/v1_0/authorizations',
    method: 'POST',
    data
  })
}

// 拉黑
export function apiBlackLists (autId) {
  return instance({
    url: '/app/v1_0/user/blacklists',
    method: 'POST',
    data: {
      target: autId
    }
  })
}

// 关注用户
export function apifollow (autId) {
  return instance({
    url: '/app/v1_0/user/followings',
    method: 'POST',
    data: {
      target: autId
    }
  })
}

// 取消关注用户
export function apiunfollow (autId) {
  return instance({
    url: `/app/v1_0/user/followings/${autId}`,
    method: 'DELETE'
  })
}
