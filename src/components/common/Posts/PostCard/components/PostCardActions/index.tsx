import { MessageCircle, Repeat2, Heart, BarChart2 } from 'lucide-react'
import { colors } from '../../../../../../styles/globalStyles'
import { formatNumber } from '../../../../../../utils/formatNumber'
import * as S from './styles'
import type { PostCardActionsProps } from './types'

const PostCardActions = ({
  post,
  variant,
  onComment,
  onRetweet,
  onLike,
  retweetRef
}: PostCardActionsProps) => {
  if (!post) return null

  const handleComment = (e: React.MouseEvent) => {
    e.stopPropagation()
    onComment(e)
  }

  const handleRetweet = (e: React.MouseEvent) => {
    e.stopPropagation()
    onRetweet(e)
  }

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation()
    onLike(e)
  }

  return (
    <S.PostActions $variant={variant}>
      <S.ActionButton onClick={handleComment} $color={colors.primary}>
        <MessageCircle size={18} strokeWidth={2} />
        <span>{formatNumber(post.stats.replies)}</span>
      </S.ActionButton>

      <S.ActionButton
        ref={retweetRef}
        onClick={handleRetweet}
        $active={post.isRetweeted}
        $color={colors.success}
      >
        <Repeat2 size={18} strokeWidth={2} />
        <span>{formatNumber(post.stats.retweets)}</span>
      </S.ActionButton>

      <S.ActionButton
        onClick={handleLike}
        $active={post.isLiked}
        $color={colors.like}
      >
        <Heart
          size={18}
          strokeWidth={2}
          fill={post.isLiked ? 'currentColor' : 'none'}
        />
        <span>{formatNumber(post.stats.likes)}</span>
      </S.ActionButton>

      <S.ActionButton>
        <BarChart2 size={18} strokeWidth={2} />
        <span>{formatNumber(post.stats.views)}</span>
      </S.ActionButton>
    </S.PostActions>
  )
}

export default PostCardActions
