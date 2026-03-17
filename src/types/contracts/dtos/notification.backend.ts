import type { BackendUser } from './user.backend'

export type BackendNotificationType =
  | 'like'
  | 'retweet'
  | 'follow'
  | 'mention'
  | 'reply'

export type BackendPostPreview = {
  id: number
  content: string
  author: {
    id: number
    username: string
  }
}

export type BackendNotification = {
  id: number
  notification_type: BackendNotificationType
  notification_type_display: string
  actor: BackendUser // User completo
  post: number | null // ✅ Apenas ID
  post_preview: BackendPostPreview | null
  is_read: boolean
  created_at: string
}
