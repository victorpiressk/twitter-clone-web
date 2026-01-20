export type ImageFile = {
  file: File
  preview: string
  id: string
}

export type ImagePreviewProps = {
  images: ImageFile[]
  onRemove: (id: string) => void
}
