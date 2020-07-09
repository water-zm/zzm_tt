import instance from '../utils/myhttp'

export function apiSuggestion (q) {
  return instance({
    url: '/app/v1_0/suggestion',
    params: {
      q: q
    }
  })
}

export function apiSearchResult ({ page, perpage, key }) {
  return instance({
    url: '/app/v1_0/search',
    params: {
      page: page,
      per_page: perpage,
      q: key
    }
  })
}
