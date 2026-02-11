import type { PostMedia } from '../../../../../models'

export type CreatePostModalProps = {
  isOpen: boolean
  onClose: () => void
  onSubmit: (content: string, images?: PostMedia[]) => Promise<void> | void
  userName: string
  userAvatar: string | null
}
