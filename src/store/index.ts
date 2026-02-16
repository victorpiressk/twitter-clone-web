import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/auth/authSlice'
import postsReducer from './slices/posts/postsSlice'
import usersReducer from './slices/users/usersSlice'
import api from './slices/api'
import { authMiddleware } from './middleware/authMiddleware'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postsReducer,
    users: usersReducer,
    [api.reducerPath]: api.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(api.middleware) // ← RTK Query middleware
      .concat(authMiddleware) // ← Auth middleware (auto-logout em 401)
})

// ============================================
// TYPES
// ============================================

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
