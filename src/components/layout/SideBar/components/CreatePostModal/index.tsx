import FormModal from '../../../../common/Modals/FormModal'
import type { CreatePostModalProps } from './types'

const CreatePostModal = ({
  isOpen,
  onClose,
  userName,
  userAvatar
}: CreatePostModalProps) => (
  <FormModal
    isOpen={isOpen}
    onClose={onClose}
    userName={userName}
    userAvatar={userAvatar}
    placeholder="O que está acontecendo?"
    submitLabel="Postar"
    successMessage="Post criado com sucesso!"
    errorMessage="Erro ao criar post. Tente novamente."
    maxLength={280}
    modalSize="medium"
    mode="create"
  />
)

export default CreatePostModal
