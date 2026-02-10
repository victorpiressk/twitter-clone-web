import FormModal from '../FormModal'
import OriginalPostPreview from '../../Posts/OriginalPostPreview'
import type { CommentModalProps } from './types'

const CommentModal = ({
  isOpen,
  onClose,
  originalPost,
  onSubmit,
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
      onSubmit={onSubmit}
      maxLength={280}
      modalSize="medium"
      mode="comment"
    />
  )
}

export default CommentModal
