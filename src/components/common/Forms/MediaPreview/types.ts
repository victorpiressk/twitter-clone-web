export type MediaType = 'image' | 'gif' | 'video'

export type MediaFile = {
  file: File
  preview: string
  id: string
  type: MediaType
}

export type MediaPreviewProps = {
  medias: MediaFile[]
  onRemove: (id: string) => void
}
