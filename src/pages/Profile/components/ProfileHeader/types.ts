import type { UserWithFollowState } from '../../../../types/domain/models'

export type ProfileHeaderProps = {
  user: UserWithFollowState
  isOwnProfile: boolean
  onFollowToggle?: () => void
  isFollowLoading?: boolean
  onEditProfile?: () => void
}
