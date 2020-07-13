import instance from '../utils/myhttp'

// 添加评论
export function apiAddComment ({ artId, content }) {
  return instance({
    url: '/app/v1_0/comments',
    method: 'POST',
    data: {
      target: artId,
      content: content
    }
  })
}

// 添加评论回复
export function apiAddReply ({ comId, content, artId }) {
  return instance({
    url: '/app/v1_0/comments',
    method: 'POST',
    data: {
      target: comId,
      content: content,
      art_id: artId
    }
  })
}

// 获取评论
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

// 获取评论回复
export function apiGetReply ({ comId, offset, limit }) {
  return instance({
    url: '/app/v1_0/comments',
    params: {
      type: 'c',
      source: comId,
      offset: offset,
      limit: limit
    }
  })
}

// 对评论或评论回复点赞
export function apiLikingsComm (comId) {
  return instance({
    url: '/app/v1_0/comment/likings',
    method: 'POST',
    data: {
      target: comId
    }
  })
}

// 取消对评论或评论回复点赞
export function apiUnLikingsComm (comId) {
  return instance({
    url: `/app/v1_0/comment/likings/${comId}`,
    method: 'DELETE'
  })
}
