import OriginalPostPreview from '../../Posts/OriginalPostPreview'
import FormModal from '../FormModal'
import type { CommentModalProps } from './types'

const CommentModal = ({
  isOpen,
  onClose,
  originalPost,
  userName,
  userAvatar
}: CommentModalProps) => {
  return (
    <FormModal
      isOpen={isOpen}
      onClose={onClose}
      userName={userName}
      userAvatar={userAvatar}
      placeholder="Poste sua resposta"
      submitLabel="Responder"
      successMessage="Comentário enviado com sucesso!"
      errorMessage="Erro ao enviar comentário. Tente novamente."
      extraContent={<OriginalPostPreview post={originalPost} showConnector />}
      maxLength={280}
      modalSize="medium"
      mode="comment"
      originalPostId={originalPost.id}
    />
  )
}

export default CommentModal
