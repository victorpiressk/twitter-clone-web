export type ImageUploadProps = {
  onImagesChange: (files: File[]) => void
  maxImages?: number
  currentImageCount: number
  inputRef?: React.RefObject<HTMLInputElement | null>
}
