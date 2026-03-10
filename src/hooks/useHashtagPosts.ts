// src/hooks/useHashtagPosts.ts - CORREÇÃO FINAL

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
  const dispatch = useAppDispatch()

  const feedPosts = useAppSelector(selectHashtagFeedPosts)

  const isInitializedRef = useRef(false)
  const activeHashtagRef = useRef<string | undefined>(undefined)

  // ✅ Limpa feed IMEDIATAMENTE ao trocar de hashtag
  useEffect(() => {
    if (activeHashtagRef.current !== hashtagName) {
      dispatch(clearHashtagFeed())
      isInitializedRef.current = false
      activeHashtagRef.current = hashtagName
    }
  }, [hashtagName, dispatch])

  // PASSO 1: Buscar hashtag por NOME
  const { data: searchResults, isLoading: loadingSearch } =
    useSearchHashtagsQuery(hashtagName, { skip: !hashtagName })

  // ✅ Buscar hashtag EXATA (case-insensitive)
  const hashtag = searchResults?.find(
    (h) => h.name.toLowerCase() === hashtagName.toLowerCase()
  )

  const hashtagId = hashtag?.id

  // PASSO 2: Buscar posts
  const {
    data,
    isLoading: isLoadingQuery,
    isFetching,
    refetch
  } = useGetHashtagPostsQuery(
    { id: hashtagId || 0, params: {} },
    { skip: !hashtagId }
  )

  // ✅ Sincroniza APENAS se for a hashtag ativa
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

  const loadMore = useCallback(() => {
    console.log('Endpoint /hashtags/:id/posts/ não suporta paginação')
  }, [])

  const refresh = useCallback(async () => {
    dispatch(clearHashtagFeed())
    isInitializedRef.current = false
    await refetch()
  }, [dispatch, refetch])

  const clear = useCallback(() => {
    dispatch(clearHashtagFeed())
    isInitializedRef.current = false
  }, [dispatch])

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
