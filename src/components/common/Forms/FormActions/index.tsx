import { useRef } from 'react'
import Button from '../../Button'
import ImageUpload from '../../ImageUpload'
import PostCharCounter from '../CharCounter'
import { MEDIA_BUTTONS } from './constants/mediaButtons'
import type { PostFormActionsProps } from './types'
import * as S from './styles'

const PostFormActions = ({
  content,
  images,
  maxImages = 4,
  isDisabled,
  onImageUpload,
  onSubmit,
  maxLength,
  loading,
  submitLabel
}: PostFormActionsProps) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleMediaClick = (
    action: (typeof MEDIA_BUTTONS)[number]['action']
  ) => {
    switch (action) {
      case 'image':
        inputRef.current?.click()
        break
      case 'gif':
        console.log('Adicionar GIF')
        break
      case 'emoji':
        console.log('Adicionar emoji')
        break
      case 'poll':
        console.log('Criar enquete')
        break
      case 'location':
        console.log('Adicionar localização')
        break
      case 'schedule':
        console.log('Agendar post')
        break
    }
  }

  return (
    <S.ActionsContainer>
      <S.MediaIcons>
        {/* ImageUpload (escondido, apenas funcionalidade) */}
        <ImageUpload
          onImagesChange={onImageUpload}
          maxImages={maxImages}
          currentImageCount={images.length}
          inputRef={inputRef}
        />

        {/* Renderiza botões dinamicamente */}
        {MEDIA_BUTTONS.map((button) => {
          const Icon = button.icon
          const isImageButton = button.action === 'image'
          const isImageDisabled = isImageButton && images.length >= maxImages

          return (
            <S.IconButton
              key={button.id}
              type="button"
              onClick={() => handleMediaClick(button.action)}
              aria-label={button.label}
              title={button.label}
              disabled={isImageDisabled}
            >
              <Icon size={20} strokeWidth={2} />
            </S.IconButton>
          )
        })}
      </S.MediaIcons>

      <S.ActionGroup>
        <PostCharCounter currentLength={content.length} maxLength={maxLength} />

        <Button
          type="button"
          variant="secondary"
          onClick={onSubmit}
          disabled={isDisabled}
          loading={loading}
        >
          {submitLabel}
        </Button>
      </S.ActionGroup>
    </S.ActionsContainer>
  )
}

export default PostFormActions
