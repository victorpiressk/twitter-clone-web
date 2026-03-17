import type {
  BackendPoll,
  BackendPollOption,
  BackendPollWithUserVote
} from '../../../types/contracts/dtos'
import type {
  Poll,
  PollOption,
  PollWithUserVote
} from '../../../types/domain/models'

// ============================================
// BACKEND → FRONTEND
// ============================================

export const transformPollOption = (
  backendPollOption: BackendPollOption
): PollOption => ({
  id: backendPollOption.id,
  text: backendPollOption.text,
  votes: backendPollOption.votes,
  percentage: backendPollOption.percentage
})

export const transformPoll = (backendPoll: BackendPoll): Poll => ({
  id: backendPoll.id,
  question: backendPoll.question,
  options: backendPoll.options.map(transformPollOption), // Uso interno do transform
  durationHours: backendPoll.duration_hours,
  endsAt: backendPoll.ends_at,
  totalVotes: backendPoll.total_votes,
  isActive: backendPoll.is_active
})

export const transformPollWithUserVote = (
  backendPollWithUserVote: BackendPollWithUserVote
): PollWithUserVote => {
  // 1. Transforma os dados comuns da enquete (id, question, options...)
  const basePoll = transformPoll(backendPollWithUserVote)

  // 2. Retorna a união (merge) de tudo que está na basePoll + o novo campo
  return {
    ...basePoll,
    userVote: backendPollWithUserVote.user_vote
  }
}

// ============================================
// FRONTEND → BACKEND
// ============================================

export const transformPollOptionToBackend = (
  pollOption: PollOption
): BackendPollOption => ({
  id: pollOption.id,
  text: pollOption.text,
  votes: pollOption.votes,
  percentage: pollOption.percentage
})

export const transformPollToBackend = (poll: Poll): BackendPoll => ({
  id: poll.id,
  question: poll.question,
  options: poll.options.map(transformPollOptionToBackend),
  duration_hours: poll.durationHours,
  ends_at: poll.endsAt,
  total_votes: poll.totalVotes,
  is_active: poll.isActive
})
