import type { BackendLike } from '../../../types/contracts/dtos'
import type { Like } from '../../../types/domain/models'

// ============================================
// BACKEND → FRONTEND
// ============================================

export const transformLike = (backendLike: BackendLike): Like => ({
  id: backendLike.id,
  user: backendLike.user,
  post: backendLike.post,
  userUsername: backendLike.user_username,
  createdAt: backendLike.created_at
})

// ============================================
// FRONTEND → BACKEND (se necessário)
// ============================================

export const transformLikeToBackend = (like: Like): BackendLike => ({
  id: like.id,
  user: like.user,
  post: like.post,
  user_username: like.userUsername,
  created_at: like.createdAt
})
