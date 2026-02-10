import type { ImageUploadProps } from './types'
import * as S from './styles'

const ImageUpload = ({
  onImagesChange,
  maxImages = 4,
  currentImageCount,
  inputRef
}: ImageUploadProps) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])

    if (!files.length) {
      return
    }

    const validFiles = files.filter((file) => {
      const validTypes = [
        'image/jpeg',
        'image/jpg',
        'image/png',
        'image/gif',
        'image/webp'
      ]
      if (!validTypes.includes(file.type)) {
        alert(`Arquivo ${file.name} não é uma imagem válida`)
        return false
      }

      const maxSize = 5 * 1024 * 1024
      if (file.size > maxSize) {
        alert(`Arquivo ${file.name} excede 5MB`)
        return false
      }

      return true
    })

    const remaining = maxImages - currentImageCount
    const filesToAdd = validFiles.slice(0, remaining)

    if (filesToAdd.length < validFiles.length) {
      alert(`Você pode adicionar no máximo ${maxImages} imagens`)
    }

    if (filesToAdd.length > 0) {
      onImagesChange(filesToAdd)
    }

    e.target.value = ''
  }

  const isDisabled = currentImageCount >= maxImages

  return (
    <S.HiddenInput
      ref={inputRef} // ← USA ref via props
      type="file"
      accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
      multiple
      onChange={handleFileChange}
      disabled={isDisabled}
    />
  )
}

export default ImageUpload
