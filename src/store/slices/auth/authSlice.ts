// src/store/slices/auth/authSlice.ts
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { User } from '../../../models'
import type { RootState } from '../..'
import api from '../api'

type AuthState = {
  user: User | null
  accessToken: string | null
  isAuthenticated: boolean
  loading: boolean
  error: string | null
}

const initialState: AuthState = {
  user: null,
  accessToken: localStorage.getItem('accessToken'),
  isAuthenticated: !!localStorage.getItem('accessToken'),
  loading: false,
  error: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: User; token: string }>
    ) => {
      state.user = action.payload.user
      state.accessToken = action.payload.token
      state.isAuthenticated = true
      state.loading = false
      state.error = null

      localStorage.setItem('accessToken', action.payload.token)
    },

    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload
    },

    logout: (state) => {
      state.user = null
      state.accessToken = null
      state.isAuthenticated = false
      state.loading = false
      state.error = null
      localStorage.removeItem('accessToken')
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },

    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
      state.loading = false
    },

    clearError: (state) => {
      state.error = null
    }
  },

  // Extra Reducers
  extraReducers: (builder) => {
    builder
      // Quando getCurrentUser retorna sucesso
      .addMatcher(
        api.endpoints.getCurrentUser.matchFulfilled,
        (state, action) => {
          state.user = action.payload
          state.loading = false
        }
      )
      // Quando getCurrentUser falha (token inválido)
      .addMatcher(api.endpoints.getCurrentUser.matchRejected, (state) => {
        state.user = null
        state.accessToken = null
        state.isAuthenticated = false
        state.loading = false
        localStorage.removeItem('accessToken')
      })
  }
})

export const {
  setCredentials,
  setUser,
  logout,
  setLoading,
  setError,
  clearError
} = authSlice.actions

export const selectCurrentUser = (state: RootState) => state.auth.user
export const selectAccessToken = (state: RootState) => state.auth.accessToken
export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated
export const selectAuthLoading = (state: RootState) => state.auth.loading
export const selectAuthError = (state: RootState) => state.auth.error

export default authSlice.reducer
