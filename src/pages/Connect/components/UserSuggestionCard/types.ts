import type { UserSuggestion } from '../../types'

export type UserSuggestionCardProps = {
  user: UserSuggestion
  onFollowToggle: (userId: string) => void
  showSubscribe?: boolean // Se true, mostra "Inscrever-se" ao invés de "Seguir"
}
