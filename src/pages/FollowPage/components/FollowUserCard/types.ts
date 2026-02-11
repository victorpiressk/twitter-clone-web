import type { UserCard } from '../../../../models'

export type FollowUserCardProps = {
  user: UserCard
  onFollowToggle: (userId: number) => void
}
