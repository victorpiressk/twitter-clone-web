import { useState } from 'react'
import { X, Plus } from 'lucide-react'
import BasePopover from '../../../../../Popovers/BasePopover'
import { POLL_DURATIONS } from './constants/durations'
import type { PollCreatorProps } from './types'
import * as S from './styles'
import type { Poll, PollOption } from '../../../../../../../types/domain/models'

// ============================================
// FEATURE FLAG
// ============================================
const FEATURE_ENABLED = false // ⏸️ Desabilitado temporariamente

const PollCreatorComponent = ({
  isOpen,
  onClose,
  triggerRef,
  onPollCreate
}: PollCreatorProps) => {
  const [question, setQuestion] = useState('')
  const [optionTexts, setOptionTexts] = useState<string[]>(['', '']) // Mínimo 2 opções
  const [durationHours, setDurationHours] = useState<number>(24) // 1 dia por padrão

  const handleAddOption = () => {
    if (optionTexts.length < 4) {
      setOptionTexts([...optionTexts, ''])
    }
  }

  const handleRemoveOption = (index: number) => {
    if (optionTexts.length > 2) {
      setOptionTexts(optionTexts.filter((_, i) => i !== index))
    }
  }

  const handleOptionChange = (index: number, value: string) => {
    const updated = [...optionTexts]
    updated[index] = value
    setOptionTexts(updated)
  }

  const handleCreate = () => {
    const options: PollOption[] = optionTexts
      .filter((text) => text.trim()) // Remove vazios
      .map((text, index) => ({
        id: Date.now() + index, // ID temporário (backend gera o real)
        text: text.trim(),
        votes: 0,
        percentage: 0
      }))

    if (options.length < 2) {
      alert('Adicione pelo menos 2 opções')
      return
    }

    const now = new Date()
    const endsAt = new Date(now.getTime() + durationHours * 60 * 60 * 1000)

    const poll: Poll = {
      id: Date.now(), // ID temporário
      options,
      durationHours,
      endsAt: endsAt.toISOString(),
      totalVotes: 0,
      isActive: false
    }

    onPollCreate(poll)

    // Reset
    setQuestion('')
    setOptionTexts(['', ''])
    setDurationHours(24)
    onClose()
  }

  const isValid =
    question.trim() && optionTexts.filter((opt) => opt.trim()).length >= 2

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
        <S.PollCreatorContainer>
          <S.Header>
            <S.Title>Enquetes</S.Title>
            <S.CloseButton onClick={onClose}>
              <X />
            </S.CloseButton>
          </S.Header>

          <S.DisabledMessage>
            <S.DisabledTitle>Funcionalidade em desenvolvimento</S.DisabledTitle>
            <S.DisabledText>
              A criação de enquetes estará disponível em breve. Estamos
              trabalhando para trazer esta funcionalidade para você!
            </S.DisabledText>
          </S.DisabledMessage>
        </S.PollCreatorContainer>
      </BasePopover>
    )
  }

  // ============================================
  // FEATURE ENABLED - Funcionalidade completa
  // ============================================
  return (
    <BasePopover
      isOpen={isOpen}
      onClose={onClose}
      position="bottom"
      triggerRef={triggerRef}
      strategy="fixed"
    >
      <S.PollCreatorContainer>
        <S.Header>
          <S.Title>Criar enquete</S.Title>
          <S.CloseButton onClick={onClose}>
            <X />
          </S.CloseButton>
        </S.Header>

        <S.QuestionInput
          type="text"
          placeholder="Faça sua pergunta..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          maxLength={100}
        />

        <S.OptionsContainer>
          {optionTexts.map((option, index) => (
            <S.OptionRow key={index}>
              <S.OptionInput
                type="text"
                placeholder={`Opção ${index + 1}`}
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                maxLength={50}
              />

              {optionTexts.length > 2 && (
                <S.RemoveOptionButton
                  onClick={() => handleRemoveOption(index)}
                  aria-label="Remover opção"
                >
                  <X />
                </S.RemoveOptionButton>
              )}
            </S.OptionRow>
          ))}

          {optionTexts.length < 4 && (
            <S.AddOptionButton onClick={handleAddOption}>
              <Plus />
              Adicionar opção
            </S.AddOptionButton>
          )}
        </S.OptionsContainer>

        <S.DurationContainer>
          <S.DurationLabel>Duração da enquete</S.DurationLabel>
          <S.DurationSelect
            value={durationHours}
            onChange={(e) => setDurationHours(Number(e.target.value))}
          >
            {POLL_DURATIONS.map((d) => (
              <option key={d.hours} value={d.hours}>
                {d.label}
              </option>
            ))}
          </S.DurationSelect>
        </S.DurationContainer>

        <S.CreateButton onClick={handleCreate} disabled={!isValid}>
          Criar enquete
        </S.CreateButton>
      </S.PollCreatorContainer>
    </BasePopover>
  )
}

export default PollCreatorComponent
