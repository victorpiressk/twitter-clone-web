import FormModal from '../../../../Modals/FormModal'
import type { EditPostModalProps } from './types'

const EditPostModal = ({
  isOpen,
  onClose,
  post,
  userName,
  userAvatar
}: EditPostModalProps) => (
  <FormModal
    isOpen={isOpen}
    onClose={onClose}
    userName={userName}
    userAvatar={userAvatar}
    placeholder="O que está acontecendo?"
    submitLabel="Postar"
    successMessage="Post editado com sucesso!"
    errorMessage="Erro ao editar post. Tente novamente."
    maxLength={280}
    modalSize="medium"
    mode="edit"
    originalPostId={post.id}
  />
)

export default EditPostModal
