// ============================================
// AUTENTICAÇÃO
// ============================================

export type RegisterRequest = {
  username: string
  email?: string
  phone?: string
  password: string
  passwordConfirm: string
  firstName: string
  lastName: string
  birthDate: string
}

export type LoginRequest = {
  username?: string
  email?: string
  phone?: string
  password: string
}

// ============================================
// USER
// ============================================

export type UpdateUserRequest = {
  firstName?: string
  lastName?: string
  bio?: string
  avatar?: string
  banner?: string
  location?: string
  website?: string
  birthDate?: string
}

// ============================================
// POSTS
// ============================================

export type CreatePostRequest = {
  content: string
  mediaFiles?: File[]
  poll?: CreatePollRequest
  location?: CreateLocationRequest
  scheduledFor?: string
  inReplyTo?: number
  retweetOf?: number
}

export type UpdatePostRequest = {
  content?: string
}

// ============================================
// COMENTÁRIOS
// ============================================

export type CreateCommentRequest = {
  post: number
  content: string
}

// ============================================
// CURTIDAS
// ============================================

export type LikeRequest = {
  post: number
}

// ============================================
// SEGUIDORES
// ============================================

export type FollowRequest = {
  user: number
}

// ============================================
// POLLS (Enquetes)
// ============================================

export type CreatePollRequest = {
  question: string
  durationHours: number
  options: string[]
}

export type VotePollRequest = {
  optionId: number
}

// ============================================
// LOCATIONS (Geolocalização)
// ============================================

export type CreateLocationRequest = {
  name: string
  latitude: string
  longitude: string
}

// ============================================
// HASHTAGS
// ============================================

export type FollowHashtagRequest = {
  tag: string
}

// ============================================
// NOTIFICAÇÕES
// ============================================

export type MarkNotificationReadRequest = number

// ============================================
// BUSCA
// ============================================

export type SearchParams = {
  q: string
  limit?: number
}

// ============================================
// RETWEETS
// ============================================

export type RetweetRequest = number

// ============================================
// REPLIES
// ============================================

// SIMPLIFICADO: content vem no body, parentPostId vem da URL
export type ReplyRequest = {
  content: string
}
