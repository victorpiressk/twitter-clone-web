import { useEffect, useLayoutEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { createPortal } from 'react-dom'
import Avatar from '../../index'
import Button from '../../../Button'
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
  const [isFollowing, setIsFollowing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const popoverRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState<{ top: number; left: number }>({
    top: 0,
    left: 0
  })
  const [verticalPosition, setVerticalPosition] = useState<'top' | 'bottom'>(
    'bottom'
  )

  useLayoutEffect(() => {
    if (!isOpen || !triggerRef.current || !popoverRef.current) return

    const trigger = triggerRef.current.getBoundingClientRect()
    const popover = popoverRef.current.getBoundingClientRect()
    const viewportHeight = window.innerHeight

    const left = trigger.left + trigger.width / 2 - 150
    const spaceBelow = viewportHeight - trigger.bottom
    const spaceAbove = trigger.top
    const popoverHeight = popover.height || 200

    let top: number
    let vertical: 'top' | 'bottom'

    if (spaceBelow >= popoverHeight || spaceBelow > spaceAbove) {
      top = trigger.bottom + 8
      vertical = 'bottom'
    } else {
      top = trigger.top - popoverHeight - 8
      vertical = 'top'
    }

    setPosition({ top, left })
    setVerticalPosition(vertical)
  }, [isOpen, triggerRef])

  useEffect(() => {
    if (!isOpen) return

    const handleClickOutside = (e: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(e.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        onClose()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen, onClose, triggerRef])

  if (!isOpen) return null

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

  return createPortal(
    <S.PopoverContainer
      ref={popoverRef}
      style={{ top: `${position.top}px`, left: `${position.left}px` }}
      $position={verticalPosition}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <S.TopRow>
        <div onClick={handleProfileClick} style={{ cursor: 'pointer' }}>
          <Avatar
            src={userData.avatar}
            alt={userData.displayName}
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
        <S.DisplayName>{userData.displayName}</S.DisplayName>
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
    </S.PopoverContainer>,
    document.body
  )
}

export default AvatarProfilePopover
