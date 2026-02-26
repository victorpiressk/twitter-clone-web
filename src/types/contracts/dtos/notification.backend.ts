import type { BackendUserPreview } from './user.backend'
import type { BackendPost } from './post.backend'

export type BackendNotificationType =
  | 'like'
  | 'retweet'
  | 'follow'
  | 'mention'
  | 'reply'

export type BackendNotification = {
  id: number
  type: BackendNotificationType
  actor: BackendUserPreview
  post?: BackendPost | null
  is_read: boolean
  created_at: string
}
