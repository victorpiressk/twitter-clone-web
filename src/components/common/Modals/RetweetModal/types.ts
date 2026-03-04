import type { PostWithInteractions } from '../../../../types/domain/models'

export type RetweetModalProps = {
  isOpen: boolean
  onClose: () => void
  originalPost: PostWithInteractions
  userName: string
  userAvatar: string | null
}
