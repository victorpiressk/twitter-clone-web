import type {
  BackendHashtag,
  BackendTrendingHashtag
} from '../../../types/contracts/dtos'
import type { Hashtag, TrendingHashtag } from '../../../types/domain/models'

// ============================================
// HASHTAG NORMAL
// ============================================

export const transformHashtag = (backendHashtag: BackendHashtag): Hashtag => ({
  id: backendHashtag.id,
  name: backendHashtag.name,
  slug: backendHashtag.slug,
  postsCount: backendHashtag.posts_count,
  createdAt: backendHashtag.created_at
})

// ============================================
// TRENDING HASHTAG
// ============================================

export const transformTrendingHashtag = (
  backendHashtag: BackendTrendingHashtag,
  index?: number
): TrendingHashtag => ({
  id: backendHashtag.id,
  name: backendHashtag.name,
  slug: backendHashtag.slug,
  postsCount: backendHashtag.posts_count,
  createdAt: backendHashtag.created_at,
  recentPostsCount: backendHashtag.recent_posts_count,
  rank: index !== undefined ? index + 1 : undefined // rank = posição + 1
})
