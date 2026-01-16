import { useState } from 'react'
import ConnectTabs from './components/ConnectTabs'
import UserSuggestionCard from './components/UserSuggestionCard'
import type { ConnectTab, UserSuggestion } from './types'
import { MainContainer } from '../../styles/globalStyles'
import InfoBar from '../../components/Layout/InfoBar'
import BackButton from '../../components/common/BackButton'
import * as S from './styles'

// Mock data - Sugestões
const mockSuggestions: UserSuggestion[] = [
  {
    id: '1',
    username: 'joaosilva',
    displayName: 'João Silva',
    bio: 'Desenvolvedor Full Stack | React + Node.js',
    isFollowing: false,
    isCreator: false
  },
  {
    id: '2',
    username: 'mariacosta',
    displayName: 'Maria Costa',
    bio: 'Designer UX/UI | Criando experiências incríveis',
    isFollowing: false,
    isCreator: false
  },
  {
    id: '3',
    username: 'pedrosantos',
    displayName: 'Pedro Santos',
    bio: 'Product Manager | Apaixonado por tecnologia',
    isFollowing: true,
    isCreator: false
  },
  {
    id: '4',
    username: 'anaoliveira',
    displayName: 'Ana Oliveira',
    bio: 'Engenheira de Software | Python & Django',
    isFollowing: false,
    isCreator: false
  }
]

// Mock data - Criadores
const mockCreators: UserSuggestion[] = [
  {
    id: '5',
    username: 'techbr',
    displayName: 'Tech Brasil',
    bio: 'Canal de tecnologia e programação 🚀',
    isFollowing: false,
    isCreator: true
  },
  {
    id: '6',
    username: 'devbrasil',
    displayName: 'Dev Brasil',
    bio: 'Dicas diárias de desenvolvimento web',
    isFollowing: false,
    isCreator: true
  },
  {
    id: '7',
    username: 'designtips',
    displayName: 'Design Tips',
    bio: 'Inspiração e tutoriais de design',
    isFollowing: true,
    isCreator: true
  },
  {
    id: '8',
    username: 'codenews',
    displayName: 'Code News',
    bio: 'Notícias do mundo da programação',
    isFollowing: false,
    isCreator: true
  }
]

const Connect = () => {
  const [activeTab, setActiveTab] = useState<ConnectTab>('suggestions')
  const [suggestions, setSuggestions] = useState(mockSuggestions)
  const [creators, setCreators] = useState(mockCreators)

  const handleFollowToggle = (userId: string) => {
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
    <MainContainer>
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
              {suggestions.map((user) => (
                <UserSuggestionCard
                  key={user.id}
                  user={user}
                  onFollowToggle={handleFollowToggle}
                  showSubscribe={false}
                />
              ))}
            </S.UsersList>
          </>
        )}

        {activeTab === 'creators' && (
          <S.UsersList>
            {creators.map((user) => (
              <UserSuggestionCard
                key={user.id}
                user={user}
                onFollowToggle={handleFollowToggle}
                showSubscribe={true}
              />
            ))}
          </S.UsersList>
        )}
      </S.ConnectContainer>
      <InfoBar />
    </MainContainer>
  )
}

export default Connect
