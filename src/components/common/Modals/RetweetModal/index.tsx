import FormModal from '../FormModal'
import OriginalPostEmbed from '../../Posts/OriginalPostEmbed'
import type { RetweetModalProps } from './types'

const RetweetModal = ({
  isOpen,
  onClose,
  originalPost,
  onSubmit,
  userName,
  userAvatar
}: RetweetModalProps) => {
  return (
    <FormModal
      isOpen={isOpen}
      onClose={onClose}
      userName={userName}
      userAvatar={userAvatar}
      placeholder="Adicionar um comentário"
      submitLabel="Postar"
      successMessage="Retweet enviado com sucesso!"
      errorMessage="Erro ao enviar Retweet. Tente novamente."
      extraContent={<OriginalPostEmbed post={originalPost} />}
      onSubmit={onSubmit}
      maxLength={280}
      modalSize="medium"
      mode="retweet"
    />
  )
}

export default RetweetModal
