import type { MediaFile } from '../../../../components/common/Forms/MediaPreview/types'

export type PostFormProps = {
  userName?: string
  userAvatar?: string

  // ← Modo controlado (para FormModal)
  // FormModal passa essas props vindas do useFormModal
  content?: string
  medias?: MediaFile[]
  onContentChange?: (value: string) => void
  onMediasChange?: (medias: MediaFile[]) => void // ← mudou de onImagesChange

  // ← Modo não-controlado (para Home)
  // Home passa apenas onSubmit, PostForm gerencia estado internamente
  onSubmit?: (content: string, medias: MediaFile[]) => void

  // Flags
  isModal?: boolean
  showActions?: boolean
}
