export type BackendHashtag = {
  id: number
  name: string
  slug: string
  posts_count: number
  created_at: string
}

// Response específico de trending hashtags
export type BackendTrendingHashtag = BackendHashtag & {
  recent_posts_count: number
}

// Response do endpoint /trending/
export type BackendTrendingHashtagsResponse = {
  meta: {
    period: 'today' | 'week' | 'month' | 'all'
    limit: number
    total: number
    generated_at: string
  }
  results: BackendTrendingHashtag[]
}
