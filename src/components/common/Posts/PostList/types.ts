import type { ImageFile } from '../ImagePreview/types'
import type { PostCardVariant } from '../PostCard/types'
import type { PostWithInteractions } from '../PostCard/types'

export type PostListProps = {
  posts: PostWithInteractions[]
  onLike: (postId: number) => void
  onRetweet: (postId: number) => void
  onQuoteTweet: (postId: number, content: string, images?: ImageFile[]) => void
  onComment: (content: string, images?: ImageFile[]) => void
  variant?: PostCardVariant
}
