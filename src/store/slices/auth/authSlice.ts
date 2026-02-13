// src/store/slices/auth/authSlice.ts
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { User } from '../../../models'
import type { RootState } from '../..'

// ============================================
// STATE TYPE
// ============================================
type AuthState = {
  user: User | null
  accessToken: string | null
  isAuthenticated: boolean
  loading: boolean
  error: string | null
}

// ============================================
// INITIAL STATE
// ============================================
const initialState: AuthState = {
  user: null,
  accessToken: localStorage.getItem('accessToken'), // ← Recupera do localStorage
  isAuthenticated: !!localStorage.getItem('accessToken'),
  loading: false,
  error: null
}

// ============================================
// SLICE
// ============================================
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // ✅ Login/Register bem-sucedido
    setCredentials: (
      state,
      action: PayloadAction<{ user: User; token: string }>
    ) => {
      state.user = action.payload.user
      state.accessToken = action.payload.token
      state.isAuthenticated = true
      state.loading = false
      state.error = null

      // Persiste no localStorage
      localStorage.setItem('accessToken', action.payload.token)
    },

    // ✅ Atualiza usuário (após editar perfil)
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload
    },

    // ✅ Logout
    logout: (state) => {
      state.user = null
      state.accessToken = null
      state.isAuthenticated = false
      state.loading = false
      state.error = null

      // Remove do localStorage
      localStorage.removeItem('accessToken')
    },

    // ✅ Define loading state
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },

    // ✅ Define erro
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
      state.loading = false
    },

    // ✅ Limpa erro
    clearError: (state) => {
      state.error = null
    }
  }
})

// ============================================
// ACTIONS
// ============================================
export const {
  setCredentials,
  setUser,
  logout,
  setLoading,
  setError,
  clearError
} = authSlice.actions

// ============================================
// SELECTORS
// ============================================
export const selectCurrentUser = (state: RootState) => state.auth.user
export const selectAccessToken = (state: RootState) => state.auth.accessToken
export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated
export const selectAuthLoading = (state: RootState) => state.auth.loading
export const selectAuthError = (state: RootState) => state.auth.error

// ============================================
// REDUCER
// ============================================
export default authSlice.reducer
