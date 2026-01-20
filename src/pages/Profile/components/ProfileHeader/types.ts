import type { UserProfile } from '../../types'

export type ProfileHeaderProps = {
  user: UserProfile
  onFollowToggle: () => void
  onEditProfile?: () => void
}
