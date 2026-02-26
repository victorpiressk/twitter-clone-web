import type { UserPreview } from './User'
import type { Post } from './Post'

export type NotificationType =
  | 'like'
  | 'retweet'
  | 'follow'
  | 'mention'
  | 'reply'

export type Notification = {
  id: number
  type: NotificationType
  actor: UserPreview
  post?: Post | null
  isRead: boolean
  createdAt: string
}

// ============================================
// HELPERS DO FRONTEND (não vem do backend)
// ============================================

// Para agrupamento na UI (calculado no frontend)
export type NotificationGroup = {
  type: NotificationType
  actors: UserPreview[]
  actorCount: number
  post?: Post | null
  latestCreatedAt: string
  allRead: boolean
  notifications: Notification[]
}
