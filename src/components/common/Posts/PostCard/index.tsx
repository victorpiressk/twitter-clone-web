import { useState, useRef, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { MessageCircle, Repeat2, Heart, BarChart2 } from 'lucide-react'
import Avatar from '../../Avatar'
import RetweetPopover from '../../Popovers/RetweetPopover'
import RetweetModal from '../../Modals/RetweetModal'
import CommentModal from '../../Modals/CommentModal'
import OriginalPostEmbed from '../OriginalPostEmbed'
import LocationPreview from '../../Forms/LocationPreview'
import PollPreview from '../../Forms/PollPreview'
import SchedulePreview from '../../Forms/SchedulePreview'
import { formatDate } from '../../../../utils/formatDate'
import { useToast } from '../../../../hooks/useToast'
import { usePost } from '../../../../hooks/usePost'
import type { PostCardProps } from './types'
import { colors } from '../../../../styles/globalStyles'
import * as S from './styles'
import type { PostMedia } from '../../../../types/domain/models'

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

  // Estado de voto (mockado por enquanto)
  const [hasVoted, setHasVoted] = useState(false)

  // --- LÓGICA DE CONTEÚDO (REPOST) ---
  // Retweet Simples: is_retweet=true + content vazio
  const isSimpleRetweet = !!post.retweetOf && !post.content.trim()

  // Quote Tweet: is_retweet=true + content não-vazio
  const isQuoteTweet = !!post.retweetOf && !!post.content.trim()

  const displayPost = useMemo(() => {
    let current = post

    while (current.retweetOf && !current.isRetweeted) {
      const original = posts.find((p) => p.id === current.retweetOf)
      if (!original) break
      current = original
    }

    return current
  }, [post, posts])

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

  const handleCommentSubmit = (content: string, medias?: PostMedia[]) => {
    onComment(displayPost.id, content, medias)
  }

  const handleRetweetSimple = () => {
    onRetweet(displayPost.id)
    setIsRetweetPopoverOpen(false)
    if (!displayPost.isRetweeted) showToast('success', 'Retweetado!')
  }

  const handleQuoteTweet = (content: string, medias?: PostMedia[]) => {
    onQuoteTweet(displayPost.id, content, medias)
  }

  const handleVote = (optionIndex: number) => {
    // TODO: Integrar com API
    console.log('Votou na opção:', optionIndex)
    setHasVoted(true)
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
          <span>
            {post.author.firstName} {post.author.lastName} republicou
          </span>
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
            {/* Container para Avatar + Content (em linha) */}
            <S.PostMainContent>
              <Avatar
                src={displayPost.author.avatar}
                alt={displayPost.author.firstName}
                size="small"
                onClick={handleClickProfile}
                showProfilePopover={true}
                userProfileData={{
                  id: displayPost.author.id,
                  username: displayPost.author.username,
                  firstName: displayPost.author.firstName,
                  lastName: displayPost.author.lastName,
                  avatar: displayPost.author.avatar,
                  bio: displayPost.author.bio,
                  stats: {
                    following: displayPost.author.stats.following,
                    followers: displayPost.author.stats.followers
                  },
                  isFollowing: displayPost.author.isFollowing
                }}
              />

              <S.PostContent>
                <S.PostHeader>
                  <S.DisplayName onClick={handleClickProfile}>
                    {displayPost.author.firstName} {displayPost.author.lastName}
                  </S.DisplayName>
                  <S.Username onClick={handleClickProfile}>
                    @{displayPost.author.username}
                  </S.Username>
                  <S.Separator>·</S.Separator>
                  <S.PostDate>
                    {formatDate(displayPost.createdAt, 'feed')}
                  </S.PostDate>
                </S.PostHeader>

                <S.PostText $variant={variant}>
                  {displayPost.content}
                </S.PostText>

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

                {/* Renderiza post citado (Quote) */}
                {isQuoteTweet && <OriginalPostEmbed post={displayPost} />}

                {/* PollPreview (modo display) */}
                {displayPost.poll && (
                  <PollPreview
                    question={displayPost.poll.question || ''}
                    options={displayPost.poll.options}
                    variant="display"
                    totalVotes={displayPost.poll.totalVotes || 0}
                    votes={displayPost.poll.options.reduce(
                      (acc, opt) => {
                        acc[opt.text] = opt.votes
                        return acc
                      },
                      {} as Record<string, number>
                    )}
                    hasVoted={hasVoted}
                    onVote={handleVote}
                  />
                )}

                {/* SchedulePreview (modo display) */}
                {displayPost.scheduledFor && (
                  <SchedulePreview
                    scheduledDate={new Date(displayPost.scheduledFor)}
                    variant="display"
                  />
                )}

                {/* LocationPreview (modo display) */}
                {displayPost.location && (
                  <LocationPreview
                    locationName={displayPost.location.name}
                    variant="display"
                  />
                )}
              </S.PostContent>
            </S.PostMainContent>

            {/* Actions FORA do PostContent, mas ainda dentro do container */}
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
                $active={displayPost.isRetweeted}
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
                $active={displayPost.isLiked}
                $color={colors.like}
              >
                <Heart
                  size={18}
                  strokeWidth={2}
                  fill={displayPost.isLiked ? 'currentColor' : 'none'}
                />
                <span>{formatNumber(displayPost.stats.likes)}</span>
              </S.ActionButton>

              <S.ActionButton>
                <BarChart2 size={18} strokeWidth={2} />
                <span>{formatNumber(displayPost.stats.views)}</span>
              </S.ActionButton>
            </S.PostActions>
          </>
        ) : (
          /* --- LAYOUT DETALHE (STACKED) --- */
          <>
            <S.PostHeaderStacked>
              <Avatar
                src={displayPost.author.avatar}
                size="small"
                onClick={handleClickProfile}
              />
              <div>
                <S.DisplayName onClick={handleClickProfile}>
                  {displayPost.author.firstName} {displayPost.author.lastName}
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

              {/* Renderiza post citado no modo detailed também */}
              {isQuoteTweet && <OriginalPostEmbed post={post} />}

              {/* PollPreview (modo display) */}
              {displayPost.poll && (
                <PollPreview
                  question={displayPost.poll.question || ''}
                  options={displayPost.poll.options}
                  variant="display"
                  totalVotes={displayPost.poll.totalVotes || 0}
                  votes={displayPost.poll.options.reduce(
                    (acc, opt) => {
                      acc[opt.text] = opt.votes
                      return acc
                    },
                    {} as Record<string, number>
                  )}
                  hasVoted={hasVoted}
                  onVote={handleVote}
                />
              )}

              {/* SchedulePreview (modo display) */}
              {displayPost.scheduledFor && (
                <SchedulePreview
                  scheduledDate={new Date(displayPost.scheduledFor)}
                  variant="display"
                />
              )}

              {/* LocationPreview (modo display) */}
              {displayPost.location && (
                <LocationPreview
                  locationName={displayPost.location.name}
                  variant="display"
                />
              )}

              <S.PostDateDetailed>
                {formatDate(displayPost.createdAt, 'detail')}
              </S.PostDateDetailed>
            </S.PostContent>

            {/* Actions no modo detailed (já está correto aqui) */}
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
                $active={displayPost.isRetweeted}
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
                $active={displayPost.isLiked}
                $color={colors.like}
              >
                <Heart
                  size={18}
                  strokeWidth={2}
                  fill={displayPost.isLiked ? 'currentColor' : 'none'}
                />
                <span>{formatNumber(displayPost.stats.likes)}</span>
              </S.ActionButton>

              <S.ActionButton>
                <BarChart2 size={18} strokeWidth={2} />
                <span>{formatNumber(displayPost.stats.views)}</span>
              </S.ActionButton>
            </S.PostActions>
          </>
        )}
      </S.PostCardContainer>

      {/* Modais */}
      <CommentModal
        isOpen={isCommentModalOpen}
        onClose={() => setIsCommentModalOpen(false)}
        originalPost={displayPost}
        onSubmit={handleCommentSubmit}
        userAvatar={displayPost.author.avatar}
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
        isRetweeted={displayPost.isRetweeted}
        triggerRef={retweetButtonRef}
      />

      <RetweetModal
        isOpen={isRetweetModalOpen}
        onClose={() => setIsRetweetModalOpen(false)}
        originalPost={displayPost}
        onSubmit={handleQuoteTweet}
        userName={displayPost.author.username}
        userAvatar={displayPost.author.avatar}
      />
    </S.Wrapper>
  )
}

export default PostCard
