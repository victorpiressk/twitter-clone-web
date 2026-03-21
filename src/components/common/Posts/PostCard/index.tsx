import { memo, useState, useRef, useMemo, useCallback } from 'react'
import { Repeat2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useToast, usePostActions } from '../../../../hooks'
import { useAppSelector, useAppDispatch } from '../../../../store/hooks'
import {
  useRetweetPostMutation,
  useUnretweetPostMutation
} from '../../../../store/slices/api/posts'
import { selectCurrentUser } from '../../../../store/slices/auth/authSlice'
import {
  adjustRetweets,
  removePost,
  setRetweeted,
  selectPostById,
  upsertPost
} from '../../../../store/slices/posts/postsSlice'
import { colors } from '../../../../styles/globalStyles'
import { formatDate } from '../../../../utils/formatDate'
import Avatar from '../../Avatar'
import CommentModal from '../../Modals/CommentModal'
import RetweetModal from '../../Modals/RetweetModal'
import RetweetPopover from '../../Popovers/RetweetPopover'
import OriginalPostPreview from '../OriginalPostPreview'
import EditPostModal from './components/EditPostModal'
import PostCardActions from './components/PostCardActions'
import PostCardContent from './components/PostCardContent'
import PostCardMenu from './components/PostCardMenu'
import * as S from './styles'
import type { PostCardProps } from './types'

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

  const allPosts = useAppSelector((state) => state.posts.byId)

  // Busca post original — serve tanto para retweet simples quanto para reply no detailed
  const retweetOfPost = useAppSelector((state) =>
    post?.retweetOf ? selectPostById(state, post.retweetOf as number) : null
  )

  const inReplyToPost = useAppSelector((state) =>
    post?.inReplyTo ? selectPostById(state, post.inReplyTo as number) : null
  )

  const userRetweets = useMemo(() => {
    if (!currentUser) return []

    return Object.values(allPosts).filter(
      (p) => p.author.id === currentUser.id && p.retweetOf === postId
    )
  }, [allPosts, currentUser, postId])

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

  const isSimpleRetweet = !!post.retweetOf && !post.content.trim()

  const originalPost = isSimpleRetweet ? retweetOfPost : inReplyToPost
  const displayPost = isSimpleRetweet && originalPost ? originalPost : post

  const createTime = new Date(post.createdAt).getTime()
  const updateTime = new Date(post.updatedAt).getTime()
  const isEdited = post.updatedAt && updateTime - createTime > 1000

  const handleClickProfile = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation()
      navigate(`/${post.author.username}`)
    },
    [post?.author.username, navigate]
  )

  const handleClickPost = useCallback(() => {
    if (variant === 'default') {
      navigate(`/${post.author.username}/status/${post.id}`)
    }
  }, [variant, post?.author.username, post?.id, navigate])

  const handleComment = useCallback(() => {
    setIsCommentModalOpen(true)
  }, [])

  const handleRetweet = useCallback(() => {
    setIsRetweetPopoverOpen(true)
  }, [])

  const handleLike = useCallback(() => {
    likePost()
  }, [likePost])

  if (!post) return null

  const handleRetweetSimple = async () => {
    try {
      if (userMadeSimpleRetweet && userSimpleRetweet) {
        dispatch(setRetweeted({ postId, value: userMadeQuoteRetweet }))
        dispatch(adjustRetweets({ postId, delta: -1 }))
        dispatch(removePost(userSimpleRetweet.id))
        await unretweetPost(postId).unwrap()
        showToast('success', 'Retweet desfeito!')
      } else {
        dispatch(setRetweeted({ postId, value: true }))
        dispatch(adjustRetweets({ postId, delta: 1 }))
        const newRetweet = await retweetPost(postId).unwrap()
        dispatch(
          upsertPost({
            ...newRetweet,
            isLiked: false,
            isRetweeted: false,
            isBookmarked: false,
            likeId: null
          })
        )
        showToast('success', 'Retweetado!')
      }
    } catch (error: unknown) {
      dispatch(
        setRetweeted({
          postId,
          value: userMadeSimpleRetweet || userMadeQuoteRetweet
        })
      )
      dispatch(
        adjustRetweets({ postId, delta: userMadeSimpleRetweet ? 1 : -1 })
      )
      const message = (error as { data?: { detail?: string } })?.data?.detail
      showToast('error', message || 'Erro ao processar retweet')
    } finally {
      setIsRetweetPopoverOpen(false)
    }
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

              <PostCardContent post={displayPost} variant={variant} />

              <PostCardMenu
                post={post}
                onEditClick={() => setIsEditModalOpen(true)}
              />
            </S.PostMainContent>

            <PostCardActions
              post={displayPost}
              variant={variant}
              onComment={handleComment}
              onRetweet={handleRetweet}
              onLike={handleLike}
              retweetRef={retweetButtonRef}
            />
          </>
        ) : (
          <>
            {variant === 'detailed' && originalPost && post.inReplyTo && (
              <OriginalPostPreview post={originalPost} showConnector />
            )}

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
        isRetweeted={userMadeSimpleRetweet}
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

export default memo(PostCard)
