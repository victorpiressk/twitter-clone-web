import { MessageCircle, Repeat2, Heart, BarChart2 } from 'lucide-react'
import type { PostCardActionsProps } from './types'
import { colors } from '../../../../../../styles/globalStyles'
import * as S from './styles'

const PostCardActions = ({
  post,
  variant,
  onComment,
  onRetweet,
  onLike,
  retweetRef
}: PostCardActionsProps) => {
  // ✅ Safety check
  if (!post) return null

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toString()
  }

  // ✅ Handler com stopPropagation
  const handleComment = (e: React.MouseEvent) => {
    e.stopPropagation()
    onComment(e)
  }

  // ✅ Handler com stopPropagation
  const handleRetweet = (e: React.MouseEvent) => {
    e.stopPropagation()
    onRetweet(e)
  }

  // ✅ Handler com stopPropagation
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
