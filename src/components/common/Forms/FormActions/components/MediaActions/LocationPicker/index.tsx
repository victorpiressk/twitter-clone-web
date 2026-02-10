import { useState, useMemo } from 'react'
import BasePopover from '../../../../../Popovers/BasePopover'
import { MOCK_LOCATIONS } from './constants/mockLocations'
import type { LocationPickerProps } from './types'
import * as S from './styles'

const LocationPickerComponent = ({
  isOpen,
  onClose,
  triggerRef,
  onLocationSelect
}: LocationPickerProps) => {
  const [searchTerm, setSearchTerm] = useState('')

  // Filtra localizações baseado na busca
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
    setSearchTerm('') // Limpa busca ao fechar
  }

  return (
    <BasePopover
      isOpen={isOpen}
      onClose={onClose}
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
