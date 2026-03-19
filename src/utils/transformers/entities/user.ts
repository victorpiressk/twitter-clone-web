import type {
  BackendUser,
  BackendUserCard,
  BackendUserCardWithStats,
  BackendUserPreview,
  BackendUserWithFollowState,
  BackendFollow
} from '../../../types/contracts/dtos'
import type {
  User,
  UserCard,
  UserCardWithStats,
  UserPreview,
  UserWithFollowState,
  Follow
} from '../../../types/domain/models'

export const transformUser = (backendUser: BackendUser): User => ({
  id: backendUser.id,
  username: backendUser.username,
  email: backendUser.email,
  phone: backendUser.phone || null,
  firstName: backendUser.first_name,
  lastName: backendUser.last_name,
  bio: backendUser.bio,
  avatar: backendUser.profile_image,
  banner: backendUser.banner || null,
  location: backendUser.location || '',
  website: backendUser.website || '',
  birthDate: backendUser.birth_date || undefined,
  createdAt: backendUser.created_at,
  stats: {
    posts: backendUser.stats.posts,
    following: backendUser.stats.following,
    followers: backendUser.stats.followers
  }
})

export const transformUserWithFollowState = (
  backendUserWithFollowState: BackendUserWithFollowState
): UserWithFollowState => {
  // 1. Transforma os dados comuns do usuário (id, username, email...)
  const baseUser = transformUser(backendUserWithFollowState)

  // 2. Retorna a união (merge) de tudo que está no baseUser + o novo campo
  return {
    ...baseUser,
    isFollowing: backendUserWithFollowState.is_following
  }
}

export const transformUserPreview = (
  backendUserPreview: BackendUserPreview
): UserPreview => ({
  id: backendUserPreview.id,
  username: backendUserPreview.username,
  firstName: backendUserPreview.first_name,
  lastName: backendUserPreview.last_name,
  avatar: backendUserPreview.profile_image
})

export const transformUserCard = (
  backendUserCard: BackendUserCard
): UserCard => ({
  id: backendUserCard.id,
  username: backendUserCard.username,
  firstName: backendUserCard.first_name,
  lastName: backendUserCard.last_name,
  avatar: backendUserCard.profile_image,
  bio: backendUserCard.bio,
  isFollowing: backendUserCard.is_following
})

export const transformUserToCardWithStats = (
  backendUser: BackendUserCardWithStats
): UserCardWithStats => ({
  id: backendUser.id,
  username: backendUser.username,
  firstName: backendUser.first_name,
  lastName: backendUser.last_name,
  avatar: backendUser.profile_image,
  bio: backendUser.bio,
  isFollowing: backendUser.is_following,
  stats: {
    following: backendUser.stats.following,
    followers: backendUser.stats.followers
  }
})

// frontend -> backend
export const transformUserToBackend = (user: User): BackendUser => ({
  id: user.id,
  username: user.username,
  email: user.email,
  phone: user.phone || null,
  first_name: user.firstName,
  last_name: user.lastName,
  bio: user.bio,
  profile_image: user.avatar,
  banner: user.banner || null,
  location: user.location || '',
  website: user.website || '',
  birth_date: user.birthDate || null,
  created_at: user.createdAt,
  stats: {
    posts: user.stats.posts,
    following: user.stats.following,
    followers: user.stats.followers
  }
})

export const transformFollow = (backend: BackendFollow): Follow => ({
  id: backend.id,
  follower: backend.follower,
  following: backend.following,
  followerUsername: backend.follower_username,
  followingUsername: backend.following_username,
  createdAt: backend.created_at
})
