import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import ModalHeader from './components/ModalHeader'
import ModalFooter from './components/ModalFooter'
import type { ModalProps } from './types'
import * as S from './styles'

const Modal = ({
  isOpen,
  onClose,
  children,
  size = 'medium',
  showOverlay = true,
  showCloseButton = true,
  title,
  footer,
  className
}: ModalProps) => {
  // Fecha modal ao pressionar ESC
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  // Previne scroll do body quando modal está aberto + Compensa scrollbar
  useEffect(() => {
    if (isOpen) {
      // ← CALCULAR largura da scrollbar
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth

      // ← ADICIONAR padding para compensar
      document.body.style.overflow = 'hidden'
      document.body.style.paddingRight = `${scrollbarWidth}px`
    } else {
      // ← REMOVER overflow e padding
      document.body.style.overflow = 'unset'
      document.body.style.paddingRight = '0px'
    }

    return () => {
      document.body.style.overflow = 'unset'
      document.body.style.paddingRight = '0px'
    }
  }, [isOpen])

  if (!isOpen) return null

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return createPortal(
    <S.Overlay $showOverlay={showOverlay} onClick={handleOverlayClick}>
      <S.ModalContainer $size={size} className={className}>
        {(title || showCloseButton) && (
          <ModalHeader
            title={title}
            onClose={onClose}
            showCloseButton={showCloseButton}
          />
        )}

        <S.ModalContent>{children}</S.ModalContent>

        {footer && <ModalFooter>{footer}</ModalFooter>}
      </S.ModalContainer>
    </S.Overlay>,
    document.body
  )
}

export default Modal
