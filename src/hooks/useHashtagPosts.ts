import { useEffect, useCallback, useRef } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import {
  useSearchHashtagsQuery,
  useGetHashtagPostsQuery
} from '../store/slices/api/hashtags.api'
import {
  setHashtagFeedPosts,
  clearHashtagFeed,
  selectHashtagFeedPosts
} from '../store/slices/posts/postsSlice'

// ============================================
// TYPES
// ============================================

type UseHashtagPostsOptions = {
  hashtagName: string
}

// ============================================
// HOOK
// ============================================

export const useHashtagPosts = (options: UseHashtagPostsOptions) => {
  const { hashtagName } = options

  // ============================================
  // DEPENDENCIES
  // ============================================

  const dispatch = useAppDispatch()
  const feedPosts = useAppSelector(selectHashtagFeedPosts)

  // ============================================
  // REFS
  // ============================================

  const isInitializedRef = useRef(false)
  const activeHashtagRef = useRef<string | undefined>(undefined)

  // ============================================
  // QUERIES
  // ============================================

  // Passo 1: Busca hashtag por nome
  const { data: searchResults, isLoading: loadingSearch } =
    useSearchHashtagsQuery(hashtagName, { skip: !hashtagName })

  // Busca hashtag exata (case-insensitive)
  const hashtag = searchResults?.find(
    (h) => h.name.toLowerCase() === hashtagName.toLowerCase()
  )
  const hashtagId = hashtag?.id

  // Passo 2: Busca posts da hashtag
  const {
    data,
    isLoading: isLoadingQuery,
    isFetching,
    refetch
  } = useGetHashtagPostsQuery(
    { id: hashtagId || 0, params: {} },
    { skip: !hashtagId }
  )

  // ============================================
  // EFFECTS
  // ============================================

  // Limpa o feed imediatamente ao trocar de hashtag
  useEffect(() => {
    if (activeHashtagRef.current !== hashtagName) {
      dispatch(clearHashtagFeed())
      isInitializedRef.current = false
      activeHashtagRef.current = hashtagName
    }
  }, [hashtagName, dispatch])

  // Sincroniza posts apenas se for a hashtag ativa
  useEffect(() => {
    if (
      data &&
      !isInitializedRef.current &&
      !isFetching &&
      !isLoadingQuery &&
      activeHashtagRef.current === hashtagName
    ) {
      dispatch(
        setHashtagFeedPosts({
          posts: data,
          cursor: null,
          hasMore: false
        })
      )
      isInitializedRef.current = true
    }
  }, [data, hashtagName, isFetching, isLoadingQuery, dispatch])

  // ============================================
  // HANDLERS
  // ============================================

  // Paginação não suportada pelo endpoint /hashtags/:id/posts/
  const loadMore = useCallback(() => {}, [])

  const refresh = useCallback(async () => {
    dispatch(clearHashtagFeed())
    isInitializedRef.current = false
    await refetch()
  }, [dispatch, refetch])

  const clear = useCallback(() => {
    dispatch(clearHashtagFeed())
    isInitializedRef.current = false
  }, [dispatch])

  // ============================================
  // RETURN
  // ============================================

  return {
    posts: feedPosts,
    hashtag,
    isLoading: loadingSearch || isLoadingQuery,
    isFetching,
    hasMore: false,
    cursor: null,
    loadMore,
    refresh,
    refetch,
    clear
  }
}
