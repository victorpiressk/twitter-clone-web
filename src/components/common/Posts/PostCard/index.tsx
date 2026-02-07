import { useState, useRef, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { MessageCircle, Repeat2, Heart, BarChart2 } from 'lucide-react'
import { useToast } from '../../../../hooks/useToast'
import { usePost } from '../../../../hooks/usePost' // Importante para buscar o original
import Avatar from '../../Avatar'
import RetweetPopover from '../../Popovers/RetweetPopover'
import RetweetModal from '../../Modals/RetweetModal'
import type { PostCardProps } from './types'
import * as S from './styles'
import CommentModal from '../../Modals/CommentModal'
import { colors } from '../../../../styles/globalStyles'
import type { ImageFile } from '../ImagePreview/types'
import { formatDate } from '../../../../utils'
import OriginalPostEmbed from '../OriginalPostEmbed'

const PostCard = ({
  post,
  variant = 'default',
  onLike,
  onRetweet,
  onQuoteTweet,
  onComment
}: PostCardProps) => {
  const navigate = useNavigate()
  const { showToast } = useToast()
  const { posts } = usePost()

  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false)
  const [isRetweetPopoverOpen, setIsRetweetPopoverOpen] = useState(false)
  const [isRetweetModalOpen, setIsRetweetModalOpen] = useState(false)
  const retweetButtonRef = useRef<HTMLButtonElement>(null)

  // Mantemos o estado local para feedback imediato
  const [localPost, setLocalPost] = useState(post)

  // --- LÓGICA DE CONTEÚDO (REPOST) ---
  const isSimpleRetweet = !!localPost.retweet_of && !localPost.retweet_comment

  const displayPost = useMemo(() => {
    let current = localPost

    // Enquanto o post atual for um retweet simples e houver uma referência válida,
    // continuamos "subindo" na árvore para achar a fonte original.
    while (current.retweet_of && !current.retweet_comment) {
      const original = posts.find((p) => p.id === current.retweet_of)
      if (!original) break // Segurança caso o post original não esteja carregado
      current = original
    }

    return current
  }, [localPost, posts])

  const formatNumber = (num: number): string => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toString()
  }

  const handleClickPost = () => {
    if (variant === 'default') {
      navigate(`/${displayPost.author.username}/status/${displayPost.id}`)
    }
  }

  const handleClickProfile = (e: React.MouseEvent) => {
    e.stopPropagation()
    navigate(`/${displayPost.author.username}`)
  }

  const handleCommentSubmit = (content: string, images?: ImageFile[]) => {
    setLocalPost((prev) => ({
      ...prev,
      stats: { ...prev.stats, comments: prev.stats.comments + 1 }
    }))
    onComment(content, images)
  }

  const handleRetweetSimple = () => {
    onRetweet(post.id)
    setIsRetweetPopoverOpen(false)
    if (!post.is_retweeted) showToast('success', 'Retweetado!')
  }

  const handleQuoteTweet = (content: string, images?: ImageFile[]) => {
    onQuoteTweet(post.id, content, images) // ← Chama callback do Context
  }

  return (
    <S.Wrapper>
      {/* Indicador de quem retweetou (Apenas em retweets simples) */}
      {isSimpleRetweet && (
        <S.RetweetIndicator
          onClick={(e) => {
            e.stopPropagation()
            navigate(`/${post.author.username}`)
          }}
        >
          <Repeat2 size={16} strokeWidth={3} />
          <span>{post.author.first_name} republicou</span>
        </S.RetweetIndicator>
      )}

      <S.PostCardContainer
        onClick={handleClickPost}
        $clickable={variant === 'default'}
        $variant={variant}
      >
        {variant === 'default' ? (
          /* --- LAYOUT FEED (LATERAL) --- */
          <>
            <Avatar
              src={displayPost.author.profile_image}
              alt={displayPost.author.first_name}
              size="small"
              onClick={handleClickProfile}
              showProfilePopover={true}
              userProfileData={{
                id: displayPost.author.id,
                username: displayPost.author.username,
                displayName: displayPost.author.first_name,
                avatar: displayPost.author.profile_image,
                bio: displayPost.author.bio,
                stats: { following: 123, followers: 456 },
                isFollowing: displayPost.author.isFollowing
              }}
            />

            <S.PostContent>
              <S.PostHeader>
                <S.DisplayName onClick={handleClickProfile}>
                  {displayPost.author.first_name}
                </S.DisplayName>
                <S.Username onClick={handleClickProfile}>
                  @{displayPost.author.username}
                </S.Username>
                <S.Separator>·</S.Separator>
                <S.PostDate>
                  {formatDate(displayPost.created_at, 'feed')}
                </S.PostDate>
              </S.PostHeader>

              <S.PostText $variant={variant}>{displayPost.content}</S.PostText>

              {/* ✅ ADICIONAR: Renderiza post citado (Quote) */}
              {displayPost.retweet_comment && (
                <OriginalPostEmbed post={displayPost.retweet_comment} />
              )}

              {displayPost.media && displayPost.media.length > 0 && (
                <S.ImagesGrid $count={displayPost.media.length}>
                  {displayPost.media.map((media, idx) => (
                    <S.PostImage
                      key={media.id || idx}
                      src={media.url}
                      alt="Media"
                    />
                  ))}
                </S.ImagesGrid>
              )}
            </S.PostContent>
          </>
        ) : (
          /* --- LAYOUT DETALHE (STACKED) --- */
          <>
            <S.PostHeaderStacked>
              <Avatar
                src={displayPost.author.profile_image}
                size="small"
                onClick={handleClickProfile}
              />
              <div>
                <S.DisplayName onClick={handleClickProfile}>
                  {displayPost.author.first_name}
                </S.DisplayName>
                <S.Username onClick={handleClickProfile}>
                  @{displayPost.author.username}
                </S.Username>
              </div>
            </S.PostHeaderStacked>

            <S.PostContent>
              <S.PostText $variant={variant}>{displayPost.content}</S.PostText>

              {displayPost.media && displayPost.media.length > 0 && (
                <S.ImagesGrid $count={displayPost.media.length}>
                  {displayPost.media.map((media, idx) => (
                    <S.PostImage
                      key={media.id || idx}
                      src={media.url}
                      alt="Media"
                    />
                  ))}
                </S.ImagesGrid>
              )}

              <S.PostDateDetailed>
                {formatDate(displayPost.created_at, 'detail')}
              </S.PostDateDetailed>
            </S.PostContent>
          </>
        )}

        {/* --- AÇÕES (COMUNS A AMBOS OS LAYOUTS) --- */}
        <S.PostActions $variant={variant}>
          <S.ActionButton
            onClick={(e) => {
              e.stopPropagation()
              setIsCommentModalOpen(true)
            }}
            $color={colors.primary}
          >
            <MessageCircle size={18} strokeWidth={2} />
            <span>{formatNumber(displayPost.stats.comments)}</span>
          </S.ActionButton>

          <S.ActionButton
            ref={retweetButtonRef}
            onClick={(e) => {
              e.stopPropagation()
              setIsRetweetPopoverOpen(true)
            }}
            $active={displayPost.is_retweeted}
            $color={colors.success}
          >
            <Repeat2 size={18} strokeWidth={2} />
            <span>{formatNumber(displayPost.stats.retweets)}</span>
          </S.ActionButton>

          <S.ActionButton
            onClick={(e) => {
              e.stopPropagation()
              onLike(displayPost.id)
            }}
            $active={displayPost.is_liked}
            $color={colors.like}
          >
            <Heart
              size={18}
              strokeWidth={2}
              fill={displayPost.is_liked ? 'currentColor' : 'none'}
            />
            <span>{formatNumber(displayPost.stats.likes)}</span>
          </S.ActionButton>

          <S.ActionButton>
            <BarChart2 size={18} strokeWidth={2} />
            <span>{formatNumber(displayPost.stats.views)}</span>
          </S.ActionButton>
        </S.PostActions>
      </S.PostCardContainer>

      {/* Modais usando displayPost para garantir que você responde ao post certo */}
      <CommentModal
        isOpen={isCommentModalOpen}
        onClose={() => setIsCommentModalOpen(false)}
        originalPost={{
          id: displayPost.id,
          author: {
            name: displayPost.author.first_name,
            username: displayPost.author.username,
            avatar: displayPost.author.profile_image
          },
          content: displayPost.content,
          createdAt: displayPost.created_at,
          images: displayPost.media
        }}
        onSubmit={handleCommentSubmit}
        userAvatar={displayPost.author.profile_image}
        userName={displayPost.author.username}
      />

      <RetweetPopover
        isOpen={isRetweetPopoverOpen}
        onClose={() => setIsRetweetPopoverOpen(false)}
        onRetweet={handleRetweetSimple}
        onQuote={() => {
          setIsRetweetPopoverOpen(false)
          setIsRetweetModalOpen(true)
        }}
        isRetweeted={displayPost.is_retweeted}
        triggerRef={retweetButtonRef}
      />

      <RetweetModal
        isOpen={isRetweetModalOpen}
        onClose={() => setIsRetweetModalOpen(false)}
        originalPost={{
          id: displayPost.id,
          author: {
            name: displayPost.author.first_name,
            username: displayPost.author.username,
            avatar: displayPost.author.profile_image
          },
          content: displayPost.content,
          createdAt: displayPost.created_at,
          images: displayPost.media
        }}
        onSubmit={handleQuoteTweet}
        userAvatar={displayPost.author.profile_image}
        userName={displayPost.author.username}
      />
    </S.Wrapper>
  )
}

export default PostCard
