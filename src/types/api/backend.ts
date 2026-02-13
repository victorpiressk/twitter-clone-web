// src/types/api/backend.ts
// ============================================
// BACKEND TYPES (Formato RAW do Django)
// snake_case - como o backend retorna SEM transformação
// Esses tipos são usados APENAS nos transformers
// ============================================

// ============================================
// USER
// ============================================

export type BackendUser = {
  id: number
  username: string
  first_name: string
  last_name: string
  email: string
  profile_image: string | null
  banner: string | null
  bio: string
  location: string
  website: string
  birth_date: string | null
  created_at: string
  stats: {
    posts_count: number
    following_count: number
    followers_count: number
  }
}

// ============================================
// POST
// ============================================

export type BackendPostMedia = {
  id: string
  type: 'image' | 'video' | 'gif'
  url: string
  thumbnail?: string
  order: number
}

export type BackendPollOption = {
  id: number
  text: string
  votes: number
  percentage: number
}

export type BackendPoll = {
  id: number
  question?: string
  options: BackendPollOption[]
  duration_hours: number
  ends_at: string
  total_votes: number
}

export type BackendLocation = {
  id: number
  name: string
  latitude?: number
  longitude?: number
}

export type BackendPost = {
  id: number
  content: string
  author: BackendUser
  created_at: string
  updated_at: string
  published_at?: string
  scheduled_for: string | null
  is_published: boolean
  stats: {
    comments: number
    retweets: number
    likes: number
    views: number
  }
  media?: BackendPostMedia[]
  poll?: BackendPoll
  location?: BackendLocation
  in_reply_to: number | null
  retweet_of: number | null
}

// ============================================
// COMMENT
// ============================================

export type BackendComment = {
  id: number
  user: BackendUser
  post: number
  content: string
  created_at: string
  updated_at: string
}

// ============================================
// LIKE
// ============================================

export type BackendLike = {
  id: number
  user: number
  post: number
  user_username: string
  created_at: string
}

// ============================================
// FOLLOW
// ============================================

export type BackendFollow = {
  id: number
  follower: number
  following: number
  follower_username: string
  following_username: string
  created_at: string
}

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
// REQUESTS
// ============================================

export type BackendRegisterRequest = {
  username: string
  email?: string
  phone?: string
  password: string
  password_confirm: string
  first_name: string
  last_name: string
  birth_date: string
}

export type BackendCreatePostRequest = {
  content: string
  media?: BackendPostMedia[]
  poll?: {
    question?: string
    options: Pick<BackendPollOption, 'text'>[]
    duration_hours: number
  }
  location?: BackendLocation
  scheduled_for?: string
  in_reply_to?: number
  retweet_of?: number
}
