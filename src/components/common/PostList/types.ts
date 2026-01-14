import type { Post } from '../PostCard/types'

export type PostListProps = {
  posts: Post[]
  onLike: (postId: string) => void
  onRetweet: (postId: string) => void
  onComment: (postId: string) => void
}
