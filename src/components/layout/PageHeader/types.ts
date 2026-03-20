export type TabItem = {
  key: string
  label: string
}

export type PageHeaderVariant =
  | 'home'
  | 'explore'
  | 'notifications'
  | 'messages'
  | 'connect'
  | 'profile'
  | 'post-detail'
  | 'follow-page'
  | 'settings'

export type PageHeaderProps = {
  variant: PageHeaderVariant

  // Título e subtítulo — páginas de detalhe
  title?: string
  subtitle?: string

  // Avatar — páginas principais
  onAvatarClick?: () => void

  // Back button — páginas de detalhe
  onBack?: () => void

  // Tabs — qualquer página que tenha tabs
  tabs?: TabItem[]
  activeTab?: string
  onTabChange?: (tab: string) => void

  // Explore
  isSearchFocused?: boolean
  searchQuery?: string
  onSearchFocus?: () => void
  onSearch?: (query: string) => void
  backButtonMobileOnly?: boolean
}
