// src/pages/PostDetail/index.tsx
import { useEffect, useMemo, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import {
  useGetPostByIdQuery,
  useGetPostRepliesQuery
} from '../../store/slices/api/posts'
import { usePosts } from '../../hooks/usePosts' // ✅ Usa usePosts
import {
  setPostDetail,
  selectPostDetail,
  upsertPost
} from '../../store/slices/posts/postsSlice'
import PostCard from '../../components/common/Posts/PostCard'
import PostList from '../../components/common/Posts/PostList'
import InfoBar from '../../components/Layout/InfoBar'
import BackButton from '../../components/common/BackButton'
import PostDetailSkeleton from '../../components/common/Skeleton/components/PostDetailSkeleton'
import PostListSkeleton from '../../components/common/Skeleton/components/PostSkeleton/PostListSkeleton'
import { ScrollToTop } from '../../hooks/'
import { ContentWrapper } from '../../styles/globalStyles'
import * as S from './styles'

const PostDetail = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { postId } = useParams()

  const postIdNumber = Number(postId)

  // ✅ Busca post principal
  const {
    data: postData,
    isLoading: isLoadingPost,
    error: postError
  } = useGetPostByIdQuery(postIdNumber, {
    skip: !postIdNumber || isNaN(postIdNumber)
  })

  // ✅ Busca replies usando usePosts
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

  // ✅ Busca replies data RAW (para useEffect)
  const { data: repliesDataRaw } = useGetPostRepliesQuery(
    { postId: postIdNumber },
    { skip: !postIdNumber || isNaN(postIdNumber) }
  )

  // Redux state
  const postDetail = useAppSelector(selectPostDetail)

  // 1. Memoriza os IDs
  const replyIds = useMemo(() => replies.map((r) => r.id), [replies])
  const replyIdsString = replyIds.join(',')

  // 2. Desestruture o postData para ter variáveis estáveis
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

  // ✅ Adiciona replies ao Redux quando dados da query mudam
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
  //    ↑ Depende de repliesDataRaw (da query direta), não de replies (do usePosts)

  // ✅ Redireciona se 404
  useEffect(() => {
    if (postError || (!isLoadingPost && !postData)) {
      navigate('/home')
    }
  }, [isLoadingPost, postData, postError, navigate])

  // Loading
  const isLoading = isLoadingPost || isLoadingReplies

  if (isLoading || !postDetail?.post) {
    return (
      <>
        <ScrollToTop />
        <ContentWrapper>
          <S.PostDetailContainer>
            <S.PostDetailHeader>
              <BackButton />
              <S.HeaderTitle>Post</S.HeaderTitle>
            </S.PostDetailHeader>
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
          <S.PostDetailHeader>
            <BackButton />
            <S.HeaderTitle>Post</S.HeaderTitle>
          </S.PostDetailHeader>

          {/* Post principal */}
          <PostCard variant="detailed" postId={postIdNumber} />

          {/* Replies */}
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
                <S.NoComments>
                  <S.NoCommentsText>
                    Nenhum comentário ainda. Seja o primeiro a comentar!
                  </S.NoCommentsText>
                </S.NoComments>
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
