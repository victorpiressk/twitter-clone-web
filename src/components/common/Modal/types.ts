export type ModalSize = 'small' | 'medium' | 'large' | 'fullscreen'

export type ModalProps = {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  size?: ModalSize
  showOverlay?: boolean // Fundo escurecido
  showCloseButton?: boolean
  title?: string
  footer?: React.ReactNode
  className?: string
}
