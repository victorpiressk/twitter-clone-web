import type { Hashtag, Post, User } from '../../../../../types/domain/models'

export type SearchPopoverState = 'empty' | 'history' | 'searching'

export type SearchHistoryItem = {
  id: string
  type: 'search' | 'user'
  text: string
  username?: string
}

export type SearchSuggestion = {
  id: string
  text: string
}

export type SearchResults = {
  users: User[]
  posts: Post[]
  hashtags: Hashtag[]
}

export type SearchPopoverProps = {
  isOpen: boolean
  onClose: () => void
  triggerRef: React.RefObject<HTMLElement | null>
  state: SearchPopoverState
  searchHistory: SearchHistoryItem[]
  onRemoveHistoryItem: (id: string) => void
  onClearHistory: () => void
  onOpenClearModal: () => void
  searchResults?: SearchResults
  onUserClick?: (username: string, displayName: string) => void
  onSuggestionClick?: (text: string) => void
  onPostClick?: (postId: number, username: string) => void
  onHashtagClick?: (hashtag: string) => void
  isLoading?: boolean
  variant?: string
}
