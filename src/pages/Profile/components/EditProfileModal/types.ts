import type { User } from '../../../../types/domain/models'
import type { UpdateUserRequest } from '../../../../types/domain/requests'

export type EditProfileModalProps = {
  isOpen: boolean
  onClose: () => void
  onSave: (data: UpdateUserRequest) => Promise<void>
  currentData: User
}
