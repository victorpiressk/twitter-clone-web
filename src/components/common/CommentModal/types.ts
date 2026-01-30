import type { Post } from '../PostCard/types'

export type CommentModalProps = {
  post: Post
  isOpen: boolean
  onClose: () => void
  onSubmit: (postId: string, content: string) => void
  userName?: string
  userAvatar?: string
}
