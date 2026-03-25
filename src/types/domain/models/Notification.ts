import type { UserCardWithStats } from './User'

export type NotificationType =
  | 'like'
  | 'retweet'
  | 'follow'
  | 'mention'
  | 'reply'

export type PostPreview = {
  id: number
  content: string
  author: {
    id: number
    username: string
  }
}

export type Notification = {
  id: number
  type: NotificationType
  actor: UserCardWithStats
  post: number | null
  postPreview: PostPreview | null
  isRead: boolean
  createdAt: string
}

// ============================================
// HELPERS DO FRONTEND (não vem do backend)
// ============================================

// Para agrupamento na UI (calculado no frontend)
export type NotificationGroup = {
  type: NotificationType
  actors: UserCardWithStats[]
  actorCount: number
  post?: PostPreview | null
  latestCreatedAt: string
  allRead: boolean
  notifications: Notification[]
}
