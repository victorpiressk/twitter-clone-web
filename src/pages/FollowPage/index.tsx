import { useState } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import UserCardListSkeleton from '../../components/common/Skeleton/components/UserCardSkeleton/UserCardListSkeleton'
import InfoBar from '../../components/layout/InfoBar'
import PageHeader from '../../components/layout/PageHeader'
import { ScrollToTop } from '../../hooks/useScrollToTop'
import { useViewingUser } from '../../hooks/useViewingUser'
import { useAppSelector } from '../../store/hooks'
import {
  useGetUserFollowersQuery,
  useGetUserFollowingQuery
} from '../../store/slices/api/users.api'
import { selectCurrentUser } from '../../store/slices/auth/authSlice'
import { ContentWrapper } from '../../styles/globalStyles'
import FollowUserCard from './components/FollowUserCard'
import * as S from './styles'

const FOLLOW_TABS = [
  { key: 'followers', label: 'Seguidores' },
  { key: 'following', label: 'Seguindo' }
]

const FollowPage = () => {
  const { username } = useParams<{ username: string }>()
  const location = useLocation()

  const [activeTab, setActiveTab] = useState(() =>
    location.pathname.endsWith('/following') ? 'following' : 'followers'
  )

  const currentUser = useAppSelector(selectCurrentUser)
  const { viewingUser, isLoading: isLoadingUser } = useViewingUser(username)

  const { data: followersData, isLoading: isLoadingFollowers } =
    useGetUserFollowersQuery(
      { userId: viewingUser?.id ?? 0 },
      { skip: !viewingUser || activeTab !== 'followers' }
    )

  const { data: followingData, isLoading: isLoadingFollowing } =
    useGetUserFollowingQuery(
      { userId: viewingUser?.id ?? 0 },
      { skip: !viewingUser || activeTab !== 'following' }
    )

  const activeData = activeTab === 'followers' ? followersData : followingData
  const isLoading =
    isLoadingUser ||
    (activeTab === 'followers' ? isLoadingFollowers : isLoadingFollowing)

  const isOwnProfile = currentUser?.id === viewingUser?.id

  if (isLoadingUser || !viewingUser) {
    return (
      <ContentWrapper>
        <S.FollowContainer>
          <PageHeader
            variant="follow-page"
            title="Carregando..."
            tabs={FOLLOW_TABS}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
          <UserCardListSkeleton count={5} />
        </S.FollowContainer>
        <InfoBar />
      </ContentWrapper>
    )
  }

  return (
    <>
      <ScrollToTop />
      <ContentWrapper>
        <S.FollowContainer>
          <PageHeader
            variant="follow-page"
            title={`${viewingUser.firstName} ${viewingUser.lastName}`}
            subtitle={`@${viewingUser.username}`}
            tabs={FOLLOW_TABS}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />

          <S.UserList>
            {isLoading ? (
              <UserCardListSkeleton count={5} />
            ) : (
              <>
                {activeData && activeData.results.length > 0 ? (
                  activeData.results.map((user) => (
                    <FollowUserCard key={user.id} user={user} />
                  ))
                ) : (
                  <S.EmptyState>
                    <S.EmptyStateText>
                      {activeTab === 'followers'
                        ? isOwnProfile
                          ? 'Você ainda não tem seguidores.'
                          : `${viewingUser.firstName} ainda não tem seguidores.`
                        : isOwnProfile
                          ? 'Você ainda não está seguindo ninguém.'
                          : `${viewingUser.firstName} ainda não está seguindo ninguém.`}
                    </S.EmptyStateText>
                  </S.EmptyState>
                )}
              </>
            )}
          </S.UserList>
        </S.FollowContainer>
        <InfoBar />
      </ContentWrapper>
    </>
  )
}

export default FollowPage
