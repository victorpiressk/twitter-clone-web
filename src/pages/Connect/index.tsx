import { useEffect, useState } from 'react'
import ConnectTabs from './components/ConnectTabs'
import UserSuggestionCard from './components/UserSuggestionCard'
import { ContentWrapper } from '../../styles/globalStyles'
import InfoBar from '../../components/Layout/InfoBar'
import BackButton from '../../components/common/BackButton'
import UserCardListSkeleton from '../../components/common/Skeleton/components/UserCardSkeleton/UserCardListSkeleton'
import { ScrollToTop } from '../../hooks/useScrollToTop'
import type { ConnectTab } from './types'
import * as S from './styles'
import type { UserCard } from '../../types/domain/models'

// Mock data - Sugestões
const mockSuggestions: UserCard[] = [
  {
    id: 1,
    avatar: '',
    username: 'joaosilva',
    firstName: 'João',
    lastName: 'Silva',
    bio: 'Desenvolvedor Full Stack | React + Node.js',
    isFollowing: false
  },
  {
    id: 2,
    avatar: '',
    username: 'mariacosta',
    firstName: 'Maria',
    lastName: 'Costa',
    bio: 'Designer UX/UI | Criando experiências incríveis',
    isFollowing: false
  },
  {
    id: 3,
    avatar: '',
    username: 'pedrosantos',
    firstName: 'Pedro',
    lastName: 'Santos',
    bio: 'Product Manager | Apaixonado por tecnologia',
    isFollowing: true
  },
  {
    id: 4,
    avatar: '',
    username: 'anaoliveira',
    firstName: 'Ana',
    lastName: 'Oliveira',
    bio: 'Engenheira de Software | Python & Django',
    isFollowing: false
  }
]

// Mock data - Criadores
const mockCreators: UserCard[] = [
  {
    id: 5,
    avatar: '',
    username: 'techbr',
    firstName: 'Tech',
    lastName: 'Brasil',
    bio: 'Canal de tecnologia e programação 🚀',
    isFollowing: false
  },
  {
    id: 6,
    avatar: '',
    username: 'devbrasil',
    firstName: 'Dev',
    lastName: 'Brasil',
    bio: 'Dicas diárias de desenvolvimento web',
    isFollowing: false
  },
  {
    id: 7,
    avatar: '',
    username: 'designtips',
    firstName: 'Design',
    lastName: 'Tips',
    bio: 'Inspiração e tutoriais de design',
    isFollowing: true
  },
  {
    id: 8,
    avatar: '',
    username: 'codenews',
    firstName: 'Code',
    lastName: 'News',
    bio: 'Notícias do mundo da programação',
    isFollowing: false
  }
]

const Connect = () => {
  const [activeTab, setActiveTab] = useState<ConnectTab>('suggestions')
  const [suggestions, setSuggestions] = useState(mockSuggestions)
  const [creators, setCreators] = useState(mockCreators)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1500)
  }, [])

  const handleFollowToggle = (userId: number) => {
    if (activeTab === 'suggestions') {
      setSuggestions((prev) =>
        prev.map((user) =>
          user.id === userId
            ? { ...user, isFollowing: !user.isFollowing }
            : user
        )
      )
    } else {
      setCreators((prev) =>
        prev.map((user) =>
          user.id === userId
            ? { ...user, isFollowing: !user.isFollowing }
            : user
        )
      )
    }
  }

  return (
    <>
      <ScrollToTop />
      <ContentWrapper>
        <S.ConnectContainer>
          <S.ConnectHeader>
            <BackButton />
            <S.HeaderTitle>Seguir</S.HeaderTitle>
          </S.ConnectHeader>

          <ConnectTabs activeTab={activeTab} onTabChange={setActiveTab} />

          {activeTab === 'suggestions' && (
            <>
              <S.SectionTitle>Sugestões para você</S.SectionTitle>
              <S.UsersList>
                {isLoading ? (
                  <UserCardListSkeleton count={3} />
                ) : (
                  <>
                    {suggestions.map((user) => (
                      <UserSuggestionCard
                        key={user.id}
                        user={user}
                        onFollowToggle={handleFollowToggle}
                        showSubscribe={false}
                      />
                    ))}
                  </>
                )}
              </S.UsersList>
            </>
          )}

          {activeTab === 'creators' && (
            <S.UsersList>
              {isLoading ? (
                <UserCardListSkeleton count={3} />
              ) : (
                <>
                  {creators.map((user) => (
                    <UserSuggestionCard
                      key={user.id}
                      user={user}
                      onFollowToggle={handleFollowToggle}
                      showSubscribe={true}
                    />
                  ))}
                </>
              )}
            </S.UsersList>
          )}
        </S.ConnectContainer>
        <InfoBar />
      </ContentWrapper>
    </>
  )
}

export default Connect
