import type { UserWithFollowState } from '../../../../models'

export type ProfileHeaderProps = {
  user: UserWithFollowState
  isOwnProfile: boolean
  onFollowToggle: (userId: number) => void
  onEditProfile?: () => void
}
