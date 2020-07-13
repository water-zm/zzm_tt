import instance from '../utils/myhttp'

// 推荐频道文章
export function apiGetComment ({ artId, offset, limit }) {
  return instance({
    url: '/app/v1_0/comments',
    params: {
      type: 'a',
      source: artId,
      offset: offset,
      limit: limit
    }
  })
}
