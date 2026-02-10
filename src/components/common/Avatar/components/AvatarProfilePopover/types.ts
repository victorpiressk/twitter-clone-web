export type UserProfileData = {
  id: number
  username: string
  displayName: string
  avatar?: string | null
  bio?: string
  stats: {
    following: number
    followers: number
  }
  isFollowing: boolean
}

export type AvatarProfilePopoverProps = {
  isOpen: boolean
  userData: UserProfileData
  triggerRef: React.RefObject<HTMLElement | null>
  onFollowToggle: (userId: string) => void
  onClose: () => void
  onMouseEnter?: () => void
  onMouseLeave?: () => void
}
