import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import InfoBar from '../../components/Layout/InfoBar'
import SearchBar from '../../components/common/SearchBar'
import BackButton from '../../components/common/BackButton'
import PostList from '../../components/common/PostList'
import ExploreTabs from './components/ExploreTabs'
import TrendsWidget from '../../components/Layout/InfoBar/components/TrendsWidget'
import type { ExploreTab } from './types'
import type { Post } from '../../components/common/PostCard/types'
import type { Trend } from '../../components/Layout/InfoBar/components/TrendsWidget/types'
import ScrollToTop from '../../hooks/useScrollToTop'
import { ContentWrapper } from '../../styles/globalStyles'
import * as S from './styles'

// Mock data - Posts sugeridos
const mockPosts: Post[] = [
  {
    id: '1',
    author: {
      id: '1',
      username: 'tech_news',
      displayName: 'Tech News BR',
      isFollowing: false
    },
    content:
      '🚀 Novidades do React 19: Server Components agora estão estáveis! #React #WebDev',
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    stats: { comments: 45, retweets: 128, likes: 567, views: 12340 },
    isLiked: false,
    isRetweeted: false
  },
  {
    id: '2',
    author: {
      id: '2',
      username: 'dev_brasil',
      displayName: 'Devs Brasil',
      isFollowing: false
    },
    content:
      'TypeScript 5.4 traz melhorias incríveis de performance! Confira: https://example.com',
    createdAt: new Date(Date.now() - 7200000).toISOString(),
    stats: { comments: 23, retweets: 89, likes: 345, views: 8900 },
    isLiked: false,
    isRetweeted: false
  },
  {
    id: '3',
    author: {
      id: '3',
      username: 'frontend_tips',
      displayName: 'Frontend Tips',
      isFollowing: false
    },
    content:
      'Dica: Use CSS Container Queries ao invés de Media Queries para componentes mais flexíveis! 💡',
    createdAt: new Date(Date.now() - 10800000).toISOString(),
    stats: { comments: 12, retweets: 56, likes: 234, views: 5600 },
    isLiked: false,
    isRetweeted: false
  }
]

// Mock data - Trends expandidos
const mockTrends: Trend[] = [
  { id: '1', category: 'Tecnologia', name: '#React19', tweetCount: 125000 },
  { id: '2', category: 'Tecnologia', name: '#TypeScript', tweetCount: 89000 },
  { id: '3', category: 'Programação', name: '#WebDev', tweetCount: 234000 },
  { id: '4', category: 'Tecnologia', name: '#JavaScript', tweetCount: 456000 },
  { id: '5', category: 'Design', name: '#UX', tweetCount: 67000 }
]

const Explore = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [posts, setPosts] = useState(mockPosts)

  // DERIVAR estado da URL (não usar useState + useEffect)
  const activeTab: ExploreTab =
    (searchParams.get('tab') as ExploreTab) || 'for-you'
  const searchQuery = searchParams.get('q') || ''

  const [isSearchFocused, setIsSearchFocused] = useState(false)

  const handleTabChange = (tab: ExploreTab) => {
    // Mantém query se existir
    const params: Record<string, string> = { tab }
    if (searchQuery) params.q = searchQuery
    setSearchParams(params)
  }

  const handleSearch = (query: string) => {
    if (query.trim()) {
      setSearchParams({ q: query.trim(), tab: activeTab })
    } else {
      // Se limpar busca, mantém só a tab
      setSearchParams({ tab: activeTab })
    }
  }

  const handleLike = (postId: string) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? {
              ...post,
              isLiked: !post.isLiked,
              stats: {
                ...post.stats,
                likes: post.isLiked
                  ? post.stats.likes - 1
                  : post.stats.likes + 1
              }
            }
          : post
      )
    )
  }

  const handleRetweet = (postId: string) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? {
              ...post,
              isRetweeted: !post.isRetweeted,
              stats: {
                ...post.stats,
                retweets: post.isRetweeted
                  ? post.stats.retweets - 1
                  : post.stats.retweets + 1
              }
            }
          : post
      )
    )
  }

  const handleComment = (postId: string) => {
    console.log('Comentar no post:', postId)
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'for-you':
        return (
          <PostList
            posts={posts}
            onLike={handleLike}
            onRetweet={handleRetweet}
            onComment={handleComment}
          />
        )

      case 'trending':
        return (
          <>
            <div style={{ padding: '16px' }}>
              <TrendsWidget trends={mockTrends} showAll />
            </div>
            <PostList
              posts={posts}
              onLike={handleLike}
              onRetweet={handleRetweet}
              onComment={handleComment}
            />
          </>
        )

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
            <S.SearchBarContent $showBackButton={isSearchFocused}>
              {isSearchFocused && (
                <BackButton onClick={() => setIsSearchFocused(false)} />
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
