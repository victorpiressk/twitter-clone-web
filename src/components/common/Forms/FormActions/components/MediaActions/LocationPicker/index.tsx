import { X } from 'lucide-react'
import BasePopover from '../../../../../Popovers/BasePopover'
import * as S from './styles'
import type { LocationPickerProps } from './types'

const LocationPickerComponent = ({
  isOpen,
  onClose,
  triggerRef
}: LocationPickerProps) => {
  return (
    <BasePopover
      isOpen={isOpen}
      onClose={onClose}
      position="bottom"
      triggerRef={triggerRef}
      strategy="fixed"
    >
      <S.LocationPickerContainer>
        <S.Header>
          <S.Title>Adicionar localização</S.Title>
          <S.CloseButton onClick={onClose}>
            <X />
          </S.CloseButton>
        </S.Header>
        <S.DisabledMessage>
          <S.DisabledTitle>Funcionalidade em desenvolvimento</S.DisabledTitle>
          <S.DisabledText>
            A adição de localização estará disponível em breve. Esta
            funcionalidade requer integração com API externa (Google Places) que
            será implementada futuramente.
          </S.DisabledText>
        </S.DisabledMessage>
      </S.LocationPickerContainer>
    </BasePopover>
  )
}

export default LocationPickerComponent
