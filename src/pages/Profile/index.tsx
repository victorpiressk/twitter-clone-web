import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import ProfileHeader from './components/ProfileHeader'
import ProfileTabs from './components/ProfileTabs'
import PostList from '../../components/common/PostList'
import type { UserProfile, ProfileTab } from './types'
import type { Post } from '../../components/common/PostCard/types'
import * as S from './styles'
import { MainContainer } from '../../styles/globalStyles'
import InfoBar from '../../components/Layout/InfoBar'

// Mock data (depois vem da API)
const mockUser: UserProfile = {
  id: '1',
  username: 'victor',
  displayName: 'Victor Pires',
  bio: 'Desenvolvedor Full Stack | React + TypeScript + Django\n🚀 Construindo coisas incríveis',
  location: 'Senhor do Bonfim, BA',
  website: 'https://github.com/victorpiressk',
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
      displayName: 'Victor Pires'
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
  const navigate = useNavigate()
  const [user, setUser] = useState(mockUser)
  const [activeTab, setActiveTab] = useState<ProfileTab>('posts')
  const [posts, setPosts] = useState(mockPosts)

  // TODO: Integrar com API
  console.log('Viewing profile of:', username)

  // Quando integrar com API:
  // useEffect(() => {
  //   async function fetchProfile() {
  //     const data = await api.getUserProfile(username)
  //     setUser(data)
  //   }
  //   fetchProfile()
  // }, [username])

  const handleFollowToggle = () => {
    setUser((prev) => ({ ...prev, isFollowing: !prev.isFollowing }))
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
    <MainContainer>
      <S.ProfileContainer>
        <S.ProfileHeader>
          <S.BackButton onClick={() => navigate(-1)}>
            <svg viewBox="0 0 24 24">
              <g>
                <path d="M7.414 13l5.043 5.04-1.414 1.42L3.586 12l7.457-7.46 1.414 1.42L7.414 11H21v2H7.414z"></path>
              </g>
            </svg>
          </S.BackButton>

          <S.HeaderInfo>
            <S.HeaderTitle>{user.displayName}</S.HeaderTitle>
            <S.PostCount>{user.stats.posts} posts</S.PostCount>
          </S.HeaderInfo>
        </S.ProfileHeader>

        <ProfileHeader user={user} onFollowToggle={handleFollowToggle} />

        <ProfileTabs activeTab={activeTab} onTabChange={setActiveTab} />

        <S.TabContent>
          {activeTab === 'posts' && (
            <PostList
              posts={posts}
              onLike={handleLike}
              onRetweet={handleRetweet}
              onComment={handleComment}
            />
          )}

          {activeTab === 'replies' && (
            <div
              style={{ padding: '20px', textAlign: 'center', color: '#71767B' }}
            >
              Respostas em breve...
            </div>
          )}

          {activeTab === 'media' && (
            <div
              style={{ padding: '20px', textAlign: 'center', color: '#71767B' }}
            >
              Mídia em breve...
            </div>
          )}

          {activeTab === 'likes' && (
            <div
              style={{ padding: '20px', textAlign: 'center', color: '#71767B' }}
            >
              Curtidas em breve...
            </div>
          )}
        </S.TabContent>
      </S.ProfileContainer>
      <InfoBar />
    </MainContainer>
  )
}

export default Profile
