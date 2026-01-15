import type { Post } from '../../../../components/common/PostCard/types'

export type PostDetailCardProps = {
  post: Post
  onLike: () => void
  onRetweet: () => void
}
