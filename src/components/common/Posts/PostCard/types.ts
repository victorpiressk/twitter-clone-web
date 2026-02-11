import type { PostMedia, PostWithInteractions } from '../../../../models'

export type PostCardVariant = 'default' | 'detailed'

export type PostCardProps = {
  post: PostWithInteractions
  variant?: PostCardVariant
  onLike: (postId: number) => void
  onRetweet: (postId: number) => void
  onQuoteTweet: (postId: number, content: string, medias?: PostMedia[]) => void
  onComment: (postId: number, content: string, medias?: PostMedia[]) => void
}
