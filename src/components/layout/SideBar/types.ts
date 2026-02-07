import type { ImageFile } from '../../../components/common/Posts/ImagePreview/types'

export type SidebarProps = {
  userName: string
  userAvatar: string
  userDisplayName: string
  onCreatePost: (content: string, images?: ImageFile[]) => Promise<void> | void
}
