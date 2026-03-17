export type RegisterModalProps = {
  isOpen: boolean
  onClose: () => void
  onRegisterSuccess: () => void
}

export type RegisterStep = 'basic' | 'complete'

export type ContactType = 'phone' | 'email'

export type RegisterFormData = {
  // Etapa 1
  name: string
  contact: string // celular ou e-mail
  birthDate: string

  // Etapa 2
  username: string
  password: string
  passwordConfirm: string
}
