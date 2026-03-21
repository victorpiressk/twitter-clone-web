import { X, MapPin } from 'lucide-react'
import * as S from './styles'
import type { LocationPreviewProps } from './types'

const LocationPreview = ({
  locationName,
  onRemove,
  variant = 'editable'
}: LocationPreviewProps) => {
  return (
    <S.LocationContainer $variant={variant}>
      <S.LocationIcon>
        <MapPin size={16} />
      </S.LocationIcon>

      <S.LocationText title={locationName}>{locationName}</S.LocationText>

      {variant === 'editable' && onRemove && (
        <S.RemoveButton
          type="button"
          onClick={onRemove}
          aria-label="Remover localização"
        >
          <X />
        </S.RemoveButton>
      )}
    </S.LocationContainer>
  )
}

export default LocationPreview
