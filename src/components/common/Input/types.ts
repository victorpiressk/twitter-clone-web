export type InputProps = {
  type?: 'text' | 'email' | 'password' | 'number'
  name: string
  label?: string
  placeholder?: string
  value: string
  onChange: (value: string) => void
  error?: string
  disabled?: boolean
  required?: boolean
  autoFocus?: boolean
}
