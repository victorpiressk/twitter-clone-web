export type TextareaProps = {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  maxLength?: number
  rows?: number
}
