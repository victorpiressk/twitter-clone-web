import { X } from 'lucide-react'
import type { ImagePreviewProps } from './types'
import * as S from './styles'

const ImagePreview = ({ images, onRemove }: ImagePreviewProps) => {
  if (images.length === 0) return null

  return (
    <S.PreviewContainer $count={images.length}>
      {images.map((image) => (
        <S.ImageWrapper key={image.id}>
          <S.PreviewImage src={image.preview} alt="Preview" />
          <S.RemoveButton
            type="button"
            onClick={() => onRemove(image.id)}
            aria-label="Remover imagem"
          >
            <X size={18} strokeWidth={2} />
          </S.RemoveButton>
        </S.ImageWrapper>
      ))}
    </S.PreviewContainer>
  )
}

export default ImagePreview
