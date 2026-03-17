import type { User, Post, Hashtag } from '../domain/models'

// ============================================
// AUTH
// ============================================

export type AuthResponse = {
  user: User
  token: string
}

// ============================================
// PAGINATION
// ============================================

export type PaginatedResponse<T> = {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

// ============================================
// SEARCH
// ============================================

export type SearchResult = {
  users: User[]
  posts: Post[]
  hashtags: Hashtag[]
}
