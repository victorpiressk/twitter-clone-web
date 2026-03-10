export type Hashtag = {
  id: number
  name: string
  slug: string
  postsCount: number
  createdAt: string
}

// Para trending hashtags (endpoint /trending/)
export type TrendingHashtag = Hashtag & {
  recentPostsCount: number
  rank?: number
}
