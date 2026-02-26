import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ProfileHeader from './components/ProfileHeader'
import ProfileTabs from './components/ProfileTabs'
import PostList from '../../components/common/Posts/PostList'
import EditProfileModal from './components/EditProfileModal'
import PostListSkeleton from '../../components/common/Skeleton/components/PostSkeleton/PostListSkeleton'
import type { ProfileTab } from './types'
import { ContentWrapper } from '../../styles/globalStyles'
import InfoBar from '../../components/Layout/InfoBar'
import BackButton from '../../components/common/BackButton'
import * as S from './styles'
import type { PostWithInteractions, User } from '../../types/domain/models'
import { MOCK_CURRENT_USER, MOCK_PROFILE_USER } from '../../mocks/user'

const mockPosts: PostWithInteractions[] = [
  {
    id: 1,
    author: {
      id: 1,
      username: 'victor',
      firstName: 'Victor',
      lastName: 'Pires',
      bio: '',
      isFollowing: false,
      avatar: '',
      stats: {
        following: 100,
        followers: 500
      }
    },
    content: 'Olá mundo! Este é meu primeiro post 🚀',
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    stats: { comments: 12, retweets: 5, likes: 42, views: 1234 },
    updatedAt: '',
    isPublished: true,
    isLiked: false,
    isRetweeted: false,
    isBookmarked: false
  }
]

const Profile = () => {
  const { username } = useParams<{ username: string }>()

  const [user, setUser] = useState(MOCK_CURRENT_USER)
  const [activeTab, setActiveTab] = useState<ProfileTab>('posts')
  const [posts, setPosts] = useState(mockPosts)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isLoadingPosts, setIsLoadingPosts] = useState(true)

  // Calcular isOwnProfile
  const isOwnProfile = MOCK_CURRENT_USER.id === MOCK_PROFILE_USER.id

  useEffect(() => {
    // Simula fetch de posts do usuário
    setTimeout(() => {
      setIsLoadingPosts(false)
    }, 1500)
  }, [])

  // TODO: Integrar com API
  console.log('Viewing profile of:', username)

  const handleFollowToggle = () => {
    setUser((prev) => ({ ...prev, isFollowing: !prev.isFollowing }))
  }

  const handleEditProfile = () => {
    setIsEditModalOpen(true)
  }

  const handleSaveProfile = (data: User) => {
    console.log('Salvar perfil:', data)

    // Atualiza dados do usuário (mock)
    setUser((prev) => ({
      ...prev,
      displayName: data.firstName,
      bio: data.bio,
      location: data.location,
      website: data.website,
      birthDate: data.birthDate
      // TODO: Integrar com API para salvar imagens também
      // avatar: data.profileImage ? URL.createObjectURL(data.profileImage) : prev.avatar,
      // banner: data.bannerImage ? URL.createObjectURL(data.bannerImage) : prev.banner
    }))

    // TODO: Integrar com API
    // await api.updateProfile(user.id, data)
  }

  const handleLike = (postId: number) => {
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

  const handleRetweet = (postId: number) => {
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

  const handleComment = (postId: number) => {
    console.log('Comentar no post:', postId)
  }

  const handleQuoteTweet = (postId: number) => {
    console.log('Quote Tweet do post:', postId)
    // TODO: Abrir modal de Quote Tweet
  }

  return (
    <>
      <ContentWrapper>
        <S.ProfileContainer>
          <S.ProfileHeader>
            <BackButton />

            <S.HeaderInfo>
              <S.HeaderTitle>
                {user.firstName} {user.lastName}
              </S.HeaderTitle>
              <S.PostCount>{user.stats.posts} posts</S.PostCount>
            </S.HeaderInfo>
          </S.ProfileHeader>

          <ProfileHeader
            user={user}
            isOwnProfile={isOwnProfile}
            onFollowToggle={handleFollowToggle}
            onEditProfile={handleEditProfile}
          />

          <ProfileTabs activeTab={activeTab} onTabChange={setActiveTab} />

          <S.TabContent>
            {activeTab === 'posts' && (
              <>
                {isLoadingPosts ? (
                  <PostListSkeleton count={3} />
                ) : (
                  <PostList
                    posts={posts}
                    onLike={handleLike}
                    onRetweet={handleRetweet}
                    onComment={handleComment}
                    onQuoteTweet={handleQuoteTweet}
                  />
                )}
              </>
            )}

            {activeTab === 'replies' && (
              <div
                style={{
                  padding: '20px',
                  textAlign: 'center',
                  color: '#71767B'
                }}
              >
                Respostas em breve...
              </div>
            )}

            {activeTab === 'media' && (
              <div
                style={{
                  padding: '20px',
                  textAlign: 'center',
                  color: '#71767B'
                }}
              >
                Mídia em breve...
              </div>
            )}

            {activeTab === 'likes' && (
              <div
                style={{
                  padding: '20px',
                  textAlign: 'center',
                  color: '#71767B'
                }}
              >
                Curtidas em breve...
              </div>
            )}
          </S.TabContent>
        </S.ProfileContainer>
        <InfoBar />
      </ContentWrapper>

      {/* Modal Editar Perfil */}
      <EditProfileModal
        key={isEditModalOpen ? 'open' : 'closed'}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveProfile}
        currentData={user}
      />
    </>
  )
}

export default Profile
