import instance from '../utils/myhttp'

export function apiGetArticleList (id) {
  return instance({
    url: '/app/v1_1/articles',
    params: {
      channel_id: id,
      timestamp: Date.now(),
      with_top: 0
    }
  })
}
