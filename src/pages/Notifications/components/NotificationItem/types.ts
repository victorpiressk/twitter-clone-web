import type { Notification } from '../../../../types/domain/models'

export type NotificationItemProps = {
  notification: Notification
  onClick?: () => void
}
