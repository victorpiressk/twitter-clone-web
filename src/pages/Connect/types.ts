export type UserSuggestion = {
  id: string
  username: string
  displayName: string
  bio?: string
  avatar?: string
  isFollowing: boolean
  isCreator?: boolean // Para diferenciar criadores
}

export type ConnectTab = 'suggestions' | 'creators'
