import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  useGetNotificationsQuery,
  useMarkNotificationReadMutation
} from '../../store/slices/api/notifications.api'
import { useMobileDrawer } from '../../hooks/useMobileDrawer'
import PageHeader from '../../components/Layout/PageHeader'
import NotificationItem from './components/NotificationItem'
import InfoBar from '../../components/Layout/InfoBar'
import NotificationListSkeleton from '../../components/common/Skeleton/components/NotificationSkeleton/NotificationListSkeleton'
import { ScrollToTop } from '../../hooks/useScrollToTop'
import type { Notification } from '../../types/domain/models'
import { ContentWrapper } from '../../styles/globalStyles'
import * as S from './styles'

const NOTIFICATION_TABS = [
  { key: 'all', label: 'Tudo' },
  { key: 'mentions', label: 'Menções' }
]

const Notifications = () => {
  const navigate = useNavigate()
  const { openDrawer } = useMobileDrawer()
  const [activeTab, setActiveTab] = useState('all')

  const { data, isLoading, refetch } = useGetNotificationsQuery()
  const [markAsRead] = useMarkNotificationReadMutation()

  useEffect(() => {
    const handleFocus = () => refetch()
    window.addEventListener('focus', handleFocus)
    return () => window.removeEventListener('focus', handleFocus)
  }, [refetch])

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
          <PageHeader
            variant="notifications"
            tabs={NOTIFICATION_TABS}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            onAvatarClick={openDrawer}
          />

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
