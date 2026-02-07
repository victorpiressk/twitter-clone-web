import type { ImageFile } from '../../../../common/Posts/ImagePreview/types'

export type CreatePostModalProps = {
  isOpen: boolean
  onClose: () => void
  onSubmit: (content: string, images?: ImageFile[]) => Promise<void> | void
  userName: string
  userAvatar: string
}
