import type { Notification } from '../../../../models'

export type NotificationItemProps = {
  notification: Notification
  onClick?: () => void
}
