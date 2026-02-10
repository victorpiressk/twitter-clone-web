import { useState, useRef, useEffect } from 'react'
import AvatarProfilePopover from './components/AvatarProfilePopover'
import type { AvatarProps } from './types'
import * as S from './styles'

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

  // 1. Tipagem Robusta: ReturnType<typeof setTimeout>
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // 2. Limpeza no Unmount (Essencial para evitar bugs de memória)
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

    // Usar window.setTimeout deixa explícito para o TS que estamos no browser
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
    // Se o usuário entrou no popover, ele desistiu de sair. Cancela o fechamento.
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current)
      closeTimeoutRef.current = null
    }
  }

  const handlePopoverMouseLeave = () => {
    // Se ele saiu do popover, começamos a contagem regressiva para fechar de novo.
    closeTimeoutRef.current = window.setTimeout(() => {
      setIsPopoverOpen(false)
    }, 300)
  }

  return (
    <>
      <S.AvatarContainer
        ref={avatarRef}
        size={size}
        onClick={onClick} // Simplificado: passe diretamente se não houver lógica extra
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
