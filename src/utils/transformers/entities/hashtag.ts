import type { BackendHashtag } from '../../../types/contracts/dtos'
import type { Hashtag, TrendingHashtag } from '../../../types/domain/models'

export const transformHashtag = (backendHashtag: BackendHashtag): Hashtag => ({
  id: backendHashtag.id,
  tag: backendHashtag.tag,
  postsCount: backendHashtag.posts_count,
  isTrending: backendHashtag.is_trending,
  rank: backendHashtag.rank
})

// Helper para garantir que rank existe (para TrendsWidget)
export const transformTrendingHashtag = (
  backendHashtag: BackendHashtag
): TrendingHashtag => {
  const hashtag = transformHashtag(backendHashtag)

  return {
    ...hashtag,
    rank: hashtag.rank ?? 999 // Fallback se não vier rank
  }
}
