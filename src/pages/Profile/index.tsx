import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ProfileHeader from './components/ProfileHeader'
import ProfileTabs from './components/ProfileTabs'
import PostList from '../../components/common/PostList'
import EditProfileModal from './components/EditProfileModal'
import PostListSkeleton from '../../components/common/Skeleton/components/PostSkeleton/PostListSkeleton'
import type { UserProfile, ProfileTab } from './types'
import type { Post } from '../../components/common/PostCard/types'
import type { EditProfileFormData } from './components/EditProfileModal/types'
import { ContentWrapper } from '../../styles/globalStyles'
import InfoBar from '../../components/Layout/InfoBar'
import BackButton from '../../components/common/BackButton'
import * as S from './styles'

// Mock data (depois vem da API)
const mockUser: UserProfile = {
  id: '1',
  username: 'victor',
  displayName: 'Victor Pires',
  bio: 'Desenvolvedor Full Stack | React + TypeScript + Django\n🚀 Construindo coisas incríveis',
  location: 'Senhor do Bonfim, BA',
  website: 'https://github.com/victorpiressk',
  birthDate: '1995-01-06',
  joinedAt: '2020-01-15T00:00:00Z',
  stats: {
    posts: 123,
    following: 100,
    followers: 500
  },
  isFollowing: false,
  isOwnProfile: true
}

const mockPosts: Post[] = [
  {
    id: '1',
    author: {
      id: '1',
      username: 'victor',
      displayName: 'Victor Pires',
      isFollowing: false
    },
    content: 'Olá mundo! Este é meu primeiro post 🚀',
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    stats: { comments: 12, retweets: 5, likes: 42, views: 1234 },
    isLiked: false,
    isRetweeted: false
  }
]

const Profile = () => {
  const { username } = useParams()
  const [user, setUser] = useState(mockUser)
  const [activeTab, setActiveTab] = useState<ProfileTab>('posts')
  const [posts, setPosts] = useState(mockPosts)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isLoadingPosts, setIsLoadingPosts] = useState(true)

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

  const handleSaveProfile = (data: EditProfileFormData) => {
    console.log('Salvar perfil:', data)

    // Atualiza dados do usuário (mock)
    setUser((prev) => ({
      ...prev,
      displayName: data.displayName,
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

  return (
    <>
      <ContentWrapper>
        <S.ProfileContainer>
          <S.ProfileHeader>
            <BackButton />

            <S.HeaderInfo>
              <S.HeaderTitle>{user.displayName}</S.HeaderTitle>
              <S.PostCount>{user.stats.posts} posts</S.PostCount>
            </S.HeaderInfo>
          </S.ProfileHeader>

          <ProfileHeader
            user={user}
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
        currentData={{
          displayName: user.displayName,
          bio: user.bio || '',
          location: user.location || '',
          website: user.website || '',
          birthDate: user.birthDate,
          avatar: user.avatar,
          banner: user.banner
        }}
      />
    </>
  )
}

export default Profile
