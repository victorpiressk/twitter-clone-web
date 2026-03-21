import { useMemo } from 'react'
import {
  useGetHashtagsQuery,
  useSearchHashtagsQuery,
  useGetTrendingHashtagsQuery
} from '../store/slices/api/hashtags.api'
import type {
  PaginationParams,
  PeriodLimitParams
} from '../types/contracts/shared'
import type { Hashtag, TrendingHashtag } from '../types/domain/models'

// ============================================
// TYPES
// ============================================

type UseHashtagsMode =
  | { mode: 'all'; params?: PaginationParams }
  | { mode: 'trending'; params?: PeriodLimitParams }
  | { mode: 'search'; query: string }

type UseHashtagsReturnAll = {
  hashtags: Hashtag[]
  count: number
  isLoading: boolean
  isFetching: boolean
  hasMore: boolean
}

type UseHashtagsReturnTrending = {
  hashtags: TrendingHashtag[]
  isLoading: boolean
  isFetching: boolean
}

type UseHashtagsReturnSearch = {
  hashtags: Hashtag[]
  isLoading: boolean
  isFetching: boolean
}

// ============================================
// OVERLOADS
// ============================================

export function useHashtags(config: {
  mode: 'all'
  params?: PaginationParams
}): UseHashtagsReturnAll

export function useHashtags(config: {
  mode: 'trending'
  params?: PeriodLimitParams
}): UseHashtagsReturnTrending

export function useHashtags(config: {
  mode: 'search'
  query: string
}): UseHashtagsReturnSearch

// ============================================
// HOOK
// ============================================

export function useHashtags(config: UseHashtagsMode) {
  // ============================================
  // QUERIES
  // ============================================

  const {
    data: allHashtagsData,
    isLoading: loadingAll,
    isFetching: fetchingAll
  } = useGetHashtagsQuery(
    config.mode === 'all' ? config.params || {} : undefined,
    { skip: config.mode !== 'all' }
  )

  const {
    data: trendingHashtagsData,
    isLoading: loadingTrending,
    isFetching: fetchingTrending
  } = useGetTrendingHashtagsQuery(
    config.mode === 'trending'
      ? config.params || { period: 'week', limit: 30 }
      : undefined,
    { skip: config.mode !== 'trending' }
  )

  const {
    data: searchHashtagsData,
    isLoading: loadingSearch,
    isFetching: fetchingSearch
  } = useSearchHashtagsQuery(config.mode === 'search' ? config.query : '', {
    skip: config.mode !== 'search' || !config.query
  })

  // ============================================
  // COMPUTED
  // ============================================

  const hasMoreAll = useMemo(() => {
    return config.mode === 'all' ? allHashtagsData?.next !== null : false
  }, [config.mode, allHashtagsData])

  // ============================================
  // RETURN
  // ============================================

  if (config.mode === 'all') {
    return {
      hashtags: allHashtagsData?.results || [],
      count: allHashtagsData?.count || 0,
      isLoading: loadingAll,
      isFetching: fetchingAll,
      hasMore: hasMoreAll
    }
  }

  if (config.mode === 'trending') {
    return {
      hashtags: trendingHashtagsData || [],
      isLoading: loadingTrending,
      isFetching: fetchingTrending
    }
  }

  if (config.mode === 'search') {
    return {
      hashtags: searchHashtagsData || [],
      isLoading: loadingSearch,
      isFetching: fetchingSearch
    }
  }

  // Fallback — TypeScript garante que nunca chegará aqui
  return {
    isLoading: false,
    isFetching: false
  } as never
}
