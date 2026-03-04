import type { Post } from '../../../../../../types/domain/models'
import type { PostCardVariant } from '../../types'

export type PostCardContentProps = {
  post: Post
  variant: PostCardVariant
}
