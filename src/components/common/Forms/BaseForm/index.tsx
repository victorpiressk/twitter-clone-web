import Avatar from '../../Avatar'
import Textarea from '../../Textarea'
import ImagePreview from '../../Posts/ImagePreview'
import type { BaseFormProps } from './types'
import * as S from './styles'

const ContentForm = ({
  userName,
  userAvatar,
  content,
  images,
  onContentChange,
  onImagesChange,
  placeholder = 'O que está acontecendo?',
  maxLength = 280,
  extraContent,
  isModal = false,
  mode = 'comment',
  disabled = false,
  onRemoveImage
}: BaseFormProps) => {
  const handleRemoveImage = (id: string) => {
    if (onRemoveImage) {
      onRemoveImage(id)
    } else {
      // Fallback: remove via onImagesChange
      const updated = images.filter((img) => img.id !== id)
      const removed = images.find((img) => img.id === id)

      if (removed) {
        URL.revokeObjectURL(removed.preview)
      }

      onImagesChange(updated)
    }
  }

  return (
    <S.Container $isModal={isModal}>
      {extraContent && mode === 'comment' && (
        <S.ExtraContentWrapper>{extraContent}</S.ExtraContentWrapper>
      )}

      <S.Content>
        <Avatar src={userAvatar} alt={userName} size="small" />

        <S.TextareaWrapper>
          <Textarea
            value={content}
            onChange={onContentChange}
            placeholder={placeholder}
            maxLength={maxLength}
            rows={1}
            disabled={disabled}
          />

          {images.length > 0 && (
            <ImagePreview images={images} onRemove={handleRemoveImage} />
          )}

          {extraContent && mode === 'retweet' && (
            <S.ExtraContentWrapper>{extraContent}</S.ExtraContentWrapper>
          )}
        </S.TextareaWrapper>
      </S.Content>
    </S.Container>
  )
}

export default ContentForm
