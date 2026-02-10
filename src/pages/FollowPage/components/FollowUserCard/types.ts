import type { FollowUser } from '../../types'

export type FollowUserCardProps = {
  user: FollowUser
  onFollowToggle: (userId: string) => void
}
