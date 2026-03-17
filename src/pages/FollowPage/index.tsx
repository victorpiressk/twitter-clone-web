// src/pages/FollowPage/index.tsx

import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAppSelector } from '../../store/hooks'
import { selectCurrentUser } from '../../store/slices/auth/authSlice'
import { useViewingUser } from '../../hooks/useViewingUser'
import {
  useGetUserFollowersQuery,
  useGetUserFollowingQuery
} from '../../store/slices/api/users.api'
import FollowTabs from './components/FollowTabs'
import FollowUserCard from './components/FollowUserCard'
import BackButton from '../../components/common/BackButton'
import UserCardListSkeleton from '../../components/common/Skeleton/components/UserCardSkeleton/UserCardListSkeleton'
import { ContentWrapper } from '../../styles/globalStyles'
import InfoBar from '../../components/Layout/InfoBar'
import { ScrollToTop } from '../../hooks/useScrollToTop'
import type { FollowTab } from './types'
import * as S from './styles'

const FollowPage = () => {
  const { username } = useParams<{ username: string }>()
  const [activeTab, setActiveTab] = useState<FollowTab>('followers')

  const currentUser = useAppSelector(selectCurrentUser)

  // ✅ Hook centraliza TODA a lógica de busca/sync/404
  const { viewingUser, isLoading: isLoadingUser } = useViewingUser(username)

  // ✅ Busca seguidores
  const { data: followersData, isLoading: isLoadingFollowers } =
    useGetUserFollowersQuery(
      { userId: viewingUser?.id ?? 0 },
      { skip: !viewingUser || activeTab !== 'followers' }
    )

  // ✅ Busca seguindo
  const { data: followingData, isLoading: isLoadingFollowing } =
    useGetUserFollowingQuery(
      { userId: viewingUser?.id ?? 0 },
      { skip: !viewingUser || activeTab !== 'following' }
    )

  // ✅ Dados da aba ativa
  const activeData = activeTab === 'followers' ? followersData : followingData
  const isLoading =
    isLoadingUser ||
    (activeTab === 'followers' ? isLoadingFollowers : isLoadingFollowing)

  // ✅ Verifica se é próprio perfil
  const isOwnProfile = currentUser?.id === viewingUser?.id

  // ✅ Loading
  if (isLoadingUser || !viewingUser) {
    return (
      <ContentWrapper>
        <S.FollowContainer>
          <S.FollowHeader>
            <BackButton />
            <S.HeaderInfo>
              <S.HeaderName>Carregando...</S.HeaderName>
            </S.HeaderInfo>
          </S.FollowHeader>
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
          <S.FollowHeader>
            <BackButton />
            <S.HeaderInfo>
              <S.HeaderName>
                {viewingUser.firstName} {viewingUser.lastName}
              </S.HeaderName>
              <S.HeaderUsername>@{viewingUser.username}</S.HeaderUsername>
            </S.HeaderInfo>
          </S.FollowHeader>

          <FollowTabs activeTab={activeTab} onTabChange={setActiveTab} />

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
