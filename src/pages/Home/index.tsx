import { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { useGetPostsQuery, useGetFeedQuery } from '../../store/slices/api/posts'
import {
  setFeedPosts,
  appendFeedPosts,
  clearFeed
} from '../../store/slices/posts/postsSlice'
import {
  selectFeedPosts,
  selectFeedHasMore,
  selectFeedCursor
} from '../../store/slices/posts/postsSlice'
import InforBar from '../../components/Layout/InfoBar'
import PostForm from './components/PostForm'
import PostCard from '../../components/common/Posts/PostCard'
import HomeTabs from './components/HomeTabs'
import PostListSkeleton from '../../components/common/Skeleton/components/PostSkeleton/PostListSkeleton'
import ScrollToTop from '../../hooks/useScrollToTop'
import { usePost } from '../../hooks/usePost'
import type { ActiveTab } from './components/HomeTabs/types'
import type { HomeProps } from './types'
import { ContentWrapper } from '../../styles/globalStyles'
import * as S from './styles'

const HomeLayout = ({ userAvatar, userName }: HomeProps) => {
  const dispatch = useAppDispatch()

  const [activeTab, setActiveTab] = useState<ActiveTab>('forYou')
  const [isFetching, setIsFetching] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)

  // Queries separadas por aba
  const {
    data: allPostsData,
    isLoading: isLoadingAll,
    refetch: refetchAll
  } = useGetPostsQuery(undefined, {
    skip: activeTab !== 'forYou'
  })

  const {
    data: followingPostsData,
    isLoading: isLoadingFollowing,
    refetch: refetchFollowing
  } = useGetFeedQuery(undefined, {
    skip: activeTab !== 'following'
  })

  // Seleciona dados baseado na aba
  const postsData = activeTab === 'forYou' ? allPostsData : followingPostsData
  const isLoading = activeTab === 'forYou' ? isLoadingAll : isLoadingFollowing
  const refetch = activeTab === 'forYou' ? refetchAll : refetchFollowing

  // Redux selectors
  const posts = useAppSelector(selectFeedPosts)
  const hasMore = useAppSelector(selectFeedHasMore)
  const cursor = useAppSelector(selectFeedCursor)

  const { likePost, retweetPost, quoteTweet, commentPost } = usePost()

  // Sincroniza primeira página
  useEffect(() => {
    if (postsData && !isInitialized && posts.length === 0) {
      console.log('🔄 Sincronizando primeira página (Apenas uma vez)...')

      dispatch(
        setFeedPosts({
          posts: postsData.results,
          cursor: postsData.next,
          hasMore: !!postsData.next
        })
      )

      setIsInitialized(true)
    }
  }, [postsData, isInitialized, posts.length, dispatch])

  // ✅ NOVO: Limpa feed ao trocar de aba
  useEffect(() => {
    dispatch(clearFeed())
    setIsInitialized(false)
  }, [activeTab, dispatch])

  // ✅ Carrega próxima página
  const loadMore = async () => {
    if (isFetching || !cursor || !hasMore) {
      return
    }

    setIsFetching(true)

    try {
      const response = await fetch(cursor)
      const data = await response.json()

      dispatch(
        appendFeedPosts({
          posts: data.results || [],
          cursor: data.next,
          hasMore: !!data.next
        })
      )
    } catch (error) {
      console.error('Erro ao carregar mais posts:', error)
    } finally {
      setIsFetching(false)
    }
  }

  // ✅ Pull to refresh
  const handleRefresh = async () => {
    dispatch(clearFeed())
    setIsInitialized(false)
    await refetch()
  }

  // ✅ REMOVIDO: useMemo para filtrar (agora vem do backend)
  const filteredPosts = posts

  const isEmpty = !isLoading && filteredPosts.length === 0

  return (
    <>
      <ScrollToTop />
      <ContentWrapper>
        <S.HomeContainer>
          <HomeTabs activeTab={activeTab} onTabChange={setActiveTab} />

          <PostForm userName={userName} userAvatar={userAvatar} />

          {isLoading ? (
            <PostListSkeleton count={5} />
          ) : isEmpty ? (
            <S.EmptyState>
              <S.EmptyStateTitle>
                {activeTab === 'following'
                  ? 'Nenhum post de quem você segue'
                  : 'Nenhum post ainda'}
              </S.EmptyStateTitle>
              <S.EmptyStateText>
                {activeTab === 'following'
                  ? 'Comece seguindo pessoas para ver posts aqui!'
                  : 'Seja o primeiro a postar!'}
              </S.EmptyStateText>
            </S.EmptyState>
          ) : (
            <InfiniteScroll
              dataLength={filteredPosts.length}
              next={loadMore}
              hasMore={hasMore && cursor !== null}
              loader={
                <S.LoadingMore>
                  <S.LoadingText>Carregando mais posts...</S.LoadingText>
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
              {filteredPosts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  onLike={likePost}
                  onRetweet={retweetPost}
                  onQuoteTweet={quoteTweet}
                  onComment={commentPost}
                  variant="default"
                />
              ))}
            </InfiniteScroll>
          )}
        </S.HomeContainer>
        <InforBar variant="default" />
      </ContentWrapper>
    </>
  )
}

export default HomeLayout
