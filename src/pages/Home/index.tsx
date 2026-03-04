import { useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { usePosts } from '../../hooks/usePosts'
import InforBar from '../../components/Layout/InfoBar'
import PostForm from './components/PostForm'
import PostCard from '../../components/common/Posts/PostCard'
import HomeTabs from './components/HomeTabs'
import PostListSkeleton from '../../components/common/Skeleton/components/PostSkeleton/PostListSkeleton'
import { ScrollToTop } from '../../hooks'
import type { ActiveTab } from './components/HomeTabs/types'
import { ContentWrapper } from '../../styles/globalStyles'
import * as S from './styles'

const HomeLayout = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('forYou')

  // ✅ Usa usePosts com type
  const { posts, isLoading, hasMore, loadMore, refresh } = usePosts({
    type: activeTab // 'forYou' ou 'following'
  })

  const handleRefresh = async () => {
    await refresh()
  }

  const isEmpty = !isLoading && posts.length === 0

  return (
    <>
      <ScrollToTop />
      <ContentWrapper>
        <S.HomeContainer>
          <HomeTabs activeTab={activeTab} onTabChange={setActiveTab} />

          <PostForm />

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
              dataLength={posts.length}
              next={loadMore}
              hasMore={hasMore}
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
              {posts.map((post) => (
                <PostCard key={post.id} postId={post.id} variant="default" />
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
