import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MessageCircle, Repeat2, Heart, BarChart2 } from 'lucide-react'
import Avatar from '../Avatar'
import type { PostCardProps } from './types'
import * as S from './styles'
import CommentModal from '../CommentModal'
import { colors } from '../../../styles/globalStyles'

const PostCard = ({ post, onLike, onRetweet, onComment }: PostCardProps) => {
  const navigate = useNavigate()
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false)
  const [localPost, setLocalPost] = useState(post)

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

  // Navega para o post
  const handleClickPost = () => {
    navigate(`/${post.author.username}/status/${post.id}`)
  }

  // Navega para o perfil do autor
  const handleClickProfile = (e: React.MouseEvent) => {
    e.stopPropagation() // Impede navegação para o post
    navigate(`/${post.author.username}`)
  }

  const handleCommentClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsCommentModalOpen(true)
  }

  const handleCommentSubmit = (postId: string, content: string) => {
    // Incrementa contador localmente
    setLocalPost((prev) => ({
      ...prev,
      stats: {
        ...prev.stats,
        comments: prev.stats.comments + 1
      }
    }))

    onComment(postId) // Chama callback do pai (se existir)
    console.log('Comentário:', { postId, content })
  }

  return (
    <>
      <S.PostCardContainer onClick={handleClickPost}>
        <Avatar
          src={post.author.avatar}
          alt={post.author.displayName}
          size="small"
          onClick={handleClickProfile}
          showProfilePopover={true}
          userProfileData={{
            id: post.author.id,
            username: post.author.username,
            displayName: post.author.displayName,
            avatar: post.author.avatar,
            bio: post.author.bio,
            stats: {
              following: 123, // mock
              followers: 456 // mock
            },
            isFollowing: post.author.isFollowing
          }}
          onFollowToggle={(userId) => console.log('Follow toggle:', userId)}
        />

        <S.PostContent>
          <S.PostHeader>
            <S.DisplayName onClick={handleClickProfile}>
              {post.author.displayName}
            </S.DisplayName>
            <S.Username onClick={handleClickProfile}>
              @{post.author.username}
            </S.Username>
            <S.Separator>·</S.Separator>
            <S.PostDate>{formatDate(post.createdAt)}</S.PostDate>
          </S.PostHeader>

          <S.PostText>{post.content}</S.PostText>

          <S.PostActions>
            {/* Comentar */}
            <S.ActionButton
              onClick={handleCommentClick}
              $color={colors.primary}
            >
              <MessageCircle size={18} strokeWidth={2} />
              <span>{formatNumber(localPost.stats.comments)}</span>
            </S.ActionButton>

            {/* Retweet */}
            <S.ActionButton
              onClick={(e) => {
                e.stopPropagation()
                onRetweet(post.id)
              }}
              $active={post.isRetweeted}
              $color={colors.success}
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
              $color={colors.like}
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

      {/* Modal de Comentário */}
      <CommentModal
        isOpen={isCommentModalOpen}
        onClose={() => setIsCommentModalOpen(false)}
        post={localPost}
        onSubmit={handleCommentSubmit}
        userAvatar={localPost.author.avatar}
        userName={localPost.author.username}
      />
    </>
  )
}

export default PostCard
