import type { PollOption } from '../../Posts/PostCard/types'

export type PollPreviewProps = {
  question?: string
  options: PollOption[]
  duration?: number // horas (opcional para preview durante criação)
  onRemove?: () => void // Só durante criação
  variant?: 'editable' | 'display' // editable = com botão X, display = para votar
  totalVotes?: number // Para posts publicados
  votes?: { [option: number]: number } // Para posts publicados
  hasVoted?: boolean // Se usuário já votou
  onVote?: (optionIndex: number) => void // Callback de voto
}
