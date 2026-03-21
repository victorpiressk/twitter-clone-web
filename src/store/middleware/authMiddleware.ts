import { isRejectedWithValue, type Middleware } from '@reduxjs/toolkit'
import { logout } from '../slices/auth/authSlice'
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query'

// Type guard para verificar se o payload é um FetchBaseQueryError
function isFetchBaseQueryError(error: unknown): error is FetchBaseQueryError {
  return typeof error === 'object' && error != null && 'status' in error
}

/**
 * Middleware que intercepta erros 401 e faz auto-logout
 * Remove token inválido/expirado automaticamente
 */
export const authMiddleware: Middleware = (store) => (next) => (action) => {
  // Verifica se é um erro do RTK Query
  if (isRejectedWithValue(action)) {
    const payload = action.payload

    // Usa type guard para verificar se é FetchBaseQueryError
    if (isFetchBaseQueryError(payload)) {
      const status = payload.status

      // Se for erro 401 (Unauthorized), faz logout automático
      if (status === 401) {
        console.warn('Token inválido ou expirado. Fazendo logout automático...')

        // Limpa estado e localStorage
        store.dispatch(logout())

        // Redireciona para página inicial
        setTimeout(() => {
          window.location.href = '/'
        }, 1000)
      }
    }
  }

  // CRÍTICO: SEMPRE retorna next(action) no final!
  return next(action)
}
