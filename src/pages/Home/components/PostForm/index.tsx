import { useState } from 'react'
import { Image, Smile, BarChart2, MapPin, Calendar } from 'lucide-react'
import Avatar from '../../../../components/common/Avatar'
import Textarea from '../../../../components/common/Textarea'
import Button from '../../../../components/common/Button'
import ImageUpload from '../../../../components/common/ImageUpload'
import ImagePreview from '../../../../components/common/ImagePreview'
import type { PostFormProps } from './types'
import type { ImageFile } from '../../../../components/common/ImagePreview/types'
import * as S from './styles'

const PostForm = ({
  userName = 'Usuário',
  userAvatar,
  onSubmit
}: PostFormProps) => {
  const [content, setContent] = useState('')
  const [images, setImages] = useState<ImageFile[]>([])

  const handleImageUpload = (newFiles: File[]) => {
    const newImages: ImageFile[] = newFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      id: `${Date.now()}-${Math.random()}`
    }))

    setImages((prev) => [...prev, ...newImages])
  }

  const handleRemoveImage = (id: string) => {
    setImages((prev) => {
      const updated = prev.filter((img) => img.id !== id)
      // Libera memória do preview
      const removed = prev.find((img) => img.id === id)
      if (removed) {
        URL.revokeObjectURL(removed.preview)
      }
      return updated
    })
  }

  const handleSubmit = () => {
    if (content.trim()) {
      onSubmit(content)
      setContent('')
    }
  }

  const isDisabled =
    (!content.trim() && images.length === 0) || content.length > 280

  return (
    <S.PostFormContainer>
      <Avatar src={userAvatar} alt={userName} size="medium" />
      <S.PostFormContent>
        <Textarea
          value={content}
          onChange={setContent}
          placeholder="O que está acontecendo?"
          maxLength={280}
          rows={1}
        />

        {/* Preview de Imagens */}
        <ImagePreview images={images} onRemove={handleRemoveImage} />

        <S.PostFormActions>
          <S.MediaIcons>
            {/* ImageUpload integrado */}
            <ImageUpload
              onImagesChange={handleImageUpload}
              maxImages={4}
              currentImageCount={images.length}
            />

            {/* Botão de Imagem (trigger do ImageUpload) */}
            <S.IconButton
              type="button"
              onClick={() => {
                const input = document.querySelector(
                  'input[type="file"]'
                ) as HTMLInputElement
                input?.click()
              }}
              aria-label="Adicionar imagem"
              title="Adicionar imagem"
              disabled={images.length >= 4}
            >
              <Image size={20} strokeWidth={2} />
            </S.IconButton>

            {/* Emoji */}
            <S.IconButton
              type="button"
              onClick={() => console.log('Adicionar emoji')}
              aria-label="Adicionar emoji"
              title="Adicionar emoji"
            >
              <Smile size={20} strokeWidth={2} />
            </S.IconButton>

            {/* Enquete */}
            <S.IconButton
              type="button"
              onClick={() => console.log('Criar enquete')}
              aria-label="Criar enquete"
              title="Criar enquete"
            >
              <BarChart2 size={20} strokeWidth={2} />
            </S.IconButton>

            {/* Localização */}
            <S.IconButton
              type="button"
              onClick={() => console.log('Adicionar localização')}
              aria-label="Adicionar localização"
              title="Adicionar localização"
            >
              <MapPin size={20} strokeWidth={2} />
            </S.IconButton>

            {/* Agendar */}
            <S.IconButton
              type="button"
              onClick={() => console.log('Agendar post')}
              aria-label="Agendar post"
              title="Agendar post"
            >
              <Calendar size={20} strokeWidth={2} />
            </S.IconButton>
          </S.MediaIcons>

          <Button
            type="button"
            variant="secondary"
            onClick={handleSubmit}
            disabled={isDisabled}
          >
            Postar
          </Button>
        </S.PostFormActions>
      </S.PostFormContent>
    </S.PostFormContainer>
  )
}

export default PostForm
