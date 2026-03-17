// src/utils/transformers/entities/notification.ts

import type { BackendNotification } from '../../../types/contracts/dtos'
import type { Notification } from '../../../types/domain/models'
import { transformUser } from './user'

// ============================================
// BACKEND → FRONTEND
// ============================================

export const transformNotification = (
  backendNotification: BackendNotification
): Notification => ({
  id: backendNotification.id,
  type: backendNotification.notification_type,
  actor: transformUser(backendNotification.actor),
  post: backendNotification.post, // ✅ Mantém o ID (ou null)
  postPreview: backendNotification.post_preview
    ? {
        id: backendNotification.post_preview.id,
        content: backendNotification.post_preview.content,
        author: {
          id: backendNotification.post_preview.author.id,
          username: backendNotification.post_preview.author.username
        }
      }
    : null, // ✅ Pode ser null se tipo for 'follow'
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
    const key = `${notif.type}-${notif.post || 'none'}`

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
      post: latest.postPreview, // ✅ Usa post_preview (não post ID)
      latestCreatedAt: latest.createdAt,
      allRead: notifGroup.every((n) => n.isRead),
      notifications: notifGroup
    }
  })
}
