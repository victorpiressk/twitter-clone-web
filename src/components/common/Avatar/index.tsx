import { useState, useRef, useEffect } from 'react'
import AvatarProfilePopover from './components/AvatarProfilePopover'
import * as S from './styles'
import type { AvatarProps } from './types'

const Avatar = ({
  src,
  alt = 'User',
  size = 'medium',
  onClick,
  showProfilePopover = false,
  userProfileData,
  onFollowToggle
}: AvatarProps) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)
  const avatarRef = useRef<HTMLDivElement>(null)

  // ReturnType<typeof setTimeout> garante compatibilidade entre browser e Node
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Limpa timeouts pendentes ao desmontar para evitar atualizações em componente desmontado
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current)
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current)
    }
  }, [])

  const getInitial = () => alt.charAt(0).toUpperCase()

  const handleMouseEnter = () => {
    if (!showProfilePopover || !userProfileData) return

    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current)
      closeTimeoutRef.current = null
    }

    hoverTimeoutRef.current = window.setTimeout(() => {
      setIsPopoverOpen(true)
    }, 500)
  }

  const handleMouseLeave = () => {
    if (!showProfilePopover) return

    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current)
      hoverTimeoutRef.current = null
    }

    closeTimeoutRef.current = window.setTimeout(() => {
      setIsPopoverOpen(false)
    }, 300)
  }

  const handlePopoverMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current)
      closeTimeoutRef.current = null
    }
  }

  const handlePopoverMouseLeave = () => {
    closeTimeoutRef.current = window.setTimeout(() => {
      setIsPopoverOpen(false)
    }, 300)
  }

  return (
    <>
      <S.AvatarContainer
        ref={avatarRef}
        size={size}
        onClick={onClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {src ? (
          <S.AvatarImage src={src} alt={alt} />
        ) : (
          <S.AvatarPlaceholder size={size}>{getInitial()}</S.AvatarPlaceholder>
        )}
      </S.AvatarContainer>

      {showProfilePopover && userProfileData && onFollowToggle && (
        <AvatarProfilePopover
          isOpen={isPopoverOpen}
          userData={userProfileData}
          triggerRef={avatarRef}
          onFollowToggle={onFollowToggle}
          onClose={() => setIsPopoverOpen(false)}
          onMouseEnter={handlePopoverMouseEnter}
          onMouseLeave={handlePopoverMouseLeave}
        />
      )}
    </>
  )
}

export default Avatar
