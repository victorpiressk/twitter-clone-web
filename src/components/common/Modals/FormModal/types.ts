import type { FormModalType } from '../../../../hooks'

export type FormModalProps = {
  // Controle do modal
  isOpen: boolean
  onClose: () => void

  // Dados do usuário
  userName: string
  userAvatar: string | null

  // Configuração do formulário
  placeholder?: string
  submitLabel?: string
  successMessage: string
  errorMessage: string

  // Conteúdo extra (para Comment/Retweet)
  extraContent?: React.ReactNode
  mode: FormModalType
  originalPostId?: number

  // Customização (opcional)
  maxLength?: number
  modalSize?: 'small' | 'medium' | 'large'
}
