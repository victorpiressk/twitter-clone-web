import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import NotificationTabs from './components/NotificationTabs'
import NotificationItem from './components/NotificationItem'
import type { NotificationTab, Notification } from './types'
import { ContentWrapper } from '../../styles/globalStyles'
import InfoBar from '../../components/Layout/InfoBar'
import ScrollToTop from '../../hooks/useScrollToTop'
import * as S from './styles'
import NotificationListSkeleton from '../../components/common/Skeleton/components/NotificationSkeleton/NotificationListSkeleton'

// Mock data
const initialNotifications: Notification[] = [
  {
    id: '1',
    type: 'like',
    user: {
      id: '2',
      username: 'joao',
      displayName: 'João Silva',
      avatar: undefined
    },
    post: {
      id: '1',
      content: 'Olá mundo! Este é meu primeiro post 🚀'
    },
    createdAt: new Date(Date.now() - 7200000).toISOString(),
    isRead: false
  },
  {
    id: '2',
    type: 'follow',
    user: {
      id: '3',
      username: 'maria',
      displayName: 'Maria Costa',
      avatar: undefined
    },
    createdAt: new Date(Date.now() - 18000000).toISOString(),
    isRead: false
  },
  {
    id: '3',
    type: 'retweet',
    user: {
      id: '4',
      username: 'pedro',
      displayName: 'Pedro Santos',
      avatar: undefined
    },
    post: {
      id: '1',
      content: 'Olá mundo! Este é meu primeiro post 🚀'
    },
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    isRead: true
  },
  {
    id: '4',
    type: 'reply',
    user: {
      id: '5',
      username: 'ana',
      displayName: 'Ana Oliveira',
      avatar: undefined
    },
    post: {
      id: '2',
      content: 'Concordo totalmente com você!'
    },
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    isRead: true
  },
  {
    id: '5',
    type: 'mention',
    user: {
      id: '6',
      username: 'carlos',
      displayName: 'Carlos Mendes',
      avatar: undefined
    },
    post: {
      id: '3',
      content: '@victor você viu essa notícia?'
    },
    createdAt: new Date(Date.now() - 259200000).toISOString(),
    isRead: true
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
      navigate(`/${notification.user.username}`)
    } else if (notification.post) {
      navigate(`/${notification.user.username}/status/${notification.post.id}`)
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
