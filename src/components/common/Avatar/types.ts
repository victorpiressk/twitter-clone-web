import type { UserProfileData } from './components/AvatarProfilePopover/types'

export type AvatarProps = {
  src?: string | null
  alt?: string
  size?: 'small' | 'medium' | 'large'
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void
  showProfilePopover?: boolean
  userProfileData?: UserProfileData
  onFollowToggle?: (userId: string) => void
}
