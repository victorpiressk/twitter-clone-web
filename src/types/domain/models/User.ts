export type User = {
  id: number
  username: string
  firstName: string
  lastName: string
  email: string
  avatar: string | null
  banner: string | null
  bio: string
  location: string
  website: string
  birthDate?: string
  createdAt: string
  stats: {
    posts: number
    following: number
    followers: number
  }
}

export type UserWithFollowState = User & {
  isFollowing: boolean
}

export type UserPreview = Pick<
  User,
  'id' | 'username' | 'firstName' | 'lastName' | 'avatar'
>

export type UserCard = Pick<
  User,
  'id' | 'username' | 'firstName' | 'lastName' | 'avatar' | 'bio'
> & {
  isFollowing: boolean
}

export type UserCardWithStats = UserCard & {
  stats: {
    following: number
    followers: number
  }
}

export type Follow = {
  id: number
  follower: number
  following: number
  followerUsername: string
  followingUsername: string
  createdAt: string
}
