import type { PostWithInteractions } from '../../../../../../types/domain/models'

export type EditPostModalProps = {
  isOpen: boolean
  onClose: () => void
  userName: string
  userAvatar: string | null
  post: PostWithInteractions
}
