import { X } from 'lucide-react'
import type { PollPreviewProps } from './types'
import * as S from './styles'

const PollPreview = ({
  question,
  options,
  duration,
  onRemove,
  variant = 'editable',
  totalVotes = 0,
  votes = {},
  hasVoted = false,
  onVote
}: PollPreviewProps) => {
  // Calcula percentual de votos (para posts publicados)
  const getPercentage = (option: string) => {
    if (totalVotes === 0) return 0
    return Math.round(((votes[option] || 0) / totalVotes) * 100)
  }

  // Formata duração
  const formatDuration = (hours?: number) => {
    if (!hours) return null
    if (hours === 24) return '1 dia restante'
    if (hours === 72) return '3 dias restantes'
    if (hours === 168) return '7 dias restantes'
    return `${hours} horas restantes`
  }

  const handleVote = (index: number) => {
    if (!hasVoted && onVote) {
      onVote(index)
    }
  }

  return (
    <S.PollContainer $variant={variant}>
      <S.PollHeader>
        <S.Question>{question}</S.Question>

        {variant === 'editable' && onRemove && (
          <S.RemoveButton
            type="button"
            onClick={onRemove}
            aria-label="Remover enquete"
          >
            <X />
          </S.RemoveButton>
        )}
      </S.PollHeader>

      <S.OptionsContainer>
        {options.map((option, index) => {
          const percentage = getPercentage(option)
          const showResults = variant === 'display' && hasVoted

          return (
            <S.OptionButton
              key={index}
              onClick={() => handleVote(index)}
              disabled={variant === 'editable' || hasVoted}
              $hasVoted={hasVoted}
            >
              {showResults && <S.OptionBar $percentage={percentage} />}

              <S.OptionText $hasVoted={hasVoted}>
                <span>{option}</span>
                {showResults && (
                  <S.OptionPercentage>{percentage}%</S.OptionPercentage>
                )}
              </S.OptionText>
            </S.OptionButton>
          )
        })}
      </S.OptionsContainer>

      {(variant === 'display' || duration) && (
        <S.PollFooter>
          {totalVotes > 0 && (
            <S.VoteCount>
              {totalVotes} {totalVotes === 1 ? 'voto' : 'votos'}
            </S.VoteCount>
          )}

          {duration && variant === 'editable' && (
            <S.Duration>{formatDuration(duration)}</S.Duration>
          )}
        </S.PollFooter>
      )}
    </S.PollContainer>
  )
}

export default PollPreview
