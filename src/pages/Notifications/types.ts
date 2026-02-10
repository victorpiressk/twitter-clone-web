export type NotificationType =
  | 'like'
  | 'retweet'
  | 'follow'
  | 'mention'
  | 'reply'

export type Notification = {
  id: string
  type: NotificationType
  user: {
    id: string
    username: string
    displayName: string
    avatar?: string
  }
  post?: {
    id: string
    content: string
  }
  createdAt: string
  isRead: boolean
}

export type NotificationTab = 'all' | 'mentions'
