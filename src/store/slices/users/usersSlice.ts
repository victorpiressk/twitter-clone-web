import {
  createSlice,
  type PayloadAction,
  createSelector
} from '@reduxjs/toolkit'
import { logout } from '../auth/authSlice'
import type { RootState } from '../..'
import type {
  User,
  UserCard,
  UserWithFollowState
} from '../../../types/domain/models'

// ============================================
// TYPES
// ============================================

type UsersState = {
  byId: Record<number, User>
  byUsername: Record<string, number>
  followState: Record<number, boolean>
  followIds: Record<number, number>
  suggestions: {
    ids: number[]
    loading: boolean
  }
  viewing: {
    userId: number | null
    loading: boolean
  }
  error: string | null
}

// ============================================
// INITIAL STATE
// ============================================

const initialState: UsersState = {
  byId: {},
  byUsername: {},
  followState: {},
  followIds: {},
  suggestions: {
    ids: [],
    loading: false
  },
  viewing: {
    userId: null,
    loading: false
  },
  error: null
}

// ============================================
// SLICE
// ============================================

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    // ============================================
    // UPSERT USER
    // ============================================

    upsertUser: (state, action: PayloadAction<User>) => {
      const user = action.payload
      state.byId[user.id] = user
      state.byUsername[user.username] = user.id
    },

    // ============================================
    // UPSERT USERS
    // ============================================

    upsertUsers: (state, action: PayloadAction<User[]>) => {
      action.payload.forEach((user) => {
        state.byId[user.id] = user
        state.byUsername[user.username] = user.id
      })
    },

    // ============================================
    // SET FOLLOW STATE
    // ============================================

    setFollowState: (
      state,
      action: PayloadAction<{ userId: number; isFollowing: boolean }>
    ) => {
      const { userId, isFollowing } = action.payload
      state.followState[userId] = isFollowing

      const user = state.byId[userId]
      if (user) {
        user.stats.followers += isFollowing ? 1 : -1
      }
    },

    // ============================================
    // TOGGLE FOLLOW
    // ============================================

    toggleFollow: (state, action: PayloadAction<number>) => {
      const userId = action.payload
      const currentState = state.followState[userId] || false
      state.followState[userId] = !currentState

      const user = state.byId[userId]
      if (user) {
        user.stats.followers += !currentState ? 1 : -1
      }
    },

    // ============================================
    // SET FOLLOW ID
    // ============================================

    setFollowId: (
      state,
      action: PayloadAction<{ userId: number; followId: number }>
    ) => {
      const { userId, followId } = action.payload
      state.followIds[userId] = followId
    },

    // ============================================
    // REMOVE FOLLOW ID
    // ============================================

    removeFollowId: (state, action: PayloadAction<number>) => {
      delete state.followIds[action.payload]
    },

    // ============================================
    // CLEAR FOLLOWS
    // ============================================

    clearFollows: (state) => {
      state.followState = {}
      state.followIds = {}
    },

    // ============================================
    // SET SUGGESTIONS
    // ============================================

    setSuggestions: (state, action: PayloadAction<User[]>) => {
      action.payload.forEach((user) => {
        state.byId[user.id] = user
        state.byUsername[user.username] = user.id
      })
      state.suggestions.ids = action.payload.map((u) => u.id)
      state.suggestions.loading = false
    },

    // ============================================
    // SET SUGGESTIONS LOADING
    // ============================================

    setSuggestionsLoading: (state, action: PayloadAction<boolean>) => {
      state.suggestions.loading = action.payload
    },

    // ============================================
    // SET VIEWING USER
    // ============================================

    setViewingUser: (state, action: PayloadAction<User>) => {
      const user = action.payload
      state.byId[user.id] = user
      state.byUsername[user.username] = user.id
      state.viewing.userId = user.id
      state.viewing.loading = false
    },

    // ============================================
    // SET VIEWING LOADING
    // ============================================

    setViewingLoading: (state, action: PayloadAction<boolean>) => {
      state.viewing.loading = action.payload
    },

    // ============================================
    // CLEAR VIEWING
    // ============================================

    clearViewing: (state) => {
      state.viewing.userId = null
      state.viewing.loading = false
    },

    // ============================================
    // SET ERROR
    // ============================================

    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },

    // ============================================
    // RESET
    // ============================================

    resetUsersState: () => initialState
  },

  extraReducers: (builder) => {
    // Reset automático ao fazer logout
    builder.addCase(logout, () => initialState)
  }
})

// ============================================
// ACTIONS
// ============================================

export const {
  upsertUser,
  upsertUsers,
  setFollowState,
  setFollowId,
  removeFollowId,
  clearFollows,
  toggleFollow,
  setSuggestions,
  setSuggestionsLoading,
  setViewingUser,
  setViewingLoading,
  clearViewing,
  setError,
  resetUsersState
} = usersSlice.actions

// ============================================
// SELECTORS
// ============================================

// Basic selectors
export const selectAllUsers = (state: RootState) => state.users.byId
export const selectUsernameMap = (state: RootState) => state.users.byUsername

export const selectUserById = (state: RootState, userId: number) =>
  state.users.byId[userId]

export const selectUserByUsername = (state: RootState, username: string) => {
  const userId = state.users.byUsername[username]
  return userId ? state.users.byId[userId] : undefined
}

// Follow selectors
export const selectFollowState = (state: RootState) => state.users.followState

export const selectIsFollowing = (state: RootState, userId: number) =>
  state.users.followState[userId] || false

export const selectFollowId = (state: RootState, userId: number) =>
  state.users.followIds[userId]

// Memoized selector: user com follow state
export const selectUserWithFollowState = createSelector(
  [
    (state: RootState) => state.users.byId,
    (state: RootState) => state.users.followState,
    (_state: RootState, userId: number) => userId
  ],
  (usersById, followState, userId) => {
    const user = usersById[userId]
    if (!user) return undefined

    return {
      ...user,
      isFollowing: followState[userId] || false
    } as UserWithFollowState
  }
)

// Suggestions selectors
export const selectSuggestionIds = (state: RootState) =>
  state.users.suggestions.ids
export const selectSuggestionsLoading = (state: RootState) =>
  state.users.suggestions.loading

// Memoized selector: sugestões com dados completos
export const selectSuggestions = createSelector(
  [selectAllUsers, selectFollowState, selectSuggestionIds],
  (usersById, followState, suggestionIds) =>
    suggestionIds
      .map((id) => {
        const user = usersById[id]
        if (!user) return null

        return {
          id: user.id,
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          avatar: user.avatar,
          bio: user.bio,
          isFollowing: followState[id] || false,
          stats: {
            following: user.stats.following,
            followers: user.stats.followers
          }
        } as UserCard & { stats: { following: number; followers: number } }
      })
      .filter(Boolean)
)

// Viewing selectors
export const selectViewingUserId = (state: RootState) =>
  state.users.viewing.userId
export const selectViewingLoading = (state: RootState) =>
  state.users.viewing.loading

// Memoized selector: usuário sendo visualizado
export const selectViewingUser = createSelector(
  [selectAllUsers, selectFollowState, selectViewingUserId],
  (usersById, followState, viewingId) => {
    if (!viewingId) return null

    const user = usersById[viewingId]
    if (!user) return null

    return {
      ...user,
      isFollowing: followState[viewingId] || false
    } as UserWithFollowState
  }
)

// Error selector
export const selectUsersError = (state: RootState) => state.users.error

// ============================================
// REDUCER
// ============================================

export default usersSlice.reducer
