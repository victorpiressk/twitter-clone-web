import type { User } from '../../../../models'

export type EditProfileModalProps = {
  isOpen: boolean
  onClose: () => void
  onSave: (data: User) => void
  currentData: User
}
