import { useMemo, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useAppSelector } from '../../store/hooks'
import { selectCurrentUser } from '../../store/slices/auth/authSlice'
import { useUpdateUserMutation } from '../../store/slices/api/users.api'
import { useViewingUser } from '../../hooks/useViewingUser'
import { useUserActions } from '../../hooks/useUserActions'
import { useToast } from '../../hooks/useToast'
import { usePosts } from '../../hooks/usePosts'
import ProfileHeader from './components/ProfileHeader'
import EditProfileModal from './components/EditProfileModal'
import InfoBar from '../../components/Layout/InfoBar'
import PageHeader from '../../components/Layout/PageHeader'
import Tabs from '../../components/common/Tabs'
import PostCard from '../../components/common/Posts/PostCard'
import PostListSkeleton from '../../components/common/Skeleton/components/PostSkeleton/PostListSkeleton'
import ProfileHeaderSkeleton from '../../components/common/Skeleton/components/ProfileHeaderSkeleton'
import type { UpdateUserRequest } from '../../types/domain/requests'
import { ContentWrapper } from '../../styles/globalStyles'
import * as S from './styles'

const PROFILE_TABS = [
  { key: 'posts', label: 'Posts' },
  { key: 'replies', label: 'Respostas' },
  { key: 'media', label: 'Mídia' },
  { key: 'likes', label: 'Curtidas' }
]

const Profile = () => {
  const { username } = useParams<{ username: string }>()
  const navigate = useNavigate()
  const { showToast } = useToast()

  const [activeTab, setActiveTab] = useState('posts')
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  const currentUser = useAppSelector(selectCurrentUser)
  const { viewingUser, isLoading } = useViewingUser(username)

  const [updateUserMutation] = useUpdateUserMutation()

  const {
    followUser,
    unfollowUser,
    isLoading: isFollowLoading
  } = useUserActions(viewingUser?.id || 0)

  const isOwnProfile = currentUser?.id === viewingUser?.id

  const profileParams = useMemo(() => {
    if (!viewingUser) return undefined

    switch (activeTab) {
      case 'posts':
        return { author: viewingUser.id, has_reply: false, is_retweet: false }
      case 'replies':
        return { author: viewingUser.id, has_reply: true }
      case 'media':
        return { author: viewingUser.id, has_media: true }
      case 'likes':
        return { liked_by: viewingUser.id }
      default:
        return {}
    }
  }, [activeTab, viewingUser])

  const {
    posts,
    isLoading: isLoadingPosts,
    hasMore,
    loadMore,
    refresh
  } = usePosts({
    type: 'profile',
    params: profileParams
  })

  const handleFollowToggle = () => {
    if (viewingUser?.isFollowing) {
      unfollowUser()
    } else {
      followUser()
    }
  }

  const handleEditProfile = () => setIsEditModalOpen(true)

  const handleSaveProfile = async (data: UpdateUserRequest) => {
    if (!viewingUser) return

    try {
      const formData = new FormData()

      if (data.firstName) formData.append('first_name', data.firstName)
      if (data.lastName) formData.append('last_name', data.lastName)
      if (data.bio) formData.append('bio', data.bio)
      if (data.location) formData.append('location', data.location)
      if (data.website) formData.append('website', data.website)
      if (data.birthDate) formData.append('birth_date', data.birthDate)

      if (data.avatar instanceof File) {
        formData.append('profile_image', data.avatar)
      }

      if (data.banner instanceof File) {
        formData.append('banner', data.banner)
      } else if (data.banner === null) {
        formData.append('banner', '')
      }

      await updateUserMutation({
        id: viewingUser.id,
        data: formData
      }).unwrap()

      showToast('success', 'Perfil atualizado com sucesso!')
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error)
      showToast('error', 'Erro ao atualizar perfil')
      throw error
    }
  }

  if (isLoading) {
    return (
      <ContentWrapper>
        <S.ProfileContainer>
          <PageHeader
            variant="profile"
            title="Carregando..."
            onBack={() => navigate(-1)}
          />
          <ProfileHeaderSkeleton />
        </S.ProfileContainer>
        <InfoBar />
      </ContentWrapper>
    )
  }

  return (
    <>
      <ContentWrapper>
        <S.ProfileContainer>
          <PageHeader
            variant="profile"
            title={`${viewingUser!.firstName} ${viewingUser!.lastName}`}
            subtitle={`${viewingUser!.stats.posts} posts`}
            onBack={() => navigate(-1)}
          />

          <ProfileHeader
            user={viewingUser!}
            isOwnProfile={isOwnProfile}
            onFollowToggle={handleFollowToggle}
            isFollowLoading={isFollowLoading}
            onEditProfile={handleEditProfile}
          />

          <Tabs
            tabs={PROFILE_TABS}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />

          <S.TabContent>
            {isLoadingPosts ? (
              <PostListSkeleton count={3} />
            ) : posts.length > 0 ? (
              <InfiniteScroll
                dataLength={posts.length}
                next={loadMore}
                hasMore={hasMore}
                loader={<S.LoadingMore>Carregando...</S.LoadingMore>}
                endMessage={<S.EndMessage>Você chegou ao fim!</S.EndMessage>}
                refreshFunction={refresh}
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
            ) : (
              <S.EmptyState>
                <S.EmptyStateText>
                  {activeTab === 'posts' && 'Nenhum post ainda'}
                  {activeTab === 'replies' && 'Nenhuma resposta ainda'}
                  {activeTab === 'media' && 'Nenhuma mídia ainda'}
                  {activeTab === 'likes' && 'Nenhuma curtida ainda'}
                </S.EmptyStateText>
              </S.EmptyState>
            )}
          </S.TabContent>
        </S.ProfileContainer>
        <InfoBar />
      </ContentWrapper>

      {viewingUser && isOwnProfile && (
        <EditProfileModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleSaveProfile}
          currentData={viewingUser}
        />
      )}
    </>
  )
}

export default Profile
