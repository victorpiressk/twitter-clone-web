import type { MediaFile } from '../../Forms/MediaPreview/types'
import type { PostCardVariant } from '../PostCard/types'
import type { PostWithInteractions } from '../PostCard/types'

export type PostListProps = {
  posts: PostWithInteractions[]
  onLike: (postId: number) => void
  onRetweet: (postId: number) => void
  onQuoteTweet: (postId: number, content: string, medias?: MediaFile[]) => void
  onComment: (postId: number, content: string, medias?: MediaFile[]) => void
  variant?: PostCardVariant
}
