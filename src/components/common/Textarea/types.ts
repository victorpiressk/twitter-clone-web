export type TextareaProps = {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  rows?: number
  maxLength?: number
  disabled?: boolean
}
