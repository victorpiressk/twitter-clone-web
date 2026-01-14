import type { ChangeEvent } from 'react'
import type { TextareaProps } from './types'
import * as S from './styles'

const Textarea = ({
  value,
  onChange,
  placeholder = '',
  maxLength,
  rows = 3
}: TextareaProps) => {
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value)
  }

  const isNearLimit = maxLength && value.length >= maxLength * 0.9

  return (
    <S.TextareaContainer>
      <S.StyledTextarea
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        maxLength={maxLength}
        rows={rows}
      />

      {maxLength && value.length > 0 && (
        <S.CharCounter isLimit={!!isNearLimit}>
          {value.length}/{maxLength}
        </S.CharCounter>
      )}
    </S.TextareaContainer>
  )
}

export default Textarea
