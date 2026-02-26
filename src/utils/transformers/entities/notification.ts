import type { BackendNotification } from '../../../types/contracts/dtos'
import type { Notification } from '../../../types/domain/models'
import { transformUserPreview } from './user'
import { transformPost } from './post'

// ============================================
// BACKEND → FRONTEND
// ============================================

export const transformNotification = (
  backendNotification: BackendNotification
): Notification => ({
  id: backendNotification.id,
  type: backendNotification.type,
  actor: transformUserPreview(backendNotification.actor),
  post: backendNotification.post
    ? transformPost(backendNotification.post)
    : null,
  isRead: backendNotification.is_read,
  createdAt: backendNotification.created_at
})

// ============================================
// FRONTEND HELPERS (agrupamento)
// ============================================

import type { NotificationGroup } from '../../../types/domain/models'

/**
 * Agrupa notificações por tipo e post
 * Exemplo: "João, Maria e 3 outros curtiram seu post"
 */
export const groupNotifications = (
  notifications: Notification[]
): NotificationGroup[] => {
  const groups = new Map<string, Notification[]>()

  // Agrupa por: tipo + postId (se existir)
  notifications.forEach((notif) => {
    const key = `${notif.type}-${notif.post?.id || 'none'}`

    if (!groups.has(key)) {
      groups.set(key, [])
    }

    groups.get(key)!.push(notif)
  })

  // Converte Map em array de NotificationGroups
  return Array.from(groups.values()).map((notifGroup) => {
    const latest = notifGroup[0] // Assume que vem ordenado por data

    return {
      type: latest.type,
      actors: notifGroup.map((n) => n.actor),
      actorCount: notifGroup.length,
      post: latest.post,
      latestCreatedAt: latest.createdAt,
      allRead: notifGroup.every((n) => n.isRead),
      notifications: notifGroup
    }
  })
}
