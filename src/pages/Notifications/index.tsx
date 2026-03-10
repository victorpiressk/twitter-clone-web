import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  useGetNotificationsQuery,
  useMarkNotificationReadMutation
} from '../../store/slices/api/notifications.api'
import NotificationTabs from './components/NotificationTabs'
import NotificationItem from './components/NotificationItem'
import InfoBar from '../../components/Layout/InfoBar'
import NotificationListSkeleton from '../../components/common/Skeleton/components/NotificationSkeleton/NotificationListSkeleton'
import { ScrollToTop } from '../../hooks/useScrollToTop'
import type { NotificationTab } from './types'
import type { Notification } from '../../types/domain/models'
import { ContentWrapper } from '../../styles/globalStyles'
import * as S from './styles'

const Notifications = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<NotificationTab>('all')

  const { data, isLoading, refetch } = useGetNotificationsQuery()
  const [markAsRead] = useMarkNotificationReadMutation()

  // ✅ Refetch ao focar na tab
  useEffect(() => {
    const handleFocus = () => refetch()
    window.addEventListener('focus', handleFocus)
    return () => window.removeEventListener('focus', handleFocus)
  }, [refetch])

  // ✅ Polling (30s)
  useEffect(() => {
    const interval = setInterval(() => refetch(), 30000)
    return () => clearInterval(interval)
  }, [refetch])

  const handleNotificationClick = async (notification: Notification) => {
    if (!notification.isRead) {
      try {
        await markAsRead(notification.id)
      } catch (error) {
        console.error('Erro ao marcar notificação como lida:', error)
      }
    }

    if (notification.type === 'follow') {
      navigate(`/${notification.actor.username}`)
    } else if (notification.post) {
      navigate(`/${notification.actor.username}/status/${notification.post}`)
    }
  }

  const getFilteredNotifications = () => {
    if (!data?.results) return []

    switch (activeTab) {
      case 'mentions':
        return data.results.filter(
          (n) => n.type === 'mention' || n.type === 'reply'
        )
      default:
        return data.results
    }
  }

  const filteredNotifications = getFilteredNotifications()

  return (
    <>
      <ScrollToTop />
      <ContentWrapper>
        <S.NotificationsContainer>
          <S.NotificationsHeader>
            <S.HeaderTitle>Notificações</S.HeaderTitle>

            <NotificationTabs
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />
          </S.NotificationsHeader>

          <S.NotificationsList>
            {isLoading ? (
              <NotificationListSkeleton count={7} />
            ) : filteredNotifications.length > 0 ? (
              filteredNotifications.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                  onClick={() => handleNotificationClick(notification)}
                />
              ))
            ) : (
              <S.EmptyState>
                <h3>Nenhuma notificação</h3>
                <p>Quando alguém interagir com você, aparecerá aqui.</p>
              </S.EmptyState>
            )}
          </S.NotificationsList>
        </S.NotificationsContainer>
        <InfoBar />
      </ContentWrapper>
    </>
  )
}

export default Notifications
