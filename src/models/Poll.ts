export type PollOption = {
  id: number
  text: string
  votes: number
  percentage: number // calculado
}

export type Poll = {
  id: number
  question?: string // opcional, pode estar no content do post
  options: PollOption[]
  durationHours: number // duração em horas (ex: 24, 168)
  endsAt: string // quando termina
  totalVotes: number
}

export type PollWithUserVote = Poll & {
  userVotedOptionId?: number | null // qual opção o usuário votou
}
