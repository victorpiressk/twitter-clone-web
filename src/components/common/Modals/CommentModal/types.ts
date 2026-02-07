import type { ImageFile } from '../../Posts/ImagePreview/types'
import type { PostMedia } from '../../Posts/PostCard/types'

export type CommentModalProps = {
  isOpen: boolean
  onClose: () => void
  originalPost: {
    id: number
    author: {
      name: string
      username: string
      avatar: string | null
    }
    content: string
    createdAt: string
    images?: PostMedia[]
  }
  onSubmit: (content: string, images?: ImageFile[]) => Promise<void> | void
  userName: string
  userAvatar: string | null
}
