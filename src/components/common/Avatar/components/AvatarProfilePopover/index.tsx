// src/components/common/Avatar/components/AvatarProfilePopover/index.tsx

import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import Avatar from '../../index'
import Button from '../../../Button'
import BasePopover from '../../../Popovers/BasePopover'
import { usePopoverStrategy } from '../../../../../hooks/usePopoverStrategy'
import type { AvatarProfilePopoverProps } from './types'
import * as S from './styles'

const AvatarProfilePopover = ({
  isOpen,
  userData,
  triggerRef,
  onFollowToggle, // ← Apenas repassa, não executa lógica
  onClose,
  onMouseEnter,
  onMouseLeave
}: AvatarProfilePopoverProps) => {
  const navigate = useNavigate()
  const { strategy } = usePopoverStrategy()
  const popoverRef = useRef<HTMLDivElement>(null)

  const handleProfileClick = () => {
    navigate(`/${userData.username}`)
    onClose()
  }

  // ✅ SIMPLIFICADO: Apenas repassa para o componente pai
  const handleFollowClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    onFollowToggle() // ← Componente pai cuida da lógica
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
