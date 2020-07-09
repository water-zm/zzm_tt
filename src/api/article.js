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

export function apiDisLikes (target) {
  return instance({
    url: '/app/v1_0/article/dislikes',
    method: 'POST',
    data: {
      target: target
    }
  })
}

export function apiReports ({ artId, type }) {
  return instance({
    url: '/app/v1_0/article/reports',
    method: 'POST',
    data: {
      target: artId,
      type: type,
      remark: ''
    }
  })
}
