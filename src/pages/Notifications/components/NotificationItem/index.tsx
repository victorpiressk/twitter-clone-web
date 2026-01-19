import { Heart, Repeat2, UserPlus, AtSign, MessageCircle } from 'lucide-react'
import Avatar from '../../../../components/common/Avatar'
import type { NotificationItemProps } from './types'
import * as S from './styles'

const NotificationItem = ({ notification, onClick }: NotificationItemProps) => {
  const getNotificationIcon = () => {
    switch (notification.type) {
      case 'like':
        return {
          color: '#f91880',
          icon: <Heart size={24} fill="currentColor" strokeWidth={0} />
        }
      case 'retweet':
        return {
          color: '#00ba7c',
          icon: <Repeat2 size={24} strokeWidth={2} />
        }
      case 'follow':
        return {
          color: '#1d9bf0',
          icon: <UserPlus size={24} strokeWidth={2} />
        }
      case 'mention':
        return {
          color: '#1d9bf0',
          icon: <AtSign size={24} strokeWidth={2} />
        }
      case 'reply':
        return {
          color: '#1d9bf0',
          icon: <MessageCircle size={24} strokeWidth={2} />
        }
      default:
        return { color: '#71767B', icon: null }
    }
  }

  const getActionText = () => {
    switch (notification.type) {
      case 'like':
        return 'curtiu seu post'
      case 'retweet':
        return 'retweetou seu post'
      case 'follow':
        return 'começou a te seguir'
      case 'mention':
        return 'mencionou você'
      case 'reply':
        return 'respondeu seu post'
      default:
        return ''
    }
  }

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

    if (diffInSeconds < 60) return 'agora'
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}min`
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h`
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d`
    return date.toLocaleDateString('pt-BR', { day: 'numeric', month: 'short' })
  }

  const iconData = getNotificationIcon()

  return (
    <S.NotificationContainer onClick={onClick} $isRead={notification.isRead}>
      <S.IconWrapper $color={iconData.color}>{iconData.icon}</S.IconWrapper>

      <S.NotificationContent>
        <S.NotificationHeader>
          <S.AvatarWrapper>
            <Avatar
              src={notification.user.avatar}
              alt={notification.user.displayName}
              size="small"
            />
          </S.AvatarWrapper>

          <S.NotificationText>
            <S.Username>{notification.user.displayName}</S.Username>
            <S.ActionText>{getActionText()}</S.ActionText>
          </S.NotificationText>
        </S.NotificationHeader>

        {notification.post && (
          <S.PostPreview>{notification.post.content}</S.PostPreview>
        )}

        <S.TimeStamp>{formatDate(notification.createdAt)}</S.TimeStamp>
      </S.NotificationContent>
    </S.NotificationContainer>
  )
}

export default NotificationItem
