import { useState, useMemo } from 'react'
import { X } from 'lucide-react'
import BasePopover from '../../../../../Popovers/BasePopover'
import { MOCK_LOCATIONS } from '../../../../../../../mocks/locations'
import type { LocationPickerProps } from './types'
import * as S from './styles'

// ============================================
// FEATURE FLAG
// ============================================
const FEATURE_ENABLED = false // ⏸️ Desabilitado temporariamente

const LocationPickerComponent = ({
  isOpen,
  onClose,
  triggerRef,
  onLocationSelect
}: LocationPickerProps) => {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredLocations = useMemo(() => {
    if (!searchTerm.trim()) {
      return MOCK_LOCATIONS
    }

    const search = searchTerm.toLowerCase()
    return MOCK_LOCATIONS.filter((location) =>
      location.name.toLowerCase().includes(search)
    )
  }, [searchTerm])

  const handleLocationClick = (location: (typeof MOCK_LOCATIONS)[0]) => {
    onLocationSelect(location)
    onClose()
    setSearchTerm('')
  }

  const handleCloseInternal = () => {
    setSearchTerm('')
    onClose()
  }

  // ============================================
  // FEATURE DISABLED - Mostrar mensagem
  // ============================================
  if (!FEATURE_ENABLED) {
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
              funcionalidade requer integração com API externa (Google Places)
              que será implementada futuramente.
            </S.DisabledText>
          </S.DisabledMessage>
        </S.LocationPickerContainer>
      </BasePopover>
    )
  }

  // ============================================
  // FEATURE ENABLED - Funcionalidade completa
  // ============================================
  return (
    <BasePopover
      isOpen={isOpen}
      onClose={handleCloseInternal}
      position="bottom"
      triggerRef={triggerRef}
      strategy="fixed"
    >
      <S.LocationPickerContainer>
        <S.SearchInput
          type="text"
          placeholder="Buscar localização..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          autoFocus
        />

        <S.LocationList>
          {filteredLocations.length > 0 ? (
            filteredLocations.map((location) => (
              <S.LocationItem
                key={location.id}
                onClick={() => handleLocationClick(location)}
              >
                {location.name}
              </S.LocationItem>
            ))
          ) : (
            <S.EmptyState>Nenhuma localização encontrada</S.EmptyState>
          )}
        </S.LocationList>
      </S.LocationPickerContainer>
    </BasePopover>
  )
}

export default LocationPickerComponent
