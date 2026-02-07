import type { ImageFile } from '../../Posts/ImagePreview/types'

export type PostFormMode = 'comment' | 'retweet'

export type BaseFormProps = {
  // Dados do usuário
  userName: string
  userAvatar: string

  // Estado controlado (vem do useFormModal)
  content: string
  images: ImageFile[]
  onContentChange: (value: string) => void
  onImagesChange: (images: ImageFile[]) => void

  // Configuração
  placeholder?: string
  maxLength?: number

  // Conteúdo extra (para Comment/Retweet)
  extraContent?: React.ReactNode
  mode?: PostFormMode

  // Comportamento
  isModal?: boolean
  disabled?: boolean

  // Callbacks para ações
  onRemoveImage?: (id: string) => void
}
