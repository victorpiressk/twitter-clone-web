import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePopoverStrategy } from '../../../../../hooks/usePopoverStrategy'
import { useAppSelector } from '../../../../../store/hooks'
import { selectCurrentUser } from '../../../../../store/slices/auth/authSlice'
import Button from '../../../Button'
import BasePopover from '../../../Popovers/BasePopover'
import Avatar from '../../index'
import * as S from './styles'
import type { AvatarProfilePopoverProps } from './types'

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
  const { strategy } = usePopoverStrategy()
  const popoverRef = useRef<HTMLDivElement>(null)

  const currentUser = useAppSelector(selectCurrentUser)
  const isOwnProfile = currentUser?.id === userData.id

  const handleProfileClick = () => {
    navigate(`/${userData.username}`)
    onClose()
  }

  const handleFollowClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    onFollowToggle()
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

          {!isOwnProfile && (
            <Button
              type="button"
              variant={userData.isFollowing ? 'outline' : 'secondary'}
              onClick={handleFollowClick}
            >
              {userData.isFollowing ? 'Seguindo' : 'Seguir'}
            </Button>
          )}
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
