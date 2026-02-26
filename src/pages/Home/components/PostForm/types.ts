import type { PostMedia } from '../../../../types/domain/models'

export type PostFormProps = {
  userName?: string
  userAvatar?: string

  // ← Modo controlado (para FormModal)
  // FormModal passa essas props vindas do useFormModal
  content?: string
  medias?: PostMedia[]
  onContentChange?: (value: string) => void
  onMediasChange?: (medias: PostMedia[]) => void // ← mudou de onImagesChange

  // ← Modo não-controlado (para Home)
  // Home passa apenas onSubmit, PostForm gerencia estado internamente
  onSubmit?: (content: string, medias: PostMedia[]) => void

  // Flags
  isModal?: boolean
  showActions?: boolean
}
