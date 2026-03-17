// ============================================
// AUTENTICAÇÃO
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

export type BackendLoginRequest = {
  identifier: string
  password: string
}

// ============================================
// USER
// ============================================

export type BackendUpdateUserRequest = {
  first_name?: string
  last_name?: string
  bio?: string
  profile_image?: File | string | null
  banner?: File | string | null
  location?: string
  website?: string
  birth_date?: string
}

// ============================================
// POSTS
// ============================================

export type BackendCreatePostRequest = {
  content: string
  media_files?: File[]
  poll?: BackendCreatePollRequest
  location?: BackendCreateLocationRequest
  scheduled_for?: string
  in_reply_to?: number
  retweet_of?: number
}

export type BackendUpdatePostRequest = {
  content?: string
}

// ============================================
// COMENTÁRIOS
// ============================================

export type BackendCreateCommentRequest = {
  post: number
  content: string
}

// ============================================
// CURTIDAS
// ============================================

export type BackendLikeRequest = {
  post: number
}

// ============================================
// SEGUIDORES
// ============================================

export type BackendFollowRequest = {
  following: number
}

// ============================================
// POLLS (Enquetes)
// ============================================

export type BackendCreatePollRequest = {
  question: string
  duration_hours: number
  options: string[]
}

export type BackendVotePollRequest = {
  option_id: number
}

// ============================================
// LOCATIONS (Geolocalização)
// ============================================

export type BackendCreateLocationRequest = {
  name: string
  latitude: string
  longitude: string
}

// ============================================
// HASHTAGS
// ============================================

export type BackendFollowHashtagRequest = {
  tag: string
}

// ============================================
// NOTIFICAÇÕES
// ============================================

export type BackendMarkNotificationReadRequest = number

// ============================================
// BUSCA
// ============================================

export type BackendSearchParams = {
  q: string
  limit?: number
}

// ============================================
// RETWEETS
// ============================================

export type BackendRetweetRequest = number

// ============================================
// REPLIES
// ============================================

export type BackendReplyRequest = {
  content: string
}
