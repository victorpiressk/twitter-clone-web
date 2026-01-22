import { useState } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { ContentWrapper } from '../../styles/globalStyles'
import BackButton from '../../components/common/BackButton'
import InfoBar from '../../components/Layout/InfoBar'
import FollowTabs from './components/FollowTabs'
import FollowUserCard from './components/FollowUserCard'
import ScrollToTop from '../../hooks/useScrollToTop'
import type { FollowTab, FollowUser } from './types'
import * as S from './styles'

// Mock data
const mockFollowing: FollowUser[] = [
  {
    id: '1',
    username: 'reactjs',
    displayName: 'React',
    bio: 'The library for web and native user interfaces',
    isFollowing: true
  },
  {
    id: '2',
    username: 'typescript',
    displayName: 'TypeScript',
    bio: 'TypeScript is a strongly typed programming language',
    isFollowing: true
  }
]

const mockFollowers: FollowUser[] = [
  {
    id: '3',
    username: 'developer1',
    displayName: 'Dev One',
    bio: 'Full Stack Developer',
    isFollowing: false
  },
  {
    id: '4',
    username: 'developer2',
    displayName: 'Dev Two',
    bio: 'Frontend Engineer',
    isFollowing: true
  }
]

const FollowPage = () => {
  const { username } = useParams<{ username: string }>()
  const navigate = useNavigate()
  const location = useLocation()

  const [following, setFollowing] = useState(mockFollowing)
  const [followers, setFollowers] = useState(mockFollowers)

  // Estado DERIVADO da URL (não precisa de useState nem useEffect)
  const activeTab: FollowTab = location.pathname.includes('/followers')
    ? 'followers'
    : 'following'

  // Mock user data
  const profileUser = {
    displayName: 'Victor Pires',
    username: 'victor'
  }

  const handleTabChange = (newTab: FollowTab) => {
    navigate(`/${username}/${newTab}`)
  }

  const handleFollowToggle = (userId: string) => {
    if (activeTab === 'following') {
      setFollowing((prev) =>
        prev.map((user) =>
          user.id === userId
            ? { ...user, isFollowing: !user.isFollowing }
            : user
        )
      )
    } else {
      setFollowers((prev) =>
        prev.map((user) =>
          user.id === userId
            ? { ...user, isFollowing: !user.isFollowing }
            : user
        )
      )
    }
  }

  const currentList = activeTab === 'following' ? following : followers

  return (
    <>
      <ScrollToTop />
      <ContentWrapper>
        <S.FollowContainer>
          <S.Header>
            <S.HeaderTop>
              <BackButton />
              <S.HeaderInfo>
                <S.HeaderName>{profileUser.displayName}</S.HeaderName>
                <S.HeaderUsername>@{profileUser.username}</S.HeaderUsername>
              </S.HeaderInfo>
            </S.HeaderTop>

            <FollowTabs activeTab={activeTab} onTabChange={handleTabChange} />
          </S.Header>

          <S.UserList>
            {currentList.length > 0 ? (
              currentList.map((user) => (
                <FollowUserCard
                  key={user.id}
                  user={user}
                  onFollowToggle={handleFollowToggle}
                />
              ))
            ) : (
              <S.EmptyState>
                <h3>
                  {activeTab === 'following'
                    ? 'Você não está seguindo ninguém'
                    : 'Ninguém segue você ainda'}
                </h3>
                <p>
                  {activeTab === 'following'
                    ? 'Quando seguir alguém, eles aparecerão aqui.'
                    : 'Quando alguém seguir você, eles aparecerão aqui.'}
                </p>
              </S.EmptyState>
            )}
          </S.UserList>
        </S.FollowContainer>

        <InfoBar variant="default" />
      </ContentWrapper>
    </>
  )
}

export default FollowPage
