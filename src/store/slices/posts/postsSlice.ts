import {
  createSlice,
  type PayloadAction,
  createSelector
} from '@reduxjs/toolkit'
import type { PostWithInteractions } from '../../../types/domain/models'
import type { RootState } from '../..'

// ============================================
// STATE TYPE (Normalizado)
// ============================================
type PostsState = {
  // Dados normalizados
  byId: Record<number, PostWithInteractions>
  allIds: number[]

  // Feed
  feed: {
    ids: number[]
    cursor: string | null
    hasMore: boolean
    loading: boolean
  }

  // Feed separado para hashtags
  hashtagFeed: {
    ids: number[]
    cursor: string | null
    hasMore: boolean
    loading: boolean
  }

  // Post detail
  detail: {
    postId: number | null
    threadIds: number[]
    commentIds: number[]
    loading: boolean
  }

  // UI state
  creating: boolean
  error: string | null
}

// ============================================
// INITIAL STATE
// ============================================
const initialState: PostsState = {
  byId: {},
  allIds: [],
  feed: {
    ids: [],
    cursor: null,
    hasMore: true,
    loading: false
  },
  hashtagFeed: {
    ids: [],
    cursor: null,
    hasMore: true,
    loading: false
  },
  detail: {
    postId: null,
    threadIds: [],
    commentIds: [],
    loading: false
  },
  creating: false,
  error: null
}

// ============================================
// SLICE
// ============================================
const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    // ✅ Adiciona/atualiza um post E adiciona ao feed
    upsertPost: (state, action: PayloadAction<PostWithInteractions>) => {
      const post = action.payload
      state.byId[post.id] = {
        ...state.byId[post.id],
        ...post
      }

      if (!state.allIds.includes(post.id)) {
        state.allIds.push(post.id)
      }

      // Adiciona ao topo do feed (posts novos aparecem primeiro)
      if (!state.feed.ids.includes(post.id)) {
        state.feed.ids.unshift(post.id)
      }
    },

    // ✅ Adiciona múltiplos posts
    upsertPosts: (state, action: PayloadAction<PostWithInteractions[]>) => {
      action.payload.forEach((post) => {
        state.byId[post.id] = {
          ...state.byId[post.id],
          ...post
        }

        if (!state.allIds.includes(post.id)) {
          state.allIds.push(post.id)
        }
      })
    },

    // ✅ Define posts do feed
    setFeedPosts: (
      state,
      action: PayloadAction<{
        posts: PostWithInteractions[]
        cursor: string | null
        hasMore: boolean
      }>
    ) => {
      const { posts, cursor, hasMore } = action.payload

      // Adiciona posts ao cache normalizado
      posts.forEach((post) => {
        state.byId[post.id] = {
          ...state.byId[post.id],
          ...post
        }

        if (!state.allIds.includes(post.id)) {
          state.allIds.push(post.id)
        }
      })

      // Atualiza feed
      state.feed.ids = posts.map((p) => p.id)
      state.feed.cursor = cursor
      state.feed.hasMore = hasMore
      state.feed.loading = false
    },

    // ✅ Adiciona posts ao feed (paginação)
    appendFeedPosts: (
      state,
      action: PayloadAction<{
        posts: PostWithInteractions[]
        cursor: string | null
        hasMore: boolean
      }>
    ) => {
      const { posts, cursor, hasMore } = action.payload

      // ✅ 1. Proteção: Se não vierem posts, apenas atualiza o cursor e hasMore
      if (!posts || posts.length === 0) {
        state.feed.cursor = cursor
        state.feed.hasMore = false // Se veio vazio, não tem mais nada
        state.feed.loading = false
        return
      }

      // 2. Adiciona ao cache (byId) usando o merge seguro que discutimos
      posts.forEach((post) => {
        const existing = state.byId[post.id]
        state.byId[post.id] = {
          ...existing,
          ...post,
          // Garante que o autor não suma se o merge for parcial
          author: post.author || existing?.author,
          stats: post.stats || existing?.stats
        }

        if (!state.allIds.includes(post.id)) {
          state.allIds.push(post.id)
        }
      })

      // ✅ 3. Append ao feed SEM DUPLICAR e sem limpar o que já existe
      const currentIds = new Set(state.feed.ids)
      posts.forEach((p) => currentIds.add(p.id))

      state.feed.ids = Array.from(currentIds)
      state.feed.cursor = cursor
      state.feed.hasMore = hasMore && cursor !== null
      state.feed.loading = false
    },

    // ✅ Toggle like
    toggleLike: (state, action: PayloadAction<number>) => {
      const post = state.byId[action.payload]
      if (post) {
        post.isLiked = !post.isLiked
        post.stats.likes += post.isLiked ? 1 : -1
      }
    },
    setLikeId: (
      state,
      action: PayloadAction<{ postId: number; likeId: number | null }>
    ) => {
      const post = state.byId[action.payload.postId]
      if (post) {
        post.likeId = action.payload.likeId
      }
    },

    // ✅ Toggle retweet
    setRetweeted: (
      state,
      action: PayloadAction<{ postId: number; value: boolean }>
    ) => {
      const post = state.byId[action.payload.postId]
      if (post) {
        post.isRetweeted = action.payload.value
      }
    },

    // ✅ Toggle bookmark
    toggleBookmark: (state, action: PayloadAction<number>) => {
      const post = state.byId[action.payload]
      if (post) {
        post.isBookmarked = !post.isBookmarked
      }
    },

    // ✅ Incrementa comentários
    incrementComments: (state, action: PayloadAction<number>) => {
      const post = state.byId[action.payload]
      if (post) {
        post.stats.replies += 1
      }
    },

    // ✅ Incrementa ou decrementa retweets
    adjustRetweets: (
      state,
      action: PayloadAction<{ postId: number; delta: 1 | -1 }>
    ) => {
      const post = state.byId[action.payload.postId]
      if (post) {
        post.stats.retweets = Math.max(
          0,
          post.stats.retweets + action.payload.delta
        )
      }
    },

    // ✅ Remove post
    removePost: (state, action: PayloadAction<number>) => {
      const id = action.payload
      delete state.byId[id]
      state.allIds = state.allIds.filter((postId) => postId !== id)
      state.feed.ids = state.feed.ids.filter((postId) => postId !== id)
    },

    // ✅ Define loading do feed
    setFeedLoading: (state, action: PayloadAction<boolean>) => {
      state.feed.loading = action.payload
    },

    // ✅ Define post detail
    setPostDetail: (
      state,
      action: PayloadAction<{
        post: PostWithInteractions
        threadIds: number[]
        commentIds: number[]
      }>
    ) => {
      const { post, threadIds, commentIds } = action.payload

      // Adiciona ao cache
      state.byId[post.id] = {
        ...state.byId[post.id],
        ...post
      }

      // Define detail
      state.detail.postId = post.id
      state.detail.threadIds = threadIds
      state.detail.commentIds = commentIds
      state.detail.loading = false
    },

    // ✅ Define loading do detail
    setDetailLoading: (state, action: PayloadAction<boolean>) => {
      state.detail.loading = action.payload
    },

    // ✅ Define creating
    setCreating: (state, action: PayloadAction<boolean>) => {
      state.creating = action.payload
    },

    // ✅ Define erro
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },

    // ✅ Limpa feed
    clearFeed: (state) => {
      state.feed.ids = []
      state.feed.cursor = null
      state.feed.hasMore = true
    },

    setHashtagFeedPosts: (
      state,
      action: PayloadAction<{
        posts: PostWithInteractions[]
        cursor: string | null
        hasMore: boolean
      }>
    ) => {
      const { posts, cursor, hasMore } = action.payload

      // Adiciona posts ao cache normalizado
      posts.forEach((post) => {
        state.byId[post.id] = {
          ...state.byId[post.id],
          ...post
        }

        if (!state.allIds.includes(post.id)) {
          state.allIds.push(post.id)
        }
      })

      // Atualiza hashtag feed
      state.hashtagFeed.ids = posts.map((p) => p.id)
      state.hashtagFeed.cursor = cursor
      state.hashtagFeed.hasMore = hasMore
      state.hashtagFeed.loading = false
    },

    // ✅ Adiciona posts ao hashtag feed (paginação)
    appendHashtagFeedPosts: (
      state,
      action: PayloadAction<{
        posts: PostWithInteractions[]
        cursor: string | null
        hasMore: boolean
      }>
    ) => {
      const { posts, cursor, hasMore } = action.payload

      // Proteção: Se não vierem posts
      if (!posts || posts.length === 0) {
        state.hashtagFeed.cursor = cursor
        state.hashtagFeed.hasMore = false
        state.hashtagFeed.loading = false
        return
      }

      // Adiciona ao cache
      posts.forEach((post) => {
        const existing = state.byId[post.id]
        state.byId[post.id] = {
          ...existing,
          ...post,
          author: post.author || existing?.author,
          stats: post.stats || existing?.stats
        }

        if (!state.allIds.includes(post.id)) {
          state.allIds.push(post.id)
        }
      })

      // Append ao hashtag feed SEM DUPLICAR
      const currentIds = new Set(state.hashtagFeed.ids)
      posts.forEach((p) => currentIds.add(p.id))

      state.hashtagFeed.ids = Array.from(currentIds)
      state.hashtagFeed.cursor = cursor
      state.hashtagFeed.hasMore = hasMore && cursor !== null
      state.hashtagFeed.loading = false
    },

    // ✅ Limpa hashtag feed
    clearHashtagFeed: (state) => {
      state.hashtagFeed.ids = []
      state.hashtagFeed.cursor = null
      state.hashtagFeed.hasMore = true
      state.hashtagFeed.loading = false
    }
  }
})

// ============================================
// ACTIONS
// ============================================
export const {
  upsertPost,
  upsertPosts,
  setFeedPosts,
  appendFeedPosts,
  toggleLike,
  setLikeId,
  setRetweeted,
  toggleBookmark,
  incrementComments,
  adjustRetweets,
  removePost,
  setFeedLoading,
  setPostDetail,
  setDetailLoading,
  setCreating,
  setError,
  clearFeed,
  setHashtagFeedPosts,
  appendHashtagFeedPosts,
  clearHashtagFeed
} = postsSlice.actions

// ============================================
// SELECTORS
// ============================================

// Basic selectors
export const selectAllPosts = (state: RootState) => state.posts.byId
export const selectAllPostIds = (state: RootState) => state.posts.allIds

export const selectPostById = (state: RootState, postId: number) =>
  state.posts.byId[postId]

// Feed selectors
export const selectFeedPostIds = (state: RootState) => state.posts.feed.ids
export const selectFeedHasMore = (state: RootState) => state.posts.feed.hasMore
export const selectFeedLoading = (state: RootState) => state.posts.feed.loading
export const selectFeedCursor = (state: RootState) => state.posts.feed.cursor

// Hashtag Feed selectors
export const selectHashtagFeedPostIds = (state: RootState) =>
  state.posts.hashtagFeed.ids
export const selectHashtagFeedHasMore = (state: RootState) =>
  state.posts.hashtagFeed.hasMore
export const selectHashtagFeedLoading = (state: RootState) =>
  state.posts.hashtagFeed.loading
export const selectHashtagFeedCursor = (state: RootState) =>
  state.posts.hashtagFeed.cursor

// Selector memoizado para Hashtag Feed
export const selectHashtagFeedPosts = createSelector(
  [selectAllPosts, (state: RootState) => state.posts.hashtagFeed.ids],
  (postsById, feedIds) => {
    return feedIds
      .map((id) => postsById[id])
      .filter((post): post is PostWithInteractions => !!post)
  }
)

// Selector para o Feed
export const selectFeedPosts = createSelector(
  [selectAllPosts, (state: RootState) => state.posts.feed.ids],
  (postsById, feedIds) => {
    return feedIds
      .map((id) => postsById[id])
      .filter((post): post is PostWithInteractions => !!post && !post.inReplyTo)
  }
)

// Selector para o 'following' — sem filtro de inReplyTo
export const selectFollowingFeedPosts = createSelector(
  [selectAllPosts, (state: RootState) => state.posts.feed.ids],
  (postsById, feedIds) => {
    return feedIds
      .map((id) => postsById[id])
      .filter((post): post is PostWithInteractions => !!post)
  }
)

// Selector para Replies
export const selectRawFeedPosts = createSelector(
  [selectAllPosts, (state: RootState) => state.posts.feed.ids],
  (postsById, feedIds) => {
    return feedIds
      .map((id) => postsById[id])
      .filter((post): post is PostWithInteractions => !!post)
  }
)

// Detail selectors
export const selectDetailPostId = (state: RootState) =>
  state.posts.detail.postId
export const selectDetailThreadIds = (state: RootState) =>
  state.posts.detail.threadIds
export const selectDetailCommentIds = (state: RootState) =>
  state.posts.detail.commentIds
export const selectDetailLoading = (state: RootState) =>
  state.posts.detail.loading

// Selector memoizado: post detail com thread e comments
export const selectPostDetail = createSelector(
  [
    selectAllPosts,
    selectDetailPostId,
    selectDetailThreadIds,
    selectDetailCommentIds
  ],
  (postsById, postId, threadIds, commentIds) => {
    if (!postId) return null

    return {
      post: postsById[postId],
      thread: threadIds.map((id) => postsById[id]).filter(Boolean),
      comments: commentIds.map((id) => postsById[id]).filter(Boolean)
    }
  }
)

// UI selectors
export const selectPostsCreating = (state: RootState) => state.posts.creating
export const selectPostsError = (state: RootState) => state.posts.error

// ============================================
// REDUCER
// ============================================
export default postsSlice.reducer
