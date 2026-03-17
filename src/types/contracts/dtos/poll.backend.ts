export type BackendPollOption = {
  id: number
  text: string
  votes: number
  percentage: number
}

export type BackendPoll = {
  id: number
  question?: string // opcional, pode estar no content do post
  options: BackendPollOption[]
  duration_hours: number // duração em horas (ex: 24, 168)
  ends_at: string // quando termina
  total_votes: number
  is_active: boolean
}

export type BackendPollWithUserVote = BackendPoll & {
  user_vote?: number | null // qual opção o usuário votou
}
