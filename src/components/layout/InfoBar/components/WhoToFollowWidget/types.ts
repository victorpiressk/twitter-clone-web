import type { UserProfileData } from '../../../../common/Avatar/components/AvatarProfilePopover/types'

export type UserSuggestion = {
  id: string
  username: string
  displayName: string
  avatar?: string
  bio?: string
  isFollowing: boolean
}

export type WhoToFollowWidgetProps = {
  user: UserProfileData
  suggestions: UserSuggestion[]
  onFollowToggle: (userId: string) => void
}
