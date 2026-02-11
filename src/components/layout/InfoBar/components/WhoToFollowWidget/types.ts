import type { UserCardWithStats } from '../../../../../models'

export type WhoToFollowWidgetProps = {
  user: UserCardWithStats // ← Usuário logado
  suggestions: UserCardWithStats[] // ← Lista de sugestões
  onFollowToggle: (userId: number) => void // ← number
}
