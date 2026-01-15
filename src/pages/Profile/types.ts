export type UserProfile = {
  id: string
  username: string
  displayName: string
  bio?: string
  location?: string
  website?: string
  joinedAt: string
  avatar?: string
  banner?: string
  stats: {
    posts: number
    following: number
    followers: number
  }
  isFollowing: boolean
  isOwnProfile: boolean
}

export type ProfileTab = 'posts' | 'replies' | 'media' | 'likes'
