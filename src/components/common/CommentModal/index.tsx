import { useState } from 'react'
import { Twitter } from 'lucide-react'
import Modal from '../Modal'
import Avatar from '../Avatar'
import PostFormActions from '../PostFormActions'
import { useToast } from '../../../hooks/useToast'
import type { ImageFile } from '../ImagePreview/types'
import type { CommentModalProps } from './types'
import * as S from './styles'
import CommentForm from '../CommentForm'

const CommentModal = ({
  post,
  isOpen,
  onClose,
  onSubmit,
  userName,
  userAvatar
}: CommentModalProps) => {
  const { showToast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
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

  const handleSubmit = async () => {
    if (!content.trim() && images.length === 0) return

    setIsSubmitting(true)

    try {
      await onSubmit(content, post.id)

      showToast('success', 'Post enviado com sucesso!')

      setContent('')
      images.forEach((img) => URL.revokeObjectURL(img.preview))
      setImages([])

      onClose()
    } catch {
      showToast('error', 'Ocorreu um erro ao postar. Tente novamente.')
    } finally {
      setIsSubmitting(false)
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

  const footer = (
    <S.FooterContainer>
      <PostFormActions
        content={content}
        images={images}
        isDisabled={isDisabled}
        maxLength={280}
        onImageUpload={handleImageUpload}
        onSubmit={handleSubmit}
        loading={isSubmitting}
        submitLabel="Responder"
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
      title={<Twitter size={30} strokeWidth={2} />}
      header={<div />}
      footer={footer}
    >
      <S.ModalContent>
        {/* Post Original */}
        <S.OriginalPost>
          <S.PostAvatar>
            <Avatar
              src={post.author.avatar}
              alt={post.author.displayName}
              size="small"
            />
          </S.PostAvatar>

          <S.PostContent>
            <S.PostHeader>
              <S.AuthorName>{post.author.displayName}</S.AuthorName>
              <S.Username>@{post.author.username}</S.Username>
              <S.Timestamp>· {post.createdAt}</S.Timestamp>
            </S.PostHeader>

            <S.PostText>{post.content}</S.PostText>
          </S.PostContent>
        </S.OriginalPost>

        {/* Replying To */}
        <S.ReplyingTo>
          Respondendo a <span>@{post.author.username}</span>
        </S.ReplyingTo>

        {/* Comment Section */}
        <CommentForm
          userName={userName}
          userAvatar={userAvatar}
          content={content}
          images={images}
          onContentChange={setContent}
          onImagesChange={setImages}
          isModal
          showActions={false}
        />
      </S.ModalContent>
    </Modal>
  )
}

export default CommentModal
