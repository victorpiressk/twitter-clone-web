import type { Post } from '../../../../types/domain/models'

export type CommentModalProps = {
  isOpen: boolean
  onClose: () => void
  originalPost: Post
  userName: string
  userAvatar: string | null
}
