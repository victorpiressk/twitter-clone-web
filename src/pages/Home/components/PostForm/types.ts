import type { ImageFile } from '../../../../components/common/Posts/ImagePreview/types'

export type PostFormProps = {
  userName?: string
  userAvatar?: string

  // ← Modo controlado (para modal)
  content?: string
  images?: ImageFile[]
  onContentChange?: (value: string) => void
  onImagesChange?: (images: ImageFile[]) => void

  // ← Modo não-controlado (para Home)
  onSubmit?: (content: string, images: ImageFile[]) => void

  // Flags
  isModal?: boolean
  showActions?: boolean // ← Nova flag para esconder actions
}
