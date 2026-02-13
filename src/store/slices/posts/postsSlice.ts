// src/store/slices/posts/postsSlice.ts
import {
  createSlice,
  type PayloadAction,
  createSelector
} from '@reduxjs/toolkit'
import type { PostWithInteractions } from '../../../models'
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
    // ✅ Adiciona/atualiza um post
    upsertPost: (state, action: PayloadAction<PostWithInteractions>) => {
      const post = action.payload
      state.byId[post.id] = post

      if (!state.allIds.includes(post.id)) {
        state.allIds.push(post.id)
      }
    },

    // ✅ Adiciona múltiplos posts
    upsertPosts: (state, action: PayloadAction<PostWithInteractions[]>) => {
      action.payload.forEach((post) => {
        state.byId[post.id] = post

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
        state.byId[post.id] = post

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

      // Adiciona ao cache
      posts.forEach((post) => {
        state.byId[post.id] = post

        if (!state.allIds.includes(post.id)) {
          state.allIds.push(post.id)
        }
      })

      // Append ao feed (sem duplicar)
      const newIds = posts
        .map((p) => p.id)
        .filter((id) => !state.feed.ids.includes(id))
      state.feed.ids = [...state.feed.ids, ...newIds]
      state.feed.cursor = cursor
      state.feed.hasMore = hasMore
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

    // ✅ Toggle retweet
    toggleRetweet: (state, action: PayloadAction<number>) => {
      const post = state.byId[action.payload]
      if (post) {
        post.isRetweeted = !post.isRetweeted
        post.stats.retweets += post.isRetweeted ? 1 : -1
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
        post.stats.comments += 1
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
      state.byId[post.id] = post

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
  toggleRetweet,
  toggleBookmark,
  incrementComments,
  removePost,
  setFeedLoading,
  setPostDetail,
  setDetailLoading,
  setCreating,
  setError,
  clearFeed
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

// Selector memoizado: posts do feed com dados completos
export const selectFeedPosts = createSelector(
  [selectAllPosts, selectFeedPostIds],
  (postsById, feedIds) => feedIds.map((id) => postsById[id]).filter(Boolean)
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
