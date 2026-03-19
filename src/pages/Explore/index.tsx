import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component'
import { usePosts } from '../../hooks/usePosts'
import { useHashtags } from '../../hooks/useHashtags'
import { useHashtagPosts } from '../../hooks/useHashtagPosts'
import { useMobileDrawer } from '../../hooks/useMobileDrawer'
import InfoBar from '../../components/Layout/InfoBar'
import PageHeader from '../../components/Layout/PageHeader'
import PostCard from '../../components/common/Posts/PostCard'
import TrendingHashtagsList from './components/TrendingHashtagsList'
import PostListSkeleton from '../../components/common/Skeleton/components/PostSkeleton/PostListSkeleton'
import { ScrollToTop } from '../../hooks/useScrollToTop'
import { ContentWrapper } from '../../styles/globalStyles'
import * as S from './styles'

const EXPLORE_TABS = [
  { key: 'for-you', label: 'Para você' },
  { key: 'trending', label: 'Assuntos do Momento' },
  { key: 'news', label: 'Notícias' },
  { key: 'sports', label: 'Esportes' },
  { key: 'entertainment', label: 'Entretenimento' }
]

const Explore = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const { openDrawer } = useMobileDrawer()

  const activeTab = searchParams.get('tab') || 'for-you'
  const searchQuery = searchParams.get('q') || ''

  const {
    posts,
    isLoading: loadingForYou,
    hasMore: hasMoreForYou,
    loadMore: loadMoreForYou,
    refresh: refreshForYou
  } = usePosts({ type: 'forYou' })

  const { hashtags: trendingHashtags, isLoading: loadingTrending } =
    useHashtags({ mode: 'trending' })

  const { posts: hashtagPosts, isLoading: loadingHashtagPosts } =
    useHashtagPosts({
      hashtagName: searchQuery && activeTab === 'trending' ? searchQuery : ''
    })

  const handleTabChange = (tab: string) => setSearchParams({ tab })

  const handleSearch = (query: string) => {
    if (query.trim()) {
      setSearchParams({ q: query.trim(), tab: activeTab })
    } else {
      setSearchParams({ tab: activeTab })
    }
  }

  const handleBackToTrending = () => setSearchParams({ tab: 'trending' })

  const renderTabContent = () => {
    switch (activeTab) {
      case 'for-you': {
        const isEmpty = !loadingForYou && posts.length === 0

        if (loadingForYou) return <PostListSkeleton count={5} />

        return isEmpty ? (
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
                <S.LoadingText>Carregando...</S.LoadingText>
              </S.LoadingMore>
            }
            endMessage={<S.EndMessage>Você chegou ao fim! 🎉</S.EndMessage>}
            refreshFunction={refreshForYou}
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
        )
      }

      case 'trending': {
        if (searchQuery) {
          const isEmpty = !loadingHashtagPosts && hashtagPosts.length === 0

          if (loadingHashtagPosts) return <PostListSkeleton count={5} />

          return isEmpty ? (
            <S.EmptyState>
              <h3>Nenhum post encontrado</h3>
              <p>Ainda não há posts com #{searchQuery}</p>
            </S.EmptyState>
          ) : (
            <div>
              {hashtagPosts.map((post) => (
                <PostCard key={post.id} postId={post.id} variant="default" />
              ))}
            </div>
          )
        }

        const isEmpty = !loadingTrending && trendingHashtags.length === 0

        if (loadingTrending) return <PostListSkeleton count={5} />

        return isEmpty ? (
          <S.EmptyState>
            <h3>Nenhum trend no momento</h3>
            <p>Volte mais tarde! 🔥</p>
          </S.EmptyState>
        ) : (
          <TrendingHashtagsList hashtags={trendingHashtags} />
        )
      }

      case 'news':
        return (
          <S.EmptyState>
            <h3>Notícias em breve... 📰</h3>
          </S.EmptyState>
        )
      case 'sports':
        return (
          <S.EmptyState>
            <h3>Esportes em breve... ⚽</h3>
          </S.EmptyState>
        )
      case 'entertainment':
        return (
          <S.EmptyState>
            <h3>Entretenimento em breve... 🎬</h3>
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
          <PageHeader
            variant="explore"
            onAvatarClick={openDrawer}
            isSearchFocused={isSearchFocused}
            searchQuery={searchQuery}
            tabs={EXPLORE_TABS}
            activeTab={activeTab}
            onTabChange={handleTabChange}
            onSearchFocus={() => setIsSearchFocused(true)}
            onSearch={handleSearch}
            onBack={() => {
              setIsSearchFocused(false)
              if (activeTab === 'trending' && searchQuery) {
                handleBackToTrending()
              }
            }}
          />

          <S.TabContent>{renderTabContent()}</S.TabContent>
        </S.ExploreContainer>
        <InfoBar variant="minimal" />
      </ContentWrapper>
    </>
  )
}

export default Explore
