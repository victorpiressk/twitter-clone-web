import {
  createSlice,
  type PayloadAction,
  createSelector
} from '@reduxjs/toolkit'
import type {
  User,
  UserCard,
  UserWithFollowState
} from '../../../types/domain/models'
import type { RootState } from '../..'

// ============================================
// STATE TYPE (Normalizado - Cache de Usuários)
// ============================================
type UsersState = {
  // Cache normalizado
  byId: Record<number, User>
  byUsername: Record<string, number> // username → id

  // Follow state (separado para otimização)
  followState: Record<number, boolean> // userId → isFollowing

  // Suggestions
  suggestions: {
    ids: number[]
    loading: boolean
  }

  // Profile sendo visualizado
  viewing: {
    userId: number | null
    loading: boolean
  }

  // UI state
  error: string | null
}

// ============================================
// INITIAL STATE
// ============================================
const initialState: UsersState = {
  byId: {},
  byUsername: {},
  followState: {},
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
    // ✅ Adiciona/atualiza um usuário
    upsertUser: (state, action: PayloadAction<User>) => {
      const user = action.payload
      state.byId[user.id] = user
      state.byUsername[user.username] = user.id
    },

    // ✅ Adiciona múltiplos usuários
    upsertUsers: (state, action: PayloadAction<User[]>) => {
      action.payload.forEach((user) => {
        state.byId[user.id] = user
        state.byUsername[user.username] = user.id
      })
    },

    // ✅ Atualiza follow state
    setFollowState: (
      state,
      action: PayloadAction<{ userId: number; isFollowing: boolean }>
    ) => {
      const { userId, isFollowing } = action.payload
      state.followState[userId] = isFollowing

      // Atualiza stats do usuário se existir no cache
      const user = state.byId[userId]
      if (user) {
        user.stats.followers += isFollowing ? 1 : -1
      }
    },

    // ✅ Toggle follow
    toggleFollow: (state, action: PayloadAction<number>) => {
      const userId = action.payload
      const currentState = state.followState[userId] || false
      state.followState[userId] = !currentState

      // Atualiza stats
      const user = state.byId[userId]
      if (user) {
        user.stats.followers += !currentState ? 1 : -1
      }
    },

    // ✅ Define sugestões
    setSuggestions: (state, action: PayloadAction<User[]>) => {
      action.payload.forEach((user) => {
        state.byId[user.id] = user
        state.byUsername[user.username] = user.id
      })

      state.suggestions.ids = action.payload.map((u) => u.id)
      state.suggestions.loading = false
    },

    // ✅ Define loading de sugestões
    setSuggestionsLoading: (state, action: PayloadAction<boolean>) => {
      state.suggestions.loading = action.payload
    },

    // ✅ Define perfil sendo visualizado
    setViewingUser: (state, action: PayloadAction<User>) => {
      const user = action.payload
      state.byId[user.id] = user
      state.byUsername[user.username] = user.id
      state.viewing.userId = user.id
      state.viewing.loading = false
    },

    // ✅ Define loading do perfil
    setViewingLoading: (state, action: PayloadAction<boolean>) => {
      state.viewing.loading = action.payload
    },

    // ✅ Limpa perfil visualizado
    clearViewing: (state) => {
      state.viewing.userId = null
      state.viewing.loading = false
    },

    // ✅ Define erro
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    }
  }
})

// ============================================
// ACTIONS
// ============================================
export const {
  upsertUser,
  upsertUsers,
  setFollowState,
  toggleFollow,
  setSuggestions,
  setSuggestionsLoading,
  setViewingUser,
  setViewingLoading,
  clearViewing,
  setError
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

// Follow state
export const selectFollowState = (state: RootState) => state.users.followState

export const selectIsFollowing = (state: RootState, userId: number) =>
  state.users.followState[userId] || false

// Selector: User com follow state
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

// Suggestions
export const selectSuggestionIds = (state: RootState) =>
  state.users.suggestions.ids
export const selectSuggestionsLoading = (state: RootState) =>
  state.users.suggestions.loading

// Selector memoizado: sugestões com dados completos
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

// Viewing
export const selectViewingUserId = (state: RootState) =>
  state.users.viewing.userId
export const selectViewingLoading = (state: RootState) =>
  state.users.viewing.loading

// Selector memoizado: usuário sendo visualizado
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

// Error
export const selectUsersError = (state: RootState) => state.users.error

// ============================================
// REDUCER
// ============================================
export default usersSlice.reducer
