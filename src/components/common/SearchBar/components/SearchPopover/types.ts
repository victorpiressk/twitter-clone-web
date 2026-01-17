export type SearchPopoverState = 'empty' | 'history' | 'searching'

export type SearchPopoverProps = {
  isOpen: boolean
  onClose: () => void
  triggerRef: React.RefObject<HTMLElement | null>
  state: SearchPopoverState
  searchValue: string
}
