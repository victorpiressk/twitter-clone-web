import { useRef, useEffect, type ChangeEvent } from 'react'
import type { TextareaProps } from './types'
import * as S from './styles'

const Textarea = ({
  value,
  onChange,
  placeholder = '',
  maxLength,
  rows = 1
}: TextareaProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const adjustHeight = () => {
    const textarea = textareaRef.current
    if (!textarea) return

    // Reset height para recalcular corretamente
    textarea.style.height = 'auto'

    // Define a altura baseada no scrollHeight
    textarea.style.height = `${textarea.scrollHeight}px`
  }

  useEffect(() => {
    adjustHeight()
  }, [value])

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value)
  }

  const isNearLimit = maxLength && value.length >= maxLength * 0.9

  return (
    <S.TextareaContainer>
      <S.StyledTextarea
        ref={textareaRef}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        maxLength={maxLength}
        rows={rows}
      />

      {maxLength && value.length > 0 && (
        <S.CounterContainer>
          <S.CharCounter isLimit={!!isNearLimit}>
            {value.length}/{maxLength}
          </S.CharCounter>
        </S.CounterContainer>
      )}
    </S.TextareaContainer>
  )
}

export default Textarea
