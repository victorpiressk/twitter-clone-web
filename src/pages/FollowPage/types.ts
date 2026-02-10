export type FollowTab = 'following' | 'followers'

export type FollowUser = {
  id: string
  username: string
  displayName: string
  avatar?: string
  bio?: string
  isFollowing: boolean
}
