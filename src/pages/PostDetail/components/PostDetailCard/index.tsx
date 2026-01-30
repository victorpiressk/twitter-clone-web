import { useState } from 'react'
import { MessageCircle, Repeat2, Heart, Bookmark, Share } from 'lucide-react'
import Avatar from '../../../../components/common/Avatar'
import CommentModal from '../../../../components/common/CommentModal'
import type { PostDetailCardProps } from './types'
import { colors } from '../../../../styles/globalStyles'
import * as S from './styles'

const PostDetailCard = ({
  post,
  onLike,
  onRetweet,
  onComment
}: PostDetailCardProps) => {
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false)

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString)
    const time = date.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    })
    const fullDate = date.toLocaleDateString('pt-BR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
    return `${time} · ${fullDate}`
  }

  const formatNumber = (num: number): string => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toString()
  }

  const handleCommentClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsCommentModalOpen(true)
  }

  const handleCommentSubmit = (postId: string, content: string) => {
    onComment(postId) // Incrementa contador
    console.log('Comentário:', { postId, content })
  }

  return (
    <>
      <S.PostDetailContainer>
        <S.PostHeader>
          <Avatar
            src={post.author.avatar}
            alt={post.author.displayName}
            size="small"
          />
          <S.AuthorInfo>
            <S.DisplayName>{post.author.displayName}</S.DisplayName>
            <S.Username>@{post.author.username}</S.Username>
          </S.AuthorInfo>
        </S.PostHeader>

        <S.PostContent>
          <S.PostText>{post.content}</S.PostText>
        </S.PostContent>

        <S.PostDate>
          <S.DateText>{formatDate(post.createdAt)}</S.DateText>
        </S.PostDate>

        <S.PostStats>
          {post.stats.comments > 0 && (
            <S.StatItem onClick={() => console.log('Ver respostas')}>
              <S.StatNumber>{formatNumber(post.stats.comments)}</S.StatNumber>
              <S.StatLabel>Respostas</S.StatLabel>
            </S.StatItem>
          )}

          {post.stats.retweets > 0 && (
            <S.StatItem onClick={() => console.log('Ver retweets')}>
              <S.StatNumber>{formatNumber(post.stats.retweets)}</S.StatNumber>
              <S.StatLabel>Retweets</S.StatLabel>
            </S.StatItem>
          )}

          {post.stats.likes > 0 && (
            <S.StatItem onClick={() => console.log('Ver curtidas')}>
              <S.StatNumber>{formatNumber(post.stats.likes)}</S.StatNumber>
              <S.StatLabel>Curtidas</S.StatLabel>
            </S.StatItem>
          )}

          {post.stats.views > 0 && (
            <S.StatItem onClick={() => console.log('Ver visualizações')}>
              <S.StatNumber>{formatNumber(post.stats.views)}</S.StatNumber>
              <S.StatLabel>Visualizações</S.StatLabel>
            </S.StatItem>
          )}
        </S.PostStats>

        <S.PostActions>
          {/* Comentar */}
          <S.ActionButton onClick={handleCommentClick} $color={colors.primary}>
            <MessageCircle size={20} strokeWidth={2} />
          </S.ActionButton>

          {/* Retweet */}
          <S.ActionButton
            onClick={onRetweet}
            $active={post.isRetweeted}
            $color={colors.success}
          >
            <Repeat2 size={20} strokeWidth={2} />
          </S.ActionButton>

          {/* Like */}
          <S.ActionButton
            onClick={onLike}
            $active={post.isLiked}
            $color={colors.like}
          >
            <Heart
              size={20}
              strokeWidth={2}
              fill={post.isLiked ? 'currentColor' : 'none'}
            />
          </S.ActionButton>

          {/* Bookmark */}
          <S.ActionButton $color={colors.primary}>
            <Bookmark size={20} strokeWidth={2} />
          </S.ActionButton>

          {/* Share */}
          <S.ActionButton $color={colors.primary}>
            <Share size={20} strokeWidth={2} />
          </S.ActionButton>
        </S.PostActions>
      </S.PostDetailContainer>

      {/* Modal de Comentário */}
      <CommentModal
        isOpen={isCommentModalOpen}
        onClose={() => setIsCommentModalOpen(false)}
        post={post}
        onComment={handleCommentSubmit}
        currentUserAvatar={undefined} // TODO: pegar do AuthContext
        currentUserName="Você"
      />
    </>
  )
}

export default PostDetailCard
