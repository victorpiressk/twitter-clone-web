export type UserProfileData = {
  id: string
  username: string
  displayName: string
  avatar?: string
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
