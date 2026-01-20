export type ImageUploadProps = {
  onImagesChange: (files: File[]) => void
  maxImages?: number
  currentImageCount: number
}
