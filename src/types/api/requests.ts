// src/types/api/requests.ts
// ============================================
// REQUEST TYPES (Frontend → Backend)
// Payloads que ENVIAMOS para a API
// ============================================

import type { PostMedia, Location } from '../../models'

// ============================================
// AUTH
// ============================================

/**
 * Payload de login
 * Aceita email, phone ou username + senha
 */
export type LoginRequest = {
  email?: string
  phone?: string
  username?: string
  password: string
}

/**
 * Payload de registro
 */
export type RegisterRequest = {
  username: string
  email?: string // ← Opcional (ou email ou phone)
  phone?: string // ← Opcional (ou email ou phone)
  password: string
  confirmPassword: string
  firstName: string
  lastName: string
  birthDate: string
}

// ============================================
// POSTS
// ============================================

/**
 * Payload para criar post
 */
export type CreatePostRequest = {
  content: string
  media?: PostMedia[]
  poll?: {
    question?: string
    options: string[]
    durationHours: number
  }
  location?: Location
  scheduledFor?: string
  inReplyTo?: number
  retweetOf?: number
}

/**
 * Payload para atualizar post
 */
export type UpdatePostRequest = {
  content?: string
  isPublished?: boolean
}

// ============================================
// COMMENTS
// ============================================

/**
 * Payload para criar comentário
 */
export type CreateCommentRequest = {
  post: number // ← Backend espera "post" (ID do post)
  content: string
  media?: PostMedia[]
}

// ============================================
// FOLLOWS
// ============================================

/**
 * Payload para seguir usuário
 */
export type FollowRequest = {
  following: number // ← Backend espera "following" (ID do usuário)
}

// ============================================
// LIKES
// ============================================

/**
 * Payload para curtir post
 */
export type LikeRequest = {
  post: number // ← Backend espera "post" (ID do post)
}
