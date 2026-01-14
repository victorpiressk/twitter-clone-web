export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'ghost'
  | 'tab'

export type ButtonProps = {
  type: 'button' | 'submit' | 'link'
  variant?: ButtonVariant
  title?: string
  to?: string
  onClick?: () => void
  children: React.ReactNode
  disabled?: boolean
  active?: boolean
}
