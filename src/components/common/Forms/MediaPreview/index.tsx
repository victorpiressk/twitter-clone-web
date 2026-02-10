import { X } from 'lucide-react'
import type { MediaPreviewProps, MediaFile } from './types'
import * as S from './styles'

const MediaPreview = ({ medias, onRemove }: MediaPreviewProps) => {
  if (medias.length === 0) return null

  const renderMediaContent = (media: MediaFile) => {
    switch (media.type) {
      case 'image':
        return <S.PreviewImage src={media.preview} alt="Preview" />

      case 'gif':
        return <S.PreviewImage src={media.preview} alt="GIF Preview" />

      // Preparado para vídeos no futuro
      case 'video':
        return (
          <S.PreviewVideo controls>
            <source src={media.preview} />
          </S.PreviewVideo>
        )

      default:
        return null
    }
  }

  return (
    <S.PreviewContainer $count={medias.length}>
      {medias.map((media) => (
        <S.MediaWrapper key={media.id}>
          {renderMediaContent(media)}
          <S.RemoveButton
            type="button"
            onClick={() => onRemove(media.id)}
            aria-label="Remover mídia"
          >
            <X size={18} strokeWidth={2} />
          </S.RemoveButton>
        </S.MediaWrapper>
      ))}
    </S.PreviewContainer>
  )
}

export default MediaPreview
