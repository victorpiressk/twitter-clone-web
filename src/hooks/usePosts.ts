import { useEffect, useCallback, useRef, useMemo } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import {
  useGetPostsQuery,
  useGetFeedQuery,
  useGetPostRepliesQuery,
  type GetPostsParams
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

export type PostsType =
  | 'forYou' // /api/posts/ (todos)
  | 'following' // /api/posts/feed/ (seguindo)
  | 'replies' // /api/posts/{id}/replies/ (comentários)
  | 'profile'

type UsePostsOptions = {
  type: PostsType
  postId?: number // Obrigatório quando type='replies'
  params?: GetPostsParams
}

type BackendPaginatedResponse = {
  count: number
  next: string | null
  previous: string | null
  results: BackendPostWithInteractions[]
}

// ============================================
// HOOK
// ============================================

export const usePosts = (options: UsePostsOptions) => {
  const { type, postId } = options

  // ============================================
  // DEPENDENCIES
  // ============================================

  const dispatch = useAppDispatch()

  // ============================================
  // SELECTORS
  // ============================================

  const feedPosts = useAppSelector((state) => {
    if (type === 'replies') return selectRawFeedPosts(state)
    if (type === 'following') return selectFollowingFeedPosts(state)
    if (type === 'profile') return selectRawFeedPosts(state)
    return selectFeedPosts(state)
  })
  const hasMore = useAppSelector(selectFeedHasMore)
  const cursor = useAppSelector(selectFeedCursor)
  const isLoadingRedux = useAppSelector(selectFeedLoading)

  // ============================================
  // REFS
  // ============================================

  const isInitializedRef = useRef(false)
  const isFetchingRef = useRef(false)
  const activeTypeRef = useRef<string | undefined>(undefined)

  // ============================================
  // QUERIES
  // ============================================

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
    { skip: type !== 'replies' || !postId }
  )

  const {
    data: profilePostsData,
    isLoading: isLoadingProfile,
    isFetching: isFetchingProfile,
    refetch: refetchProfile
  } = useGetPostsQuery(options.params || {}, {
    skip: type !== 'profile'
  })

  // ============================================
  // COMPUTED
  // ============================================

  const data =
    type === 'forYou'
      ? allPostsData
      : type === 'following'
        ? followingPostsData
        : type === 'replies'
          ? repliesData
          : type === 'profile'
            ? profilePostsData
            : undefined

  const isLoadingQuery =
    type === 'forYou'
      ? isLoadingAll
      : type === 'following'
        ? isLoadingFollowing
        : type === 'replies'
          ? isLoadingReplies
          : type === 'profile'
            ? isLoadingProfile
            : false

  const isFetching =
    type === 'forYou'
      ? isFetchingAll
      : type === 'following'
        ? isFetchingFollowing
        : type === 'replies'
          ? isFetchingReplies
          : type === 'profile'
            ? isFetchingProfile
            : false

  const refetch = useMemo(() => {
    switch (type) {
      case 'forYou':
        return refetchAll
      case 'following':
        return refetchFollowing
      case 'replies':
        return refetchReplies
      case 'profile':
        return refetchProfile
      default:
        return () => Promise.resolve()
    }
  }, [type, refetchAll, refetchFollowing, refetchReplies, refetchProfile])

  const activeKey = useMemo(
    () =>
      type === 'replies'
        ? `replies-${postId}`
        : type === 'profile'
          ? `profile-${JSON.stringify(options.params)}`
          : type,
    [type, postId, options.params]
  )

  // ============================================
  // EFFECTS
  // ============================================

  // Limpa feed ao trocar de tipo
  useEffect(() => {
    activeTypeRef.current = activeKey
    dispatch(clearFeed())
    isInitializedRef.current = false
  }, [activeKey, dispatch])

  // Sincroniza posts com Redux
  useEffect(() => {
    if (
      data &&
      !isInitializedRef.current &&
      !isFetching &&
      !isLoadingQuery &&
      activeTypeRef.current === activeKey
    ) {
      const posts =
        type === 'replies' ? [...data.results].reverse() : data.results
      dispatch(setFeedPosts({ posts, cursor: data.next, hasMore: !!data.next }))
      isInitializedRef.current = true
    }
  }, [data, activeKey, type, isFetching, isLoadingQuery, dispatch])

  // ============================================
  // HANDLERS
  // ============================================

  const loadMore = useCallback(async () => {
    if (
      !hasMore ||
      !cursor ||
      isFetchingRef.current ||
      isFetching ||
      isLoadingRedux
    )
      return

    isFetchingRef.current = true

    try {
      const response = await fetch(cursor)
      const backendData: BackendPaginatedResponse = await response.json()

      const transformedPosts = backendData.results.map(
        transformPostWithInteractions
      )

      const posts =
        type === 'replies' ? [...transformedPosts].reverse() : transformedPosts

      dispatch(
        appendFeedPosts({
          posts,
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

  const refresh = useCallback(async () => {
    dispatch(clearFeed())
    isInitializedRef.current = false
    await refetch()
  }, [dispatch, refetch])

  const clear = useCallback(() => {
    dispatch(clearFeed())
    isInitializedRef.current = false
  }, [dispatch])

  // ============================================
  // RETURN
  // ============================================

  return {
    posts: feedPosts,
    isLoading: isLoadingQuery,
    isFetching,
    hasMore,
    cursor,
    loadMore,
    refresh,
    refetch,
    clear
  }
}
