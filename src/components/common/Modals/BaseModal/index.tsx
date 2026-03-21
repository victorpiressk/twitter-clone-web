import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { useModalScrollLock } from '../../../../hooks/useModalScrollLock'
import ModalFooter from './components/ModalFooter'
import ModalHeader from './components/ModalHeader'
import * as S from './styles'
import type { ModalProps } from './types'

const Modal = ({
  isOpen,
  onClose,
  children,
  size = 'medium',
  showOverlay = true,
  showCloseButton = true,
  title,
  header,
  footer,
  className
}: ModalProps) => {
  // Previne scroll do body quando modal está aberto + Compensa scrollbar
  useModalScrollLock(isOpen)

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

  if (!isOpen) return null

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return createPortal(
    <S.Overlay $showOverlay={showOverlay} onClick={handleOverlayClick}>
      <S.ModalContainer $size={size} className={className}>
        {header && (
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
