// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/auth/authSlice'
import postsReducer from './slices/posts/postsSlice'
import usersReducer from './slices/users/usersSlice'
import api from './slices/api'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postsReducer,
    users: usersReducer,
    [api.reducerPath]: api.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware)
})

// ============================================
// TYPES
// ============================================

/**
 * Tipo do RootState da store
 * Uso: const state: RootState = store.getState()
 */
export type RootState = ReturnType<typeof store.getState>

/**
 * Tipo do Dispatch da store
 * Uso: const dispatch: AppDispatch = store.dispatch
 */
export type AppDispatch = typeof store.dispatch
