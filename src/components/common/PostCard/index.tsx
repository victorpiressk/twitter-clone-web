import { useNavigate } from 'react-router-dom'
import { MessageCircle, Repeat2, Heart, BarChart2 } from 'lucide-react'
import Avatar from '../Avatar'
import type { PostCardProps } from './types'
import * as S from './styles'

const PostCard = ({ post, onLike, onRetweet, onComment }: PostCardProps) => {
  const navigate = useNavigate()

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 1) return 'agora'
    if (diffMins < 60) return `${diffMins}min`
    if (diffHours < 24) return `${diffHours}h`
    if (diffDays < 7) return `${diffDays}d`

    return date.toLocaleDateString('pt-BR', { day: 'numeric', month: 'short' })
  }

  const formatNumber = (num: number): string => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toString()
  }

  const handleClickPost = () => {
    navigate(`/${post.author.username}/status/${post.id}`)
  }

  return (
    <S.PostCardContainer onClick={handleClickPost}>
      <Avatar
        src={post.author.avatar}
        alt={post.author.displayName}
        size="medium"
      />

      <S.PostContent>
        <S.PostHeader>
          <S.DisplayName>{post.author.displayName}</S.DisplayName>
          <S.Username>@{post.author.username}</S.Username>
          <S.Separator>·</S.Separator>
          <S.PostDate>{formatDate(post.createdAt)}</S.PostDate>
        </S.PostHeader>

        <S.PostText>{post.content}</S.PostText>

        <S.PostActions>
          {/* Comentar */}
          <S.ActionButton
            onClick={(e) => {
              e.stopPropagation()
              onComment(post.id)
            }}
            $color="#1d9bf0"
          >
            <MessageCircle size={18} strokeWidth={2} />
            <span>{formatNumber(post.stats.comments)}</span>
          </S.ActionButton>

          {/* Retweet */}
          <S.ActionButton
            onClick={(e) => {
              e.stopPropagation()
              onRetweet(post.id)
            }}
            $active={post.isRetweeted}
            $color="#00ba7c"
          >
            <Repeat2 size={18} strokeWidth={2} />
            <span>{formatNumber(post.stats.retweets)}</span>
          </S.ActionButton>

          {/* Like */}
          <S.ActionButton
            onClick={(e) => {
              e.stopPropagation()
              onLike(post.id)
            }}
            $active={post.isLiked}
            $color="#f91880"
          >
            <Heart
              size={18}
              strokeWidth={2}
              fill={post.isLiked ? 'currentColor' : 'none'}
            />
            <span>{formatNumber(post.stats.likes)}</span>
          </S.ActionButton>

          {/* Views */}
          <S.ActionButton>
            <BarChart2 size={18} strokeWidth={2} />
            <span>{formatNumber(post.stats.views)}</span>
          </S.ActionButton>
        </S.PostActions>
      </S.PostContent>
    </S.PostCardContainer>
  )
}

export default PostCard
