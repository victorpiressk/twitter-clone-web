import { transformUser } from './entities'
import type {
  BackendAuthResponse,
  BackendPaginatedResponse
} from '../../types/contracts/responses.backend'
import type {
  AuthResponse,
  PaginatedResponse
} from '../../types/domain/responses'

// ============================================
// AUTH RESPONSE (Backend → Frontend)
// ============================================

export const transformAuthResponse = (
  backendAuthResponse: BackendAuthResponse
): AuthResponse => ({
  user: transformUser(backendAuthResponse.user),
  token: backendAuthResponse.token
})

// ============================================
// PAGINATION RESPONSE (Backend → Frontend)
// ============================================

/**
 * Helper genérico para transformar respostas paginadas
 *
 * @example
 * // Na API:
 * transformResponse: (response: BackendPaginatedResponse<BackendPost>) =>
 *   transformPaginatedResponse(response, transformPost)
 */
export const transformPaginatedResponse = <T, U>(
  backendPaginatedResponse: BackendPaginatedResponse<T>,
  itemTransformer: (item: T) => U
): PaginatedResponse<U> => ({
  count: backendPaginatedResponse.count,
  next: backendPaginatedResponse.next,
  previous: backendPaginatedResponse.previous,
  results: backendPaginatedResponse.results.map(itemTransformer)
})
