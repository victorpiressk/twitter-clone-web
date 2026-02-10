export type LoginModalProps = {
  isOpen: boolean
  onClose: () => void
  onLoginSuccess: () => void
  onOpenRegister: () => void
}

export type LoginStep = 'identifier' | 'password' | 'signup'
