import type { Post } from '../../components/common/PostCard/types'

export type PostWithComments = Post & {
  comments: Post[]
}
