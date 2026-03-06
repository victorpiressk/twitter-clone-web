import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import InfoBar from '../../components/Layout/InfoBar'
import SearchBar from '../../components/common/SearchBar'
import BackButton from '../../components/common/BackButton'
import PostList from '../../components/common/Posts/PostList'
import ExploreTabs from './components/ExploreTabs'
import TrendsWidget from '../../components/Layout/InfoBar/components/TrendsWidget'
import PostListSkeleton from '../../components/common/Skeleton/components/PostSkeleton/PostListSkeleton'
import { ScrollToTop } from '../../hooks/useScrollToTop'
import type { ExploreTab } from './types'
import { ContentWrapper } from '../../styles/globalStyles'
import * as S from './styles'
import type { PostWithInteractions, Trend } from '../../types/domain/models'

// Mock data - Posts sugeridos
const mockPosts: PostWithInteractions[] = [
  {
    id: 1,
    content:
      '🚀 Novidades do React 19: Server Components agora estão estáveis! #React #WebDev',
    author: {
      id: 1,
      username: 'tech_news',
      firstName: 'Tech',
      lastName: 'News BR',
      avatar: '',
      bio: '',
      isFollowing: false,
      stats: {
        following: 0,
        followers: 0
      }
    },
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    updatedAt: '',
    isPublished: true,
    stats: { comments: 45, retweets: 128, likes: 567, views: 12340 },
    isLiked: false,
    isRetweeted: false,
    isBookmarked: false
  },
  {
    id: 2,
    content:
      'TypeScript 5.4 traz melhorias incríveis de performance! Confira: https://example.com',
    author: {
      id: 2,
      username: 'dev_brasil',
      firstName: 'Devs',
      lastName: 'Brasil',
      avatar: '',
      bio: '',
      isFollowing: false,
      stats: {
        following: 0,
        followers: 0
      }
    },
    createdAt: new Date(Date.now() - 7200000).toISOString(),
    updatedAt: '',
    isPublished: true,
    stats: { comments: 23, retweets: 89, likes: 345, views: 8900 },
    isLiked: false,
    isRetweeted: false,
    isBookmarked: false
  },
  {
    id: 3,
    content:
      'Dica: Use CSS Container Queries ao invés de Media Queries para componentes mais flexíveis! 💡',
    author: {
      id: 3,
      username: 'frontend_tips',
      firstName: 'Frontend',
      lastName: 'Tips',
      avatar: '',
      bio: '',
      isFollowing: false,
      stats: {
        following: 0,
        followers: 0
      }
    },
    createdAt: new Date(Date.now() - 10800000).toISOString(),
    updatedAt: '',
    isPublished: true,
    stats: { comments: 12, retweets: 56, likes: 234, views: 5600 },
    isLiked: false,
    isRetweeted: false,
    isBookmarked: false
  }
]

// Mock data - Trends expandidos
const mockTrends: Trend[] = [
  {
    id: 1,
    category: 'technology',
    name: '#React19',
    tweetCount: 125000,
    rank: 1,
    createdAt: new Date(Date.now() - 10800000).toISOString(),
    updatedAt: ''
  },
  {
    id: 2,
    category: 'technology',
    name: '#TypeScript',
    tweetCount: 89000,
    rank: 2,
    createdAt: new Date(Date.now() - 7200000).toISOString(),
    updatedAt: ''
  },
  {
    id: 3,
    category: 'technology',
    name: '#WebDev',
    tweetCount: 234000,
    rank: 2,
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    updatedAt: ''
  },
  {
    id: 4,
    category: 'technology',
    name: '#JavaScript',
    tweetCount: 456000,
    rank: 4,
    createdAt: new Date(Date.now() - 10800000).toISOString(),
    updatedAt: ''
  },
  {
    id: 5,
    category: 'technology',
    name: '#UX',
    tweetCount: 67000,
    rank: 5,
    createdAt: new Date(Date.now() - 10888000).toISOString(),
    updatedAt: ''
  }
]

const Explore = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [posts, setPosts] = useState(mockPosts)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }, [])

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

  const renderTabContent = () => {
    switch (activeTab) {
      case 'for-you':
        return (
          <>
            {isLoading ? (
              <PostListSkeleton count={5} />
            ) : (
              <PostList posts={posts} />
            )}
          </>
        )

      case 'trending':
        return (
          <>
            {isLoading ? (
              <PostListSkeleton count={5} />
            ) : (
              <>
                <div style={{ padding: '16px' }}>
                  <TrendsWidget trends={mockTrends} showAll />
                </div>
                <PostList posts={posts} />
              </>
            )}
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
