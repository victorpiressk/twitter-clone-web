// src/types/api/responses.ts
// ============================================
// RESPONSE TYPES (Backend → Frontend)
// Dados que RECEBEMOS da API (já transformados em camelCase)
// ============================================

import type { User } from '../../models'

// ============================================
// AUTH
// ============================================

/**
 * Resposta de login/register
 * Já transformada pelos transformers (camelCase)
 */
export type AuthResponse = {
  user: User
  token: string
}

// ============================================
// PAGINATION
// ============================================

/**
 * Resposta paginada genérica
 * Já transformada pelos transformers (camelCase)
 */
export type PaginatedResponse<T> = {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}
