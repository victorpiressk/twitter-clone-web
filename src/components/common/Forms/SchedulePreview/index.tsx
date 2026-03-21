import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { X, Calendar, Clock } from 'lucide-react'
import * as S from './styles'
import type { SchedulePreviewProps } from './types'

const SchedulePreview = ({
  scheduledDate,
  onRemove,
  variant = 'editable'
}: SchedulePreviewProps) => {
  // Formata data e hora
  const formatScheduledDate = (date: Date) => {
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    const dateStr = format(date, 'dd/MM/yyyy', { locale: ptBR })
    const timeStr = format(date, 'HH:mm', { locale: ptBR })

    // Se for hoje
    if (format(date, 'yyyy-MM-dd') === format(today, 'yyyy-MM-dd')) {
      return `Hoje às ${timeStr}`
    }

    // Se for amanhã
    if (format(date, 'yyyy-MM-dd') === format(tomorrow, 'yyyy-MM-dd')) {
      return `Amanhã às ${timeStr}`
    }

    // Outra data
    return `${dateStr} às ${timeStr}`
  }

  return (
    <S.ScheduleContainer $variant={variant}>
      <S.ScheduleIcon>
        {variant === 'editable' ? <Calendar /> : <Clock />}
      </S.ScheduleIcon>

      <S.ScheduleInfo>
        <S.ScheduleLabel>
          {variant === 'editable' ? 'Agendado para' : 'Publicação agendada'}
        </S.ScheduleLabel>
        <S.ScheduleText title={formatScheduledDate(scheduledDate)}>
          {formatScheduledDate(scheduledDate)}
        </S.ScheduleText>
      </S.ScheduleInfo>

      {variant === 'editable' && onRemove && (
        <S.RemoveButton
          type="button"
          onClick={onRemove}
          aria-label="Remover agendamento"
        >
          <X />
        </S.RemoveButton>
      )}
    </S.ScheduleContainer>
  )
}

export default SchedulePreview
