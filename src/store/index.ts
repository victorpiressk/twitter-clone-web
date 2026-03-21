import { configureStore } from '@reduxjs/toolkit'
import { authMiddleware } from './middleware/authMiddleware'
import { baseApi } from './slices/api/base.api'
import authReducer from './slices/auth/authSlice'
import postsReducer from './slices/posts/postsSlice'
import usersReducer from './slices/users/usersSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postsReducer,
    users: usersReducer,
    [baseApi.reducerPath]: baseApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware).concat(authMiddleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
