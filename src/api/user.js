import instance from '../utils/myhttp'

// 登录
export function toLogin (data) {
  return instance({
    url: '/app/v1_0/authorizations',
    method: 'POST',
    data
  })
}

// 获取用户自己信息
export function apiGetUser () {
  return instance({
    url: '/app/v1_0/user'
  })
}

// 获取用户个人资料
export function apiGetUserProfile () {
  return instance({
    url: '/app/v1_0/user/profile'
  })
}

// 编辑用户个人资料
export function apiUpdateUser ({ name, gender, birthday, intro }) {
  return instance({
    url: '/app/v1_0/user/profile',
    method: 'PATCH',
    data: {
      name: name,
      gender: gender,
      birthday: birthday,
      intro: intro
    }
  })
}

// 编辑用户照片
export function apiUpdatePhoto (photo) {
  const fd = new FormData()
  fd.append('photo', photo)
  return instance({
    url: '/app/v1_0/user/photo',
    method: 'PATCH',
    data: fd
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
