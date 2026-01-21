import { useRef, useEffect, type ChangeEvent } from 'react'
import type { TextareaProps } from './types'
import * as S from './styles'

const Textarea = ({
  value,
  onChange,
  placeholder = '',
  rows = 1,
  maxLength
}: TextareaProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const adjustHeight = () => {
    const textarea = textareaRef.current
    if (!textarea) return

    textarea.style.height = 'auto'
    textarea.style.height = `${textarea.scrollHeight}px`
  }

  useEffect(() => {
    adjustHeight()
  }, [value])

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value)
  }

  return (
    <S.TextareaContainer>
      <S.StyledTextarea
        ref={textareaRef}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        rows={rows}
        maxLength={maxLength}
      />
    </S.TextareaContainer>
  )
}

export default Textarea
