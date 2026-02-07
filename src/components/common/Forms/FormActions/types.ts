import type { ImageFile } from '../../Posts/ImagePreview/types'

export type PostFormActionsProps = {
  content: string
  images: ImageFile[]
  maxImages?: number
  isDisabled: boolean
  maxLength: number
  onImageUpload: (files: File[]) => void
  onSubmit: () => void
  loading?: boolean
  submitLabel: string
}
