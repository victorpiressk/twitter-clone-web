import { useEffect, useMemo, useRef } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useNavigate, useParams } from 'react-router-dom'
import PostCard from '../../components/common/Posts/PostCard'
import PostList from '../../components/common/Posts/PostList'
import PostDetailSkeleton from '../../components/common/Skeleton/components/PostDetailSkeleton'
import PostListSkeleton from '../../components/common/Skeleton/components/PostSkeleton/PostListSkeleton'
import InfoBar from '../../components/Layout/InfoBar'
import PageHeader from '../../components/Layout/PageHeader'
import { ScrollToTop } from '../../hooks/'
import { usePosts } from '../../hooks/usePosts'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import {
  useGetPostByIdQuery,
  useGetPostRepliesQuery
} from '../../store/slices/api/posts'
import {
  setPostDetail,
  selectPostDetail,
  upsertPost
} from '../../store/slices/posts/postsSlice'
import { ContentWrapper } from '../../styles/globalStyles'
import * as S from './styles'

const PostDetail = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { postId } = useParams()

  const postIdNumber = Number(postId)

  const {
    data: postData,
    isLoading: isLoadingPost,
    error: postError
  } = useGetPostByIdQuery(postIdNumber, {
    skip: !postIdNumber || isNaN(postIdNumber)
  })

  const {
    posts: replies,
    isLoading: isLoadingReplies,
    hasMore,
    loadMore,
    refresh
  } = usePosts({
    type: 'replies',
    postId: postIdNumber
  })

  const { data: repliesDataRaw } = useGetPostRepliesQuery(
    { postId: postIdNumber },
    { skip: !postIdNumber || isNaN(postIdNumber) }
  )

  const postDetail = useAppSelector(selectPostDetail)

  const replyIds = useMemo(() => replies.map((r) => r.id), [replies])
  const replyIdsString = replyIds.join(',')

  const postIdData = postData?.id
  const isLiked = !!postData?.isLiked
  const isRetweeted = !!postData?.isRetweeted
  const isBookmarked = !!postData?.isBookmarked

  const lastProcessedId = useRef<number | null>(null)

  useEffect(() => {
    if (
      postIdData &&
      (lastProcessedId.current !== postIdData || !lastProcessedId.current)
    ) {
      dispatch(
        setPostDetail({
          post: {
            ...postData!,
            isLiked,
            isRetweeted,
            isBookmarked
          },
          threadIds: [],
          commentIds: replyIds
        })
      )
      lastProcessedId.current = postIdData
    }
  }, [
    postIdData,
    isLiked,
    isRetweeted,
    isBookmarked,
    replyIdsString,
    replyIds,
    dispatch,
    postData
  ])

  useEffect(() => {
    if (repliesDataRaw?.results) {
      repliesDataRaw.results.forEach((reply) => {
        dispatch(
          upsertPost({
            ...reply,
            isLiked: reply.isLiked ?? false,
            isRetweeted: reply.isRetweeted ?? false,
            isBookmarked: reply.isBookmarked ?? false
          })
        )
      })
    }
  }, [repliesDataRaw, dispatch])

  useEffect(() => {
    if (postError || (!isLoadingPost && !postData)) {
      navigate('/home')
    }
  }, [isLoadingPost, postData, postError, navigate])

  const isLoading = isLoadingPost || isLoadingReplies

  if (isLoading || !postDetail?.post) {
    return (
      <>
        <ScrollToTop />
        <ContentWrapper>
          <S.PostDetailContainer>
            <PageHeader variant="post-detail" onBack={() => navigate(-1)} />
            <PostDetailSkeleton />
            <S.CommentsSection>
              <PostListSkeleton count={5} />
            </S.CommentsSection>
          </S.PostDetailContainer>
          <InfoBar />
        </ContentWrapper>
      </>
    )
  }

  const handleRefresh = async () => {
    await refresh()
  }

  return (
    <>
      <ScrollToTop />
      <ContentWrapper>
        <S.PostDetailContainer>
          <PageHeader variant="post-detail" onBack={() => navigate(-1)} />

          <PostCard variant="detailed" postId={postIdNumber} />

          <S.CommentsSection>
            <InfiniteScroll
              dataLength={replies.length}
              next={loadMore}
              hasMore={hasMore}
              loader={
                <S.LoadingMore>
                  <S.LoadingText>Carregando mais comentários...</S.LoadingText>
                </S.LoadingMore>
              }
              endMessage={<S.EndMessage>Você chegou ao fim!</S.EndMessage>}
              refreshFunction={handleRefresh}
              pullDownToRefresh
              pullDownToRefreshThreshold={80}
              pullDownToRefreshContent={
                <S.PullMessage>↓ Puxe para atualizar</S.PullMessage>
              }
              releaseToRefreshContent={
                <S.ReleaseMessage>↻ Solte para atualizar</S.ReleaseMessage>
              }
            >
              {replies.length > 0 ? (
                <PostList posts={replies} variant="default" />
              ) : (
                <S.EmptyState>
                  <S.EmptyStateText>
                    Nenhum comentário ainda. Seja o primeiro a comentar!
                  </S.EmptyStateText>
                </S.EmptyState>
              )}
            </InfiniteScroll>
          </S.CommentsSection>
        </S.PostDetailContainer>
        <InfoBar />
      </ContentWrapper>
    </>
  )
}

export default PostDetail
