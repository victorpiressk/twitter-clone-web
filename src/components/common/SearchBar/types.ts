export type SearchBarVariant = 'small' | 'large'

export type SearchBarProps = {
  placeholder?: string
  onSearch?: (query: string) => void
  variant?: SearchBarVariant
  onFocus?: () => void
}
