import type { UserCardWithStats } from '../../../../types/domain/models'

export type UserSuggestionCardProps = {
  user: UserCardWithStats
  showSubscribe?: boolean // Se true, mostra "Inscrever-se" ao invés de "Seguir"
}
