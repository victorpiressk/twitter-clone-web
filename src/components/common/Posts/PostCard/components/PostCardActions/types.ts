import type { PostWithInteractions } from '../../../../../../types/domain/models'
import type { PostCardVariant } from '../../types'

export type PostCardActionsProps = {
  post: PostWithInteractions
  variant: PostCardVariant
  onComment: (e: React.MouseEvent) => void
  onRetweet: (e: React.MouseEvent) => void
  onLike: (e: React.MouseEvent) => void
  retweetRef: React.RefObject<HTMLButtonElement | null>
}
