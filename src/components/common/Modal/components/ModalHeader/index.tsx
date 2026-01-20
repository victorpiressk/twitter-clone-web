import { X } from 'lucide-react'
import * as S from './styles'

type ModalHeaderProps = {
  title?: string
  onClose: () => void
  showCloseButton?: boolean
}

const ModalHeader = ({
  title,
  onClose,
  showCloseButton = true
}: ModalHeaderProps) => {
  return (
    <S.HeaderContainer>
      <S.Title>{title || ''}</S.Title>

      {showCloseButton && (
        <S.CloseButton onClick={onClose} aria-label="Fechar">
          <X size={12} strokeWidth={2} />
        </S.CloseButton>
      )}
    </S.HeaderContainer>
  )
}

export default ModalHeader
