import { useState } from 'react'
import { ptBR } from 'date-fns/locale/pt-BR'
import { X } from 'lucide-react'
import DatePicker, { registerLocale } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import BasePopover from '../../../../../Popovers/BasePopover'
import * as S from './styles'
import type { PostSchedulerProps } from './types'

registerLocale('pt-BR', ptBR)

// ============================================
// FEATURE FLAG
// ============================================
const FEATURE_ENABLED = false // Desabilitado temporariamente

const PostSchedulerComponent = ({
  isOpen,
  onClose,
  triggerRef,
  onSchedule
}: PostSchedulerProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  // Data mínima: agora + 5 minutos
  const [minDate] = useState(() => {
    const now = Date.now()
    return new Date(now + 5 * 60 * 1000)
  })

  // Data máxima: agora + 1 ano
  const [maxDate] = useState(() => {
    const now = Date.now()
    return new Date(now + 365 * 24 * 60 * 60 * 1000)
  })

  const handleConfirm = () => {
    if (selectedDate) {
      // Validação extra: garante que não está no passado
      if (selectedDate < new Date()) {
        alert('Não é possível agendar no passado')
        return
      }

      onSchedule(selectedDate)
      setSelectedDate(null)
      onClose()
    }
  }

  const handleCloseInternal = () => {
    setSelectedDate(null)
    onClose()
  }

  // ============================================
  // FEATURE DISABLED - Mostrar mensagem
  // ============================================
  if (!FEATURE_ENABLED) {
    return (
      <BasePopover
        isOpen={isOpen}
        onClose={onClose}
        position="bottom"
        triggerRef={triggerRef}
        strategy="fixed"
      >
        <S.SchedulerContainer>
          <S.Header>
            <S.Title>Agendar post</S.Title>
            <S.CloseButton onClick={onClose}>
              <X />
            </S.CloseButton>
          </S.Header>

          <S.DisabledMessage>
            <S.DisabledTitle>Funcionalidade em desenvolvimento</S.DisabledTitle>
            <S.DisabledText>
              O agendamento de posts estará disponível em breve. Esta
              funcionalidade requer infraestrutura adicional (Redis, Celery) que
              será implementada futuramente.
            </S.DisabledText>
          </S.DisabledMessage>
        </S.SchedulerContainer>
      </BasePopover>
    )
  }

  // ============================================
  // FEATURE ENABLED - Funcionalidade completa
  // ============================================
  return (
    <BasePopover
      isOpen={isOpen}
      onClose={handleCloseInternal}
      position="bottom"
      triggerRef={triggerRef}
      strategy="fixed"
    >
      <S.SchedulerContainer>
        <S.Header>
          <S.Title>Agendar post</S.Title>
          <S.CloseButton onClick={handleCloseInternal}>
            <X />
          </S.CloseButton>
        </S.Header>

        <S.InfoText>Escolha data e hora para publicar seu post</S.InfoText>

        <S.DatePickerWrapper>
          <DatePicker
            selected={selectedDate}
            onChange={(date: Date | null) => setSelectedDate(date)}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            timeCaption="Hora"
            dateFormat="dd/MM/yyyy HH:mm"
            locale="pt-BR"
            minDate={minDate}
            maxDate={maxDate}
            inline
            calendarStartDay={0}
          />
        </S.DatePickerWrapper>

        <S.ConfirmButton onClick={handleConfirm} disabled={!selectedDate}>
          Confirmar agendamento
        </S.ConfirmButton>
      </S.SchedulerContainer>
    </BasePopover>
  )
}

export default PostSchedulerComponent
