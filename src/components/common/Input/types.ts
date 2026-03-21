export type InputProps = {
  type?: 'text' | 'email' | 'password' | 'number' | 'url' | 'date'
  name: string
  label?: string
  placeholder?: string
  value: string
  onChange: (value: string) => void
  error?: string
  disabled?: boolean
  required?: boolean
  autoFocus?: boolean
  maxLength?: number
  multiline?: boolean
  rows?: number
  onKeyDown?: (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void
}
