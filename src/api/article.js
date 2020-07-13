import instance from '../utils/myhttp'

// 推荐频道文章
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

// 对文章不感兴趣
export function apiDisLikes (target) {
  return instance({
    url: '/app/v1_0/article/dislikes',
    method: 'POST',
    data: {
      target: target
    }
  })
}

// 举报文章
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

// 获取文章详情
export function apiGetArticles (artId) {
  return instance({
    url: `/app/v1_0/articles/${artId}`
  })
}

// 对文章点赞
export function apiLikings (artId) {
  return instance({
    url: '/app/v1_0/article/likings',
    method: 'POST',
    data: {
      target: artId
    }
  })
}

// 取消对文章点赞
export function apiDisLikings (artId) {
  return instance({
    url: `/app/v1_0/article/likings/${artId}`,
    method: 'DELETE'
  })
}

// 对文章不喜欢
export function apiDisLike (artId) {
  return instance({
    url: '/app/v1_0/article/dislikes',
    method: 'POST',
    data: {
      target: artId
    }
  })
}

// 取消对文章不喜欢
export function apiLike (artId) {
  return instance({
    url: `/app/v1_0/article/dislikes/${artId}`,
    method: 'DELETE'
  })
}
