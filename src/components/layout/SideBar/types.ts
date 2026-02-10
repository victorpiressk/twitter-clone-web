import type { ImageFile } from '../../common/Forms/ImagePreview/types'

export type SidebarProps = {
  userName: string
  userAvatar: string
  userDisplayName: string
  onCreatePost: (content: string, images?: ImageFile[]) => Promise<void> | void
}
