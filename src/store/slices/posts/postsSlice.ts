import {
  createSlice,
  type PayloadAction,
  createSelector
} from '@reduxjs/toolkit'
import type { RootState } from '../..'
import type { PostWithInteractions } from '../../../types/domain/models'

// ============================================
// TYPES
// ============================================

type PostsState = {
  byId: Record<number, PostWithInteractions>
  allIds: number[]
  feed: {
    ids: number[]
    cursor: string | null
    hasMore: boolean
    loading: boolean
  }
  hashtagFeed: {
    ids: number[]
    cursor: string | null
    hasMore: boolean
    loading: boolean
  }
  detail: {
    postId: number | null
    threadIds: number[]
    commentIds: number[]
    loading: boolean
  }
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
    // ============================================
    // UPSERT POST
    // ============================================

    upsertPost: (state, action: PayloadAction<PostWithInteractions>) => {
      const post = action.payload
      state.byId[post.id] = { ...state.byId[post.id], ...post }

      if (!state.allIds.includes(post.id)) {
        state.allIds.push(post.id)
      }

      // Posts novos aparecem no topo do feed
      if (!state.feed.ids.includes(post.id)) {
        state.feed.ids.unshift(post.id)
      }
    },

    // ============================================
    // UPSERT POSTS
    // ============================================

    upsertPosts: (state, action: PayloadAction<PostWithInteractions[]>) => {
      action.payload.forEach((post) => {
        state.byId[post.id] = { ...state.byId[post.id], ...post }
        if (!state.allIds.includes(post.id)) {
          state.allIds.push(post.id)
        }
      })
    },

    // ============================================
    // SET FEED POSTS
    // ============================================

    setFeedPosts: (
      state,
      action: PayloadAction<{
        posts: PostWithInteractions[]
        cursor: string | null
        hasMore: boolean
      }>
    ) => {
      const { posts, cursor, hasMore } = action.payload

      posts.forEach((post) => {
        state.byId[post.id] = { ...state.byId[post.id], ...post }
        if (!state.allIds.includes(post.id)) {
          state.allIds.push(post.id)
        }
      })

      state.feed.ids = posts.map((p) => p.id)
      state.feed.cursor = cursor
      state.feed.hasMore = hasMore
      state.feed.loading = false
    },

    // ============================================
    // APPEND FEED POSTS
    // ============================================

    appendFeedPosts: (
      state,
      action: PayloadAction<{
        posts: PostWithInteractions[]
        cursor: string | null
        hasMore: boolean
      }>
    ) => {
      const { posts, cursor, hasMore } = action.payload

      // Sem posts — apenas atualiza cursor e hasMore
      if (!posts || posts.length === 0) {
        state.feed.cursor = cursor
        state.feed.hasMore = false
        state.feed.loading = false
        return
      }

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

      // Append sem duplicar
      const currentIds = new Set(state.feed.ids)
      posts.forEach((p) => currentIds.add(p.id))

      state.feed.ids = Array.from(currentIds)
      state.feed.cursor = cursor
      state.feed.hasMore = hasMore && cursor !== null
      state.feed.loading = false
    },

    // ============================================
    // TOGGLE LIKE
    // ============================================

    toggleLike: (state, action: PayloadAction<number>) => {
      const post = state.byId[action.payload]
      if (post) {
        post.isLiked = !post.isLiked
        post.stats.likes += post.isLiked ? 1 : -1
      }
    },

    // ============================================
    // SET LIKE ID
    // ============================================

    setLikeId: (
      state,
      action: PayloadAction<{ postId: number; likeId: number | null }>
    ) => {
      const post = state.byId[action.payload.postId]
      if (post) post.likeId = action.payload.likeId
    },

    // ============================================
    // SET RETWEETED
    // ============================================

    setRetweeted: (
      state,
      action: PayloadAction<{ postId: number; value: boolean }>
    ) => {
      const post = state.byId[action.payload.postId]
      if (post) post.isRetweeted = action.payload.value
    },

    // ============================================
    // TOGGLE BOOKMARK
    // ============================================

    toggleBookmark: (state, action: PayloadAction<number>) => {
      const post = state.byId[action.payload]
      if (post) post.isBookmarked = !post.isBookmarked
    },

    // ============================================
    // INCREMENT COMMENTS
    // ============================================

    incrementComments: (state, action: PayloadAction<number>) => {
      const post = state.byId[action.payload]
      if (post) post.stats.replies += 1
    },

    // ============================================
    // ADJUST RETWEETS
    // ============================================

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

    // ============================================
    // REMOVE POST
    // ============================================

    removePost: (state, action: PayloadAction<number>) => {
      const id = action.payload
      delete state.byId[id]
      state.allIds = state.allIds.filter((postId) => postId !== id)
      state.feed.ids = state.feed.ids.filter((postId) => postId !== id)
    },

    // ============================================
    // SET FEED LOADING
    // ============================================

    setFeedLoading: (state, action: PayloadAction<boolean>) => {
      state.feed.loading = action.payload
    },

    // ============================================
    // SET POST DETAIL
    // ============================================

    setPostDetail: (
      state,
      action: PayloadAction<{
        post: PostWithInteractions
        threadIds: number[]
        commentIds: number[]
      }>
    ) => {
      const { post, threadIds, commentIds } = action.payload

      state.byId[post.id] = { ...state.byId[post.id], ...post }
      state.detail.postId = post.id
      state.detail.threadIds = threadIds
      state.detail.commentIds = commentIds
      state.detail.loading = false
    },

    // ============================================
    // SET DETAIL LOADING
    // ============================================

    setDetailLoading: (state, action: PayloadAction<boolean>) => {
      state.detail.loading = action.payload
    },

    // ============================================
    // SET CREATING
    // ============================================

    setCreating: (state, action: PayloadAction<boolean>) => {
      state.creating = action.payload
    },

    // ============================================
    // SET ERROR
    // ============================================

    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },

    // ============================================
    // CLEAR FEED
    // ============================================

    clearFeed: (state) => {
      state.feed.ids = []
      state.feed.cursor = null
      state.feed.hasMore = true
    },

    // ============================================
    // SET HASHTAG FEED POSTS
    // ============================================

    setHashtagFeedPosts: (
      state,
      action: PayloadAction<{
        posts: PostWithInteractions[]
        cursor: string | null
        hasMore: boolean
      }>
    ) => {
      const { posts, cursor, hasMore } = action.payload

      posts.forEach((post) => {
        state.byId[post.id] = { ...state.byId[post.id], ...post }
        if (!state.allIds.includes(post.id)) {
          state.allIds.push(post.id)
        }
      })

      state.hashtagFeed.ids = posts.map((p) => p.id)
      state.hashtagFeed.cursor = cursor
      state.hashtagFeed.hasMore = hasMore
      state.hashtagFeed.loading = false
    },

    // ============================================
    // APPEND HASHTAG FEED POSTS
    // ============================================

    appendHashtagFeedPosts: (
      state,
      action: PayloadAction<{
        posts: PostWithInteractions[]
        cursor: string | null
        hasMore: boolean
      }>
    ) => {
      const { posts, cursor, hasMore } = action.payload

      // Sem posts — apenas atualiza cursor e hasMore
      if (!posts || posts.length === 0) {
        state.hashtagFeed.cursor = cursor
        state.hashtagFeed.hasMore = false
        state.hashtagFeed.loading = false
        return
      }

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

      // Append sem duplicar
      const currentIds = new Set(state.hashtagFeed.ids)
      posts.forEach((p) => currentIds.add(p.id))

      state.hashtagFeed.ids = Array.from(currentIds)
      state.hashtagFeed.cursor = cursor
      state.hashtagFeed.hasMore = hasMore && cursor !== null
      state.hashtagFeed.loading = false
    },

    // ============================================
    // CLEAR HASHTAG FEED
    // ============================================

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

// Hashtag feed selectors
export const selectHashtagFeedPostIds = (state: RootState) =>
  state.posts.hashtagFeed.ids
export const selectHashtagFeedHasMore = (state: RootState) =>
  state.posts.hashtagFeed.hasMore
export const selectHashtagFeedLoading = (state: RootState) =>
  state.posts.hashtagFeed.loading
export const selectHashtagFeedCursor = (state: RootState) =>
  state.posts.hashtagFeed.cursor

// Memoized feed selectors
export const selectHashtagFeedPosts = createSelector(
  [selectAllPosts, (state: RootState) => state.posts.hashtagFeed.ids],
  (postsById, feedIds) =>
    feedIds
      .map((id) => postsById[id])
      .filter((post): post is PostWithInteractions => !!post)
)

export const selectFeedPosts = createSelector(
  [selectAllPosts, (state: RootState) => state.posts.feed.ids],
  (postsById, feedIds) =>
    feedIds
      .map((id) => postsById[id])
      .filter((post): post is PostWithInteractions => !!post && !post.inReplyTo)
)

// Sem filtro de inReplyTo — usado para following feed
export const selectFollowingFeedPosts = createSelector(
  [selectAllPosts, (state: RootState) => state.posts.feed.ids],
  (postsById, feedIds) =>
    feedIds
      .map((id) => postsById[id])
      .filter((post): post is PostWithInteractions => !!post)
)

// Sem filtro — usado para replies e profile
export const selectRawFeedPosts = createSelector(
  [selectAllPosts, (state: RootState) => state.posts.feed.ids],
  (postsById, feedIds) =>
    feedIds
      .map((id) => postsById[id])
      .filter((post): post is PostWithInteractions => !!post)
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

// Memoized detail selector
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
