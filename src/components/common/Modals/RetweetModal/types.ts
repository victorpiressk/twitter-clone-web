import type { MediaFile } from '../../Forms/MediaPreview/types'
import type { PostWithInteractions } from '../../Posts/PostCard/types'

export type RetweetModalProps = {
  isOpen: boolean
  onClose: () => void
  originalPost: PostWithInteractions
  onSubmit: (content: string, medias?: MediaFile[]) => Promise<void> | void
  userName: string
  userAvatar: string | null
}
