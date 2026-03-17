import type { PostWithInteractions } from '../../../../types/domain/models'
import type { PostCardVariant } from '../PostCard/types'

export type PostListProps = {
  posts: PostWithInteractions[]
  variant?: PostCardVariant
}
