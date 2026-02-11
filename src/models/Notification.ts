import type { UserPreview } from './User'

export type NotificationType =
  | 'like'
  | 'retweet'
  | 'follow'
  | 'mention'
  | 'reply'
  | 'pollResult'

export type Notification = {
  id: number
  type: NotificationType
  actor: UserPreview
  targetPostId?: number | null
  targetCommentId?: number | null
  createdAt: string
  read: boolean
  readAt?: string | null
}

// Para agrupamento na UI (opcional)
export type NotificationGroup = {
  type: NotificationType
  actors: UserPreview[]
  actorCount: number
  targetPostId?: number | null
  latestCreatedAt: string // data da mais recente
  allRead: boolean // true se todas foram lidas
  notifications: Notification[] // notificações do grupo
}
