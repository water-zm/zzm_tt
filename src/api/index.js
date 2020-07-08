import instance from '../utils/myhttp'

// 用户频道
export function apiGetChannels () {
  return instance({
    url: '/app/v1_0/user/channels'
  })
}
// 所有频道数据
export function apiGetAllChannel () {
  return instance({
    url: '/app/v1_0/channels'
  })
}

// 修改用户频道数据
export function processChannel (channels) {
  return instance({
    url: '/app/v1_0/user/channels',
    method: 'PUT',
    data: {
      channels: channels
    }
  })
}
