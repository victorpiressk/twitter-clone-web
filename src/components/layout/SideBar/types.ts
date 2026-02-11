import type { PostMedia } from '../../../models'

export type SidebarProps = {
  onCreatePost: (content: string, images?: PostMedia[]) => Promise<void> | void
}
