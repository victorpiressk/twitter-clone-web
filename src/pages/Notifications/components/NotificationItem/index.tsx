import { Heart, Repeat2, UserPlus, AtSign, MessageCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Avatar from '../../../../components/common/Avatar'
import { useUserActions } from '../../../../hooks/useUserActions'
import { formatDate } from '../../../../utils/formatDate'
import * as S from './styles'
import type { NotificationItemProps } from './types'

const NotificationItem = ({ notification, onClick }: NotificationItemProps) => {
  const navigate = useNavigate()

  const { isFollowing, followUser, unfollowUser } = useUserActions(
    notification.actor.id
  )

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

  const iconData = getNotificationIcon()

  const handleClickProfile = (e: React.MouseEvent) => {
    e.stopPropagation()
    navigate(`/${notification.actor.username}`)
  }

  const handleFollowToggle = (e?: React.MouseEvent) => {
    e?.stopPropagation()
    if (isFollowing) {
      unfollowUser()
    } else {
      followUser()
    }
  }

  return (
    <S.NotificationContainer onClick={onClick} $isRead={notification.isRead}>
      <S.IconWrapper $color={iconData.color}>{iconData.icon}</S.IconWrapper>

      <S.NotificationContent>
        <S.NotificationHeader>
          <S.AvatarWrapper>
            <Avatar
              src={notification.actor.avatar}
              alt={notification.actor.username}
              size="small"
              onClick={handleClickProfile}
              showProfilePopover={true}
              userProfileData={notification.actor}
              onFollowToggle={handleFollowToggle}
            />
          </S.AvatarWrapper>

          <S.NotificationText>
            <S.Username onClick={handleClickProfile}>
              {notification.actor.username}
            </S.Username>
            <S.ActionText>{getActionText()}</S.ActionText>
          </S.NotificationText>
        </S.NotificationHeader>

        {notification.postPreview && (
          <S.PostPreview>{notification.postPreview.content}</S.PostPreview>
        )}

        <S.TimeStamp>
          {formatDate(notification.createdAt, 'detail')}
        </S.TimeStamp>
      </S.NotificationContent>
    </S.NotificationContainer>
  )
}

export default NotificationItem
