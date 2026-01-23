import type { ImageFile } from '../../../ImagePreview/types'

export type PostFormActionsProps = {
  content: string
  images: ImageFile[]
  maxImages?: number
  isDisabled: boolean
  maxLength: number
  onImageUpload: (files: File[]) => void
  onSubmit: () => void
  loading?: boolean
}
