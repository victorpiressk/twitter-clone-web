import type { PostMedia, PostWithInteractions } from '../../../../models'

export type RetweetModalProps = {
  isOpen: boolean
  onClose: () => void
  originalPost: PostWithInteractions
  onSubmit: (content: string, medias?: PostMedia[]) => Promise<void> | void
  userName: string
  userAvatar: string | null
}
