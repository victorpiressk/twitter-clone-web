import type { Post } from '../../../../../../types/domain/models'

export type PostCardMenuProps = {
  post: Post
  onEditClick: () => void
}
