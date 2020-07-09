import instance from '../utils/myhttp'

export function apiSuggestion (q) {
  return instance({
    url: '/app/v1_0/suggestion',
    params: {
      q: q
    }
  })
}
