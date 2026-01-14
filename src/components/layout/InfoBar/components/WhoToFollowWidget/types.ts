export type UserSuggestion = {
  id: string
  username: string
  displayName: string
  avatar?: string
  isFollowing: boolean
}

export type WhoToFollowWidgetProps = {
  suggestions: UserSuggestion[]
  onFollowToggle: (userId: string) => void
}
