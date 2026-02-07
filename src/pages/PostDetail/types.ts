import type { PostWithInteractions } from '../../components/common/Posts/PostCard/types'

export type PostWithComments = PostWithInteractions & {
  comments: PostWithInteractions[]
}
