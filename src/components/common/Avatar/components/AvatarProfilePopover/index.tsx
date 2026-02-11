import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import Avatar from '../../index'
import Button from '../../../Button'
import BasePopover from '../../../Popovers/BasePopover'
import { usePopoverStrategy } from '../../../../../hooks/usePopoverStrategy'
import { useToast } from '../../../../../hooks/useToast'
import type { AvatarProfilePopoverProps } from './types'
import * as S from './styles'

const AvatarProfilePopover = ({
  isOpen,
  userData,
  triggerRef,
  onFollowToggle,
  onClose,
  onMouseEnter,
  onMouseLeave
}: AvatarProfilePopoverProps) => {
  const navigate = useNavigate()
  const { showToast } = useToast()
  const { strategy } = usePopoverStrategy()
  const [isFollowing, setIsFollowing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const popoverRef = useRef<HTMLDivElement>(null)

  const handleProfileClick = () => {
    navigate(`/${userData.username}`)
    onClose()
  }

  const handleFollowClick = async (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsLoading(true)

    try {
      if (userData.isFollowing) {
        showToast('info', `Você deixou de seguir @${userData.username}`)
      } else {
        showToast('success', `Você agora segue @${userData.username}`)
      }

      await onFollowToggle(userData.id)
      setIsFollowing(!isFollowing)
    } catch {
      if (userData.isFollowing) {
        showToast('error', `Erro ao deixar de seguir @${userData.username}`)
      } else {
        showToast('error', `Erro ao seguir @${userData.username}`)
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleFollowingClick = () => {
    navigate(`/${userData.username}/following`)
    onClose()
  }

  const handleFollowersClick = () => {
    navigate(`/${userData.username}/followers`)
    onClose()
  }

  return (
    <BasePopover
      isOpen={isOpen}
      onClose={onClose}
      triggerRef={triggerRef}
      position="bottom"
      strategy={strategy}
    >
      <S.PopoverContainer
        ref={popoverRef}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <S.TopRow>
          <div onClick={handleProfileClick} style={{ cursor: 'pointer' }}>
            <Avatar
              src={userData.avatar}
              alt={userData.firstName}
              size="medium"
              showProfilePopover={false}
            />
          </div>
          <Button
            type="button"
            variant={userData.isFollowing ? 'outline' : 'secondary'}
            onClick={handleFollowClick}
            loading={isLoading}
          >
            {userData.isFollowing ? 'Seguindo' : 'Seguir'}
          </Button>
        </S.TopRow>

        <S.UserInfo onClick={handleProfileClick} style={{ cursor: 'pointer' }}>
          <S.DisplayName>
            {userData.firstName} {userData.lastName}
          </S.DisplayName>
          <S.Username>@{userData.username}</S.Username>
        </S.UserInfo>

        {userData.bio && <S.Bio>{userData.bio}</S.Bio>}

        <S.Stats>
          <S.StatItem onClick={handleFollowingClick}>
            <S.StatNumber>{userData.stats.following}</S.StatNumber>
            Seguindo
          </S.StatItem>
          <S.StatItem onClick={handleFollowersClick}>
            <S.StatNumber>{userData.stats.followers}</S.StatNumber>
            Seguidores
          </S.StatItem>
        </S.Stats>
      </S.PopoverContainer>
    </BasePopover>
  )
}

export default AvatarProfilePopover
