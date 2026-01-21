import { useState } from 'react'
import Modal from '../../../../common/Modal'
import PostForm from '../../../../common/PostForm'
import PostFormActions from '../../../../common/PostForm/components/PostFormActions'
import type { CreatePostModalProps } from './types'
import type { ImageFile } from '../../../../common/ImagePreview/types'
import * as S from './styles'

const CreatePostModal = ({
  isOpen,
  onClose,
  onSubmit,
  userName,
  userAvatar
}: CreatePostModalProps) => {
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

  const handleSubmit = () => {
    if (content.trim()) {
      onSubmit(content)
      setContent('')
      images.forEach((img) => URL.revokeObjectURL(img.preview))
      setImages([])
      onClose()
    }
  }

  const handleClose = () => {
    setContent('')
    images.forEach((img) => URL.revokeObjectURL(img.preview))
    setImages([])
    onClose()
  }

  const isDisabled =
    (!content.trim() && images.length === 0) || content.length > 280

  // ✅ Footer fixo com actions
  const footer = (
    <S.FooterContainer>
      <PostFormActions
        content={content}
        images={images}
        isDisabled={isDisabled}
        maxLength={280}
        onImageUpload={handleImageUpload}
        onSubmit={handleSubmit}
      />
    </S.FooterContainer>
  )

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      size="medium"
      showOverlay
      showCloseButton
      title=""
      header={<div />}
      footer={footer}
    >
      <S.ModalContent>
        {/* ✅ PostForm controlado SEM actions */}
        <PostForm
          userName={userName}
          userAvatar={userAvatar}
          content={content}
          images={images}
          onContentChange={setContent}
          onImagesChange={setImages}
          isModal
          showActions={false} // ← Esconde actions (vão no footer)
        />
      </S.ModalContent>
    </Modal>
  )
}

export default CreatePostModal
