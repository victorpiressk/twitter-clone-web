export type PopoverPosition =
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right'

export type PopoverProps = {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  triggerRef: React.RefObject<HTMLElement | null> // Referência ao botão que abre
  position?: PopoverPosition
  offset?: number // Distância do trigger
}
