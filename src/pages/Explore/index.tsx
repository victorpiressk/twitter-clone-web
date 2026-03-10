// src/pages/Explore/index.tsx

import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component'
import { usePosts } from '../../hooks/usePosts'
import { useHashtags } from '../../hooks/useHashtags'
import { useHashtagPosts } from '../../hooks/useHashtagPosts'
import InfoBar from '../../components/Layout/InfoBar'
import SearchBar from '../../components/common/SearchBar'
import BackButton from '../../components/common/BackButton'
import PostCard from '../../components/common/Posts/PostCard'
import ExploreTabs from './components/ExploreTabs'
import TrendingHashtagsList from './components/TrendingHashtagsList'
import PostListSkeleton from '../../components/common/Skeleton/components/PostSkeleton/PostListSkeleton'
import { ScrollToTop } from '../../hooks/useScrollToTop'
import type { ExploreTab } from './types'
import { ContentWrapper } from '../../styles/globalStyles'
import * as S from './styles'

const Explore = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [isSearchFocused, setIsSearchFocused] = useState(false)

  // Derivar estado da URL
  const activeTab: ExploreTab =
    (searchParams.get('tab') as ExploreTab) || 'for-you'
  const searchQuery = searchParams.get('q') || ''

  // ============================================
  // TAB "FOR YOU"
  // ============================================

  const {
    posts,
    isLoading: loadingForYou,
    hasMore: hasMoreForYou,
    loadMore: loadMoreForYou,
    refresh: refreshForYou
  } = usePosts({
    type: 'forYou'
  })

  // ============================================
  // TAB "TRENDING" - Modo Lista
  // ============================================

  const { hashtags: trendingHashtags, isLoading: loadingTrending } =
    useHashtags({
      mode: 'trending'
    })

  // ============================================
  // TAB "TRENDING" - Modo Filtrado
  // ============================================

  // ✅ useHashtagPosts já retorna info da hashtag + posts
  const { posts: hashtagPosts, isLoading: loadingHashtagPosts } =
    useHashtagPosts({
      hashtagName: searchQuery && activeTab === 'trending' ? searchQuery : ''
    })

  // ============================================
  // HANDLERS
  // ============================================

  const handleRefreshForYou = async () => {
    await refreshForYou()
  }

  const handleTabChange = (tab: ExploreTab) => {
    setSearchParams({ tab })
  }

  const handleSearch = (query: string) => {
    if (query.trim()) {
      setSearchParams({ q: query.trim(), tab: activeTab })
    } else {
      setSearchParams({ tab: activeTab })
    }
  }

  const handleBackToTrending = () => {
    setSearchParams({ tab: 'trending' })
  }

  // ============================================
  // RENDER TAB CONTENT
  // ============================================

  const renderTabContent = () => {
    switch (activeTab) {
      // ============================================
      // FOR YOU
      // ============================================
      case 'for-you': {
        const isEmpty = !loadingForYou && posts.length === 0

        return (
          <>
            {loadingForYou ? (
              <PostListSkeleton count={5} />
            ) : isEmpty ? (
              <S.EmptyState>
                <h3>Nenhum post ainda</h3>
                <p>Seja o primeiro a postar!</p>
              </S.EmptyState>
            ) : (
              <InfiniteScroll
                dataLength={posts.length}
                next={loadMoreForYou}
                hasMore={hasMoreForYou}
                loader={
                  <S.LoadingMore>
                    <S.LoadingText>Carregando mais posts...</S.LoadingText>
                  </S.LoadingMore>
                }
                endMessage={<S.EndMessage>Você chegou ao fim! 🎉</S.EndMessage>}
                refreshFunction={handleRefreshForYou}
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
          </>
        )
      }

      // ============================================
      // TRENDING
      // ============================================
      case 'trending': {
        // ============================================
        // MODO FILTRADO (com query)
        // ============================================
        if (searchQuery) {
          const isEmpty = !loadingHashtagPosts && hashtagPosts.length === 0

          return (
            <>
              {/* Posts da Hashtag */}
              {loadingHashtagPosts ? (
                <PostListSkeleton count={5} />
              ) : isEmpty ? (
                <S.EmptyState>
                  <h3>Nenhum post encontrado</h3>
                  <p>Ainda não há posts com #{searchQuery}</p>
                </S.EmptyState>
              ) : (
                // ✅ SEM InfiniteScroll (endpoint não pagina)
                <div>
                  {hashtagPosts.map((post) => (
                    <PostCard
                      key={post.id}
                      postId={post.id}
                      variant="default"
                    />
                  ))}
                </div>
              )}
            </>
          )
        }

        // ============================================
        // MODO LISTA (sem query)
        // ============================================
        const isEmpty = !loadingTrending && trendingHashtags.length === 0

        return (
          <>
            {loadingTrending ? (
              <PostListSkeleton count={5} />
            ) : isEmpty ? (
              <S.EmptyState>
                <h3>Nenhum trend no momento</h3>
                <p>Volte mais tarde para ver o que está em alta! 🔥</p>
              </S.EmptyState>
            ) : (
              <TrendingHashtagsList hashtags={trendingHashtags} />
            )}
          </>
        )
      }

      case 'news':
        return (
          <S.EmptyState>
            <h3>Notícias em breve...</h3>
            <p>Estamos trabalhando nisso! 📰</p>
          </S.EmptyState>
        )

      case 'sports':
        return (
          <S.EmptyState>
            <h3>Esportes em breve...</h3>
            <p>Estamos trabalhando nisso! ⚽</p>
          </S.EmptyState>
        )

      case 'entertainment':
        return (
          <S.EmptyState>
            <h3>Entretenimento em breve...</h3>
            <p>Estamos trabalhando nisso! 🎬</p>
          </S.EmptyState>
        )

      default:
        return null
    }
  }

  return (
    <>
      <ScrollToTop />
      <ContentWrapper>
        <S.ExploreContainer>
          <S.SearchBarWrapper>
            <S.SearchBarContent
              $showBackButton={isSearchFocused || !!searchQuery}
            >
              {(isSearchFocused || searchQuery) && (
                <BackButton
                  onClick={() => {
                    setIsSearchFocused(false)
                    if (activeTab === 'trending' && searchQuery) {
                      handleBackToTrending()
                    }
                  }}
                />
              )}
              <SearchBar
                variant="large"
                onFocus={() => setIsSearchFocused(true)}
                value={searchQuery}
                onSearch={handleSearch}
              />
            </S.SearchBarContent>

            <ExploreTabs activeTab={activeTab} onTabChange={handleTabChange} />
          </S.SearchBarWrapper>

          <S.TabContent>{renderTabContent()}</S.TabContent>
        </S.ExploreContainer>
        <InfoBar variant="minimal" />
      </ContentWrapper>
    </>
  )
}

export default Explore
