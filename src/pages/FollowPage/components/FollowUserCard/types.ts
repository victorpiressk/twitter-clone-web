import type { UserCard } from '../../../../types/domain/models'

export type FollowUserCardProps = {
  user: UserCard
  onFollowToggle: (userId: number) => void
}
