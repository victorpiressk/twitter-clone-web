import type { UserProfile } from '../../types'

export type ProfileHeaderProps = {
  user: UserProfile
  onFollowToggle: (userId: string) => void
  onEditProfile?: () => void
}
