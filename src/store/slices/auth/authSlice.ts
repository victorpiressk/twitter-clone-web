import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { authApi } from '../api/auth.api'
import type { RootState } from '../..'
import type { User } from '../../../types/domain/models'

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

  extraReducers: (builder) => {
    builder
      .addMatcher(
        authApi.endpoints.getCurrentUser.matchFulfilled,
        (state, action) => {
          state.user = action.payload
          state.loading = false
        }
      )
      // Quando getCurrentUser falha (token inválido)
      .addMatcher(
        authApi.endpoints.getCurrentUser.matchRejected,
        (state, action) => {
          // Só desloga se for 401 (token inválido)
          // Erros de rede, timeout, 500 não devem deslogar
          const status = (action.payload as { status?: number })?.status

          if (status === 401) {
            state.user = null
            state.accessToken = null
            state.isAuthenticated = false
            localStorage.removeItem('accessToken')
          }
          // Qualquer outro erro: mantém a sessão, apenas loga
          else {
            console.warn(
              '[auth] getCurrentUser falhou com status:',
              status,
              '— sessão mantida'
            )
          }
        }
      )
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
