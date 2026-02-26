import type { UserCard } from '../../../../../types/domain/models'

export type SearchPopoverState = 'empty' | 'history' | 'searching'

export type SearchHistoryItem = {
  id: string
  type: 'search' | 'user' // 🔍 busca ou 👤 usuário
  text: string
  username?: string // Se type='user'
}

export type SearchSuggestion = {
  id: string
  text: string
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
  searchSuggestions?: SearchSuggestion[]
  searchResults?: UserCard[]
  variant?: string
}
