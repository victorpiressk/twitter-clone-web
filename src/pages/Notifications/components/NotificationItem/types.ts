import type { Notification } from '../../types'

export type NotificationItemProps = {
  notification: Notification
  onClick?: () => void
}
