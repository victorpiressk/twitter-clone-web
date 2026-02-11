import type { UserCardWithStats } from '../../../models'

export type AvatarProps = {
  src?: string | null
  alt?: string
  size?: 'small' | 'medium' | 'large'
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void
  showProfilePopover?: boolean
  userProfileData?: UserCardWithStats
  onFollowToggle?: (userId: number) => void
}
