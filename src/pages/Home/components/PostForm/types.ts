import type { PostMediaWithFile } from '../../../../utils/mediaHelpers'

export type PostFormProps = {
  // ← Modo controlado (para FormModal)
  // FormModal passa essas props vindas do useFormModal
  content?: string
  medias?: PostMediaWithFile[]
  onContentChange?: (value: string) => void
  onMediasChange?: (medias: PostMediaWithFile[]) => void

  // Flags
  isModal?: boolean
  showActions?: boolean
}
