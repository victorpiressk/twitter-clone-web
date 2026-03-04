// src/components/common/Posts/PostCard/PostCard.tsx

import { useState, useRef, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Repeat2 } from 'lucide-react'
import Avatar from '../../Avatar'
import RetweetPopover from '../../Popovers/RetweetPopover'
import RetweetModal from '../../Modals/RetweetModal'
import CommentModal from '../../Modals/CommentModal'
import PostCardContent from './components/PostCardContent'
import PostCardActions from './components/PostCardActions'
import PostCardMenu from './components/PostCardMenu'
import EditPostModal from './components/EditPostModal'
import { useToast, usePostActions } from '../../../../hooks'
import {
  useRetweetPostMutation,
  useUnretweetPostMutation
} from '../../../../store/slices/api/posts' // ✅ IMPORT
import type { PostCardProps } from './types'
import * as S from './styles'
import { formatDate } from '../../../../utils/formatDate'
import { colors } from '../../../../styles/globalStyles'
import { useAppSelector, useAppDispatch } from '../../../../store/hooks'
import { selectCurrentUser } from '../../../../store/slices/auth/authSlice'
import {
  removePost,
  upsertPost
} from '../../../../store/slices/posts/postsSlice'

const PostCard = ({ postId, variant = 'default' }: PostCardProps) => {
  const navigate = useNavigate()
  const { showToast } = useToast()
  const { post, likePost } = usePostActions(postId)
  const dispatch = useAppDispatch()

  const [retweetPost] = useRetweetPostMutation()
  const [unretweetPost] = useUnretweetPostMutation()

  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false)
  const [isRetweetPopoverOpen, setIsRetweetPopoverOpen] = useState(false)
  const [isRetweetModalOpen, setIsRetweetModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const retweetButtonRef = useRef<HTMLButtonElement>(null)

  const currentUser = useAppSelector(selectCurrentUser)

  // ✅ Busca TODOS os posts do byId (selector simples)
  const allPosts = useAppSelector((state) => state.posts.byId)

  // ✅ MEMOIZADO: Só recalcula quando allPosts, currentUser ou postId mudam
  const userRetweets = useMemo(() => {
    if (!currentUser) return []

    return Object.values(allPosts).filter(
      (p) => p.author.id === currentUser.id && p.retweetOf === postId
    )
  }, [allPosts, currentUser, postId])

  // ✅ Separação também memoizada
  const userSimpleRetweet = useMemo(
    () => userRetweets.find((rt) => !rt.content),
    [userRetweets]
  )

  const userQuoteRetweets = useMemo(
    () => userRetweets.filter((rt) => !!rt.content),
    [userRetweets]
  )

  const userMadeQuoteRetweet = userQuoteRetweets.length > 0
  const userMadeSimpleRetweet = !!userSimpleRetweet

  // ✅ Safety check
  if (!post) return null

  const isSimpleRetweet = !!post.retweetOf && !post.content.trim()

  const createTime = new Date(post.createdAt).getTime()
  const updateTime = new Date(post.updatedAt).getTime()
  const isEdited = post.updatedAt && updateTime - createTime > 1000

  // --- HANDLERS ---

  const handleClickPost = () => {
    if (variant === 'default') {
      navigate(`/${post.author.username}/status/${post.id}`)
    }
  }

  const handleClickProfile = (e: React.MouseEvent) => {
    e.stopPropagation()
    navigate(`/${post.author.username}`)
  }

  const handleComment = () => {
    setIsCommentModalOpen(true)
  }

  const handleRetweet = () => {
    setIsRetweetPopoverOpen(true)
  }

  // ✅ Simple Retweet ou Unretweet
  const handleRetweetSimple = async () => {
    try {
      if (userMadeSimpleRetweet && userSimpleRetweet) {
        await unretweetPost(postId).unwrap()
        dispatch(removePost(userSimpleRetweet.id))
        showToast('success', 'Retweet desfeito!')
      } else {
        const newRetweet = await retweetPost(postId).unwrap()
        dispatch(
          upsertPost({
            ...newRetweet,
            isLiked: false,
            isRetweeted: false,
            isBookmarked: false
          })
        )
        showToast('success', 'Retweetado!')
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      showToast('error', error?.data?.detail || 'Erro ao processar retweet')
      console.error('Retweet error:', error)
    } finally {
      setIsRetweetPopoverOpen(false)
    }
  }

  const handleLike = () => {
    likePost()
  }

  return (
    <S.Wrapper>
      {/* Indicador de quem retweetou */}
      {isSimpleRetweet && (
        <S.RetweetIndicator
          onClick={(e) => {
            e.stopPropagation()
            navigate(`/${post.author.username}`)
          }}
        >
          <Repeat2 size={16} strokeWidth={3} color={colors.success} />
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
          <>
            <S.PostMainContent>
              <Avatar
                src={post.author.avatar}
                alt={post.author.username}
                size="small"
                onClick={handleClickProfile}
                showProfilePopover={true}
                userProfileData={post.author}
              />

              <PostCardContent post={post} variant={variant} />

              <PostCardMenu
                post={post}
                onEditClick={() => setIsEditModalOpen(true)}
              />
            </S.PostMainContent>

            <PostCardActions
              post={post}
              variant={variant}
              onComment={handleComment}
              onRetweet={handleRetweet}
              onLike={handleLike}
              retweetRef={retweetButtonRef}
            />
          </>
        ) : (
          <>
            <S.PostHeaderStacked>
              <Avatar
                src={post.author.avatar}
                alt={post.author.username}
                size="small"
                onClick={handleClickProfile}
              />
              <div>
                <S.DisplayName onClick={handleClickProfile}>
                  {post.author.firstName} {post.author.lastName}
                </S.DisplayName>
                <S.Username onClick={handleClickProfile}>
                  @{post.author.username}
                </S.Username>
              </div>
            </S.PostHeaderStacked>

            <PostCardContent post={post} variant={variant} />

            <S.PostDateDetailed>
              {formatDate(isEdited ? post.updatedAt : post.createdAt, 'detail')}
              {isEdited && (
                <>
                  {' '}
                  <S.Separator>·</S.Separator> Editado
                </>
              )}
            </S.PostDateDetailed>

            <PostCardActions
              post={post}
              variant={variant}
              onComment={handleComment}
              onRetweet={handleRetweet}
              onLike={handleLike}
              retweetRef={retweetButtonRef}
            />
          </>
        )}
      </S.PostCardContainer>

      {/* Modais */}
      <CommentModal
        isOpen={isCommentModalOpen}
        onClose={() => setIsCommentModalOpen(false)}
        originalPost={post}
        userAvatar={currentUser?.avatar || ''}
        userName={currentUser?.username || ''}
      />

      <RetweetPopover
        isOpen={isRetweetPopoverOpen}
        onClose={() => setIsRetweetPopoverOpen(false)}
        onRetweet={handleRetweetSimple}
        onQuote={() => {
          setIsRetweetPopoverOpen(false)
          setIsRetweetModalOpen(true)
        }}
        isRetweeted={userMadeSimpleRetweet} // ✅ USA userMadeSimpleRetweet
        isQuoteRetweet={userMadeQuoteRetweet}
        triggerRef={retweetButtonRef}
      />

      <RetweetModal
        isOpen={isRetweetModalOpen}
        onClose={() => setIsRetweetModalOpen(false)}
        originalPost={post}
        userName={currentUser?.username || ''}
        userAvatar={currentUser?.avatar || ''}
      />

      <EditPostModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        post={post}
        userAvatar={currentUser?.avatar || ''}
        userName={currentUser?.username || ''}
      />
    </S.Wrapper>
  )
}

export default PostCard
