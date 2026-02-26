import type { PostMedia } from '../../../types/domain/models'

export type SidebarProps = {
  onCreatePost: (content: string, images?: PostMedia[]) => Promise<void> | void
}
