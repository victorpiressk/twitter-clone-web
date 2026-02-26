import type { BackendUser, BackendPost, BackendHashtag } from './dtos'

// ============================================
// AUTH
// ============================================

export type BackendAuthResponse = {
  user: BackendUser
  token: string
}

// ============================================
// PAGINATION
// ============================================

export type BackendPaginatedResponse<T> = {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

// ============================================
// SEARCH
// ============================================

export type BackendSearchResult = {
  users: BackendUser[]
  posts: BackendPost[]
  hashtags: BackendHashtag[]
}
