import { useState } from 'react'
import Avatar from '../Avatar'
import Textarea from '../Textarea'
import ImagePreview from '../ImagePreview'
import PostFormActions from './components/PostFormActions'
import type { PostFormProps } from './types'
import type { ImageFile } from '../ImagePreview/types'
import * as S from './styles'

const PostForm = ({
  userName = 'Usuário',
  userAvatar,

  // Props controladas (modal usa)
  content: controlledContent,
  images: controlledImages,
  onContentChange,
  onImagesChange,

  // Props não-controladas (Home usa)
  onSubmit,

  isModal = false,
  showActions = true
}: PostFormProps) => {
  // Estado interno (usado quando NÃO é controlado)
  const [internalContent, setInternalContent] = useState('')
  const [internalImages, setInternalImages] = useState<ImageFile[]>([])

  // Decide se usa estado controlado ou interno
  const isControlled = controlledContent !== undefined
  const content = isControlled ? controlledContent! : internalContent
  const images = isControlled ? controlledImages! : internalImages

  const handleContentChange = (value: string) => {
    if (isControlled) {
      onContentChange?.(value)
    } else {
      setInternalContent(value)
    }
  }

  const handleImageUpload = (newFiles: File[]) => {
    const newImages: ImageFile[] = newFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      id: `${Date.now()}-${Math.random()}`
    }))

    if (isControlled) {
      onImagesChange?.([...images, ...newImages])
    } else {
      setInternalImages((prev) => [...prev, ...newImages])
    }
  }

  const handleRemoveImage = (id: string) => {
    const updated = images.filter((img) => img.id !== id)
    const removed = images.find((img) => img.id === id)

    if (removed) {
      URL.revokeObjectURL(removed.preview)
    }

    if (isControlled) {
      onImagesChange?.(updated)
    } else {
      setInternalImages(updated)
    }
  }

  const handleSubmit = () => {
    if (content.trim() && onSubmit) {
      onSubmit(content)

      // Limpa apenas se não-controlado
      if (!isControlled) {
        setInternalContent('')
        images.forEach((img) => URL.revokeObjectURL(img.preview))
        setInternalImages([])
      }
    }
  }

  const isDisabled =
    (!content.trim() && images.length === 0) || content.length > 280

  return (
    <S.PostFormContainer $isModal={isModal}>
      <Avatar src={userAvatar} alt={userName} size="medium" />

      <S.PostFormContent>
        <Textarea
          value={content}
          onChange={handleContentChange}
          placeholder="O que está acontecendo?"
          maxLength={280}
          rows={1}
        />

        <ImagePreview images={images} onRemove={handleRemoveImage} />

        {/* Renderiza actions apenas se showActions=true */}
        {showActions && (
          <PostFormActions
            content={content}
            images={images}
            isDisabled={isDisabled}
            maxLength={280}
            onImageUpload={handleImageUpload}
            onSubmit={handleSubmit}
          />
        )}
      </S.PostFormContent>
    </S.PostFormContainer>
  )
}

export default PostForm
