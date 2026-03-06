// src/hooks/usePosts.ts
import { useEffect, useCallback, useRef, useMemo } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import {
  useGetPostsQuery,
  useGetFeedQuery,
  useGetPostRepliesQuery
} from '../store/slices/api/posts'
import {
  setFeedPosts,
  appendFeedPosts,
  clearFeed,
  selectFeedPosts,
  selectFeedHasMore,
  selectFeedLoading,
  selectFeedCursor,
  selectFollowingFeedPosts,
  selectRawFeedPosts
} from '../store/slices/posts/postsSlice'
import { transformPostWithInteractions } from '../utils/transformers/entities'
import type { BackendPostWithInteractions } from '../types/contracts/dtos'

// ============================================
// TYPES
// ============================================

type PostsType =
  | 'forYou' // /api/posts/ (todos)
  | 'following' // /api/posts/feed/ (seguindo)
  | 'replies' // /api/posts/{id}/replies/ (comentários)

type UsePostsOptions = {
  type: PostsType
  postId?: number // Obrigatório quando type='replies'
}

type BackendPaginatedResponse = {
  count: number
  next: string | null
  previous: string | null
  results: BackendPostWithInteractions[] // ✅ TYPE DO BACKEND
}

// ============================================
// HOOK
// ============================================

export const usePosts = (options: UsePostsOptions) => {
  const { type, postId } = options
  const dispatch = useAppDispatch()

  // ✅ Selectors do Redux
  const feedPosts = useAppSelector((state) => {
    if (type === 'replies') return selectRawFeedPosts(state)
    if (type === 'following') return selectFollowingFeedPosts(state)
    return selectFeedPosts(state)
  })
  const hasMore = useAppSelector(selectFeedHasMore)
  const cursor = useAppSelector(selectFeedCursor)
  const isLoadingRedux = useAppSelector(selectFeedLoading)

  // ✅ Refs para controle
  const isInitializedRef = useRef(false)
  const isFetchingRef = useRef(false)
  const activeTypeRef = useRef<string | undefined>(undefined)

  // ✅ Queries condicionais
  const {
    data: allPostsData,
    isLoading: isLoadingAll,
    isFetching: isFetchingAll,
    refetch: refetchAll
  } = useGetPostsQuery(undefined, {
    skip: type !== 'forYou'
  })

  const {
    data: followingPostsData,
    isLoading: isLoadingFollowing,
    isFetching: isFetchingFollowing,
    refetch: refetchFollowing
  } = useGetFeedQuery(undefined, {
    skip: type !== 'following'
  })

  const {
    data: repliesData,
    isLoading: isLoadingReplies,
    isFetching: isFetchingReplies,
    refetch: refetchReplies
  } = useGetPostRepliesQuery(
    { postId: postId! },
    {
      skip: type !== 'replies' || !postId
    }
  )

  // ✅ Seleciona dados baseado no tipo
  const data =
    type === 'forYou'
      ? allPostsData
      : type === 'following'
        ? followingPostsData
        : type === 'replies'
          ? repliesData
          : undefined

  const isLoadingQuery =
    type === 'forYou'
      ? isLoadingAll
      : type === 'following'
        ? isLoadingFollowing
        : type === 'replies'
          ? isLoadingReplies
          : false

  const isFetching =
    type === 'forYou'
      ? isFetchingAll
      : type === 'following'
        ? isFetchingFollowing
        : type === 'replies'
          ? isFetchingReplies
          : false

  const refetch = useMemo(() => {
    switch (type) {
      case 'forYou':
        return refetchAll
      case 'following':
        return refetchFollowing
      case 'replies':
        return refetchReplies
      default:
        return () => Promise.resolve()
    }
  }, [type, refetchAll, refetchFollowing, refetchReplies])

  // ✅ Limpa feed ao trocar de tipo
  useEffect(() => {
    const key = type === 'replies' ? `replies-${postId}` : type
    activeTypeRef.current = key
    dispatch(clearFeed())
    isInitializedRef.current = false
  }, [type, postId, dispatch])

  // ✅ Sincroniza com Redux
  useEffect(() => {
    const key = type === 'replies' ? `replies-${postId}` : type

    console.log('[usePosts] sync effect:', {
      type,
      key,
      activeKey: activeTypeRef.current,
      hasData: !!data,
      resultsLength: data?.results?.length,
      isInitialized: isInitializedRef.current,
      isFetching,
      isLoadingQuery,
      keysMatch: activeTypeRef.current === key
    })

    if (
      data &&
      !isInitializedRef.current &&
      !isFetching &&
      !isLoadingQuery &&
      activeTypeRef.current === key // 👈 garante que o dado é do tipo atual
    ) {
      console.log(
        '[usePosts] dispatching setFeedPosts com',
        data.results.length,
        'posts'
      )
      const posts =
        type === 'replies' ? [...data.results].reverse() : data.results
      dispatch(setFeedPosts({ posts, cursor: data.next, hasMore: !!data.next }))
      isInitializedRef.current = true
    }
  }, [data, type, postId, isFetching, isLoadingQuery, dispatch])

  // ============================================
  // LOAD MORE - ✅ CORRIGIDO COM TRANSFORM
  // ============================================

  const loadMore = useCallback(async () => {
    if (
      !hasMore ||
      !cursor ||
      isFetchingRef.current ||
      isFetching ||
      isLoadingRedux
    ) {
      return
    }

    isFetchingRef.current = true

    try {
      const response = await fetch(cursor)
      const backendData: BackendPaginatedResponse = await response.json()

      // ✅ APLICAR TRANSFORMER ANTES DE DISPATCH
      const transformedPosts = backendData.results.map(
        transformPostWithInteractions
      )

      // Para replies, inverte ordem
      const posts =
        type === 'replies' ? [...transformedPosts].reverse() : transformedPosts

      dispatch(
        appendFeedPosts({
          posts, // ✅ camelCase agora
          cursor: backendData.next,
          hasMore: !!backendData.next
        })
      )
    } catch (error) {
      console.error('Erro ao carregar mais posts:', error)
    } finally {
      isFetchingRef.current = false
    }
  }, [hasMore, cursor, isFetching, isLoadingRedux, type, dispatch])

  // ============================================
  // REFRESH
  // ============================================

  const refresh = useCallback(async () => {
    dispatch(clearFeed())
    isInitializedRef.current = false
    await refetch()
  }, [dispatch, refetch])

  // ============================================
  // CLEAR
  // ============================================

  const clear = useCallback(() => {
    dispatch(clearFeed())
    isInitializedRef.current = false
  }, [dispatch])

  // ============================================
  // RETURN
  // ============================================

  return {
    // Data
    posts: feedPosts,

    // Loading states
    isLoading: isLoadingQuery,
    isFetching,

    // Pagination
    hasMore,
    cursor,

    // Actions
    loadMore,
    refresh,
    refetch,
    clear
  }
}
