import type { User } from '../../../../types/domain/models'

export type EditProfileModalProps = {
  isOpen: boolean
  onClose: () => void
  onSave: (data: User) => void
  currentData: User
}
