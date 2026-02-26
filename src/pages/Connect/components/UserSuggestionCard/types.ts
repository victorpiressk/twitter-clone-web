import type { UserCard } from '../../../../types/domain/models'

export type UserSuggestionCardProps = {
  user: UserCard
  onFollowToggle: (userId: number) => void
  showSubscribe?: boolean // Se true, mostra "Inscrever-se" ao invés de "Seguir"
}
