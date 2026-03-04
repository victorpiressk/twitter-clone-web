import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import NotificationTabs from './components/NotificationTabs'
import NotificationItem from './components/NotificationItem'
import InfoBar from '../../components/Layout/InfoBar'
import NotificationListSkeleton from '../../components/common/Skeleton/components/NotificationSkeleton/NotificationListSkeleton'
import { ScrollToTop } from '../../hooks/useScrollToTop'
import type { NotificationTab } from './types'
import type { Notification } from '../../types/domain/models'
import { ContentWrapper } from '../../styles/globalStyles'
import * as S from './styles'

// Mock data
const initialNotifications: Notification[] = [
  {
    id: 1,
    type: 'like',
    actor: {
      id: 2,
      username: 'joao',
      firstName: 'João',
      lastName: 'Silva',
      avatar: ''
    },
    targetPostId: 1,
    createdAt: new Date(Date.now() - 7200000).toISOString(),
    read: false,
    readAt: 'Olá mundo! Este é meu primeiro post 🚀'
  },
  {
    id: 2,
    type: 'follow',
    actor: {
      id: 3,
      username: 'maria',
      firstName: 'Maria',
      lastName: 'Costa',
      avatar: ''
    },
    createdAt: new Date(Date.now() - 18000000).toISOString(),
    read: false
  },
  {
    id: 3,
    type: 'retweet',
    actor: {
      id: 4,
      username: 'pedro',
      firstName: 'Pedro',
      lastName: 'Santos',
      avatar: ''
    },
    targetPostId: 1,
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    read: true,
    readAt: 'Olá mundo! Este é meu primeiro post 🚀'
  },
  {
    id: 4,
    type: 'reply',
    actor: {
      id: 5,
      username: 'ana',
      firstName: 'Ana',
      lastName: 'Oliveira',
      avatar: ''
    },
    targetCommentId: 2,
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    read: true,
    readAt: 'Concordo totalmente com você!'
  },
  {
    id: 5,
    type: 'mention',
    actor: {
      id: 6,
      username: 'carlos',
      firstName: 'Carlos',
      lastName: 'Mendes',
      avatar: ''
    },
    targetPostId: 3,
    createdAt: new Date(Date.now() - 259200000).toISOString(),
    read: true,
    readAt: '@victor você viu essa notícia?'
  }
]

const Notifications = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<NotificationTab>('all')
  const [notifications, setNotifications] = useState<Notification[]>(() => {
    // ← Carrega do localStorage se existir
    const saved = localStorage.getItem('notifications')
    return saved ? JSON.parse(saved) : initialNotifications
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1500)
  }, [])

  // ← Salva no localStorage sempre que mudar
  useEffect(() => {
    localStorage.setItem('notifications', JSON.stringify(notifications))
  }, [notifications])

  const handleNotificationClick = (notification: Notification) => {
    // Marca como lida
    setNotifications((prev) =>
      prev.map((n) => (n.id === notification.id ? { ...n, isRead: true } : n))
    )

    // Navega baseado no tipo
    if (notification.type === 'follow') {
      navigate(`/${notification.actor.username}`)
    } else if (notification.targetPostId) {
      navigate(
        `/${notification.actor.username}/status/${notification.targetPostId}`
      )
    }
  }

  const getFilteredNotifications = () => {
    switch (activeTab) {
      case 'mentions':
        return notifications.filter(
          (n) => n.type === 'mention' || n.type === 'reply'
        )
      default:
        return notifications
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
            {filteredNotifications.length > 0 ? (
              <>
                {isLoading ? (
                  <NotificationListSkeleton count={7} />
                ) : (
                  filteredNotifications.map((notification) => (
                    <NotificationItem
                      key={notification.id}
                      notification={notification}
                      onClick={() => handleNotificationClick(notification)}
                    />
                  ))
                )}
              </>
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
