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
  variant?: string
  matchTriggerWidth?: boolean
}

// Extendendo a interface para aceitar a estratégia (opcional, default 'absolute')
export interface ExtendedPopoverProps extends PopoverProps {
  strategy?: 'absolute' | 'fixed'
}
