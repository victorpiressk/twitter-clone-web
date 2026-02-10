import type { ChangeEvent } from 'react'
import type { InputProps } from './types'
import * as S from './styles'

const Input = ({
  type = 'text',
  name,
  label,
  placeholder,
  value,
  onChange,
  error,
  disabled = false,
  required = false,
  autoFocus = false,
  maxLength,
  multiline = false,
  rows = 3
}: InputProps) => {
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    onChange(e.target.value)
  }

  return (
    <S.InputContainer>
      {label && (
        <S.Label htmlFor={name}>
          {label}
          {required && ' *'}
        </S.Label>
      )}

      <S.InputWrapper>
        {multiline ? (
          <S.StyledTextarea
            id={name}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
            disabled={disabled}
            required={required}
            autoFocus={autoFocus}
            maxLength={maxLength}
            rows={rows}
            $hasError={!!error}
          />
        ) : (
          <S.StyledInput
            id={name}
            name={name}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
            disabled={disabled}
            required={required}
            autoFocus={autoFocus}
            maxLength={maxLength}
            $hasError={!!error}
          />
        )}
      </S.InputWrapper>

      {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
    </S.InputContainer>
  )
}

export default Input
