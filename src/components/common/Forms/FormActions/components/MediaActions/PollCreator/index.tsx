import { useState } from 'react'
import { X, Plus } from 'lucide-react'
import BasePopover from '../../../../../Popovers/BasePopover'
import { POLL_DURATIONS } from './constants/durations'
import type { PollCreatorProps } from './types'
import * as S from './styles'

const PollCreatorComponent = ({
  isOpen,
  onClose,
  triggerRef,
  onPollCreate
}: PollCreatorProps) => {
  const [question, setQuestion] = useState('')
  const [options, setOptions] = useState(['', '']) // Mínimo 2 opções
  const [duration, setDuration] = useState(24) // 1 dia por padrão

  const handleAddOption = () => {
    if (options.length < 4) {
      setOptions([...options, ''])
    }
  }

  const handleRemoveOption = (index: number) => {
    if (options.length > 2) {
      setOptions(options.filter((_, i) => i !== index))
    }
  }

  const handleOptionChange = (index: number, value: string) => {
    const updated = [...options]
    updated[index] = value
    setOptions(updated)
  }

  const handleCreate = () => {
    const filledOptions = options.filter((opt) => opt.trim())

    if (question.trim() && filledOptions.length >= 2) {
      onPollCreate({
        question: question.trim(),
        options: filledOptions,
        duration
      })

      // Reset
      setQuestion('')
      setOptions(['', ''])
      setDuration(24)
      onClose()
    }
  }

  const isValid =
    question.trim() && options.filter((opt) => opt.trim()).length >= 2

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
          {options.map((option, index) => (
            <S.OptionRow key={index}>
              <S.OptionInput
                type="text"
                placeholder={`Opção ${index + 1}`}
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                maxLength={50}
              />

              {options.length > 2 && (
                <S.RemoveOptionButton
                  onClick={() => handleRemoveOption(index)}
                  aria-label="Remover opção"
                >
                  <X />
                </S.RemoveOptionButton>
              )}
            </S.OptionRow>
          ))}

          {options.length < 4 && (
            <S.AddOptionButton onClick={handleAddOption}>
              <Plus />
              Adicionar opção
            </S.AddOptionButton>
          )}
        </S.OptionsContainer>

        <S.DurationContainer>
          <S.DurationLabel>Duração da enquete</S.DurationLabel>
          <S.DurationSelect
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
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
