import instance from '../utils/myhttp'

export function toLogin (data) {
  return instance({
    url: '/app/v1_0/authorizations',
    method: 'POST',
    data
  })
}
