import type { Post, PostMedia } from '../../../../models'

export type CommentModalProps = {
  isOpen: boolean
  onClose: () => void
  originalPost: Post
  onSubmit: (content: string, medias?: PostMedia[]) => Promise<void> | void
  userName: string
  userAvatar: string | null
}
