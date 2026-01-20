import { useRef } from 'react'
import { Image } from 'lucide-react'
import type { ImageUploadProps } from './types'
import * as S from './styles'

const ImageUpload = ({
  onImagesChange,
  maxImages = 4,
  currentImageCount
}: ImageUploadProps) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleClick = () => {
    inputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])

    if (!files.length) return

    // Validações
    const validFiles = files.filter((file) => {
      // Tipo
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

      // Tamanho (5MB)
      const maxSize = 5 * 1024 * 1024
      if (file.size > maxSize) {
        alert(`Arquivo ${file.name} excede 5MB`)
        return false
      }

      return true
    })

    // Limite de imagens
    const remaining = maxImages - currentImageCount
    const filesToAdd = validFiles.slice(0, remaining)

    if (filesToAdd.length < validFiles.length) {
      alert(`Você pode adicionar no máximo ${maxImages} imagens`)
    }

    if (filesToAdd.length > 0) {
      onImagesChange(filesToAdd)
    }

    // Limpa input para permitir selecionar o mesmo arquivo novamente
    e.target.value = ''
  }

  const isDisabled = currentImageCount >= maxImages

  return (
    <>
      <S.HiddenInput
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
        multiple
        onChange={handleFileChange}
        disabled={isDisabled}
      />
      <button
        type="button"
        onClick={handleClick}
        disabled={isDisabled}
        style={{ display: 'none' }} // Será renderizado pelo PostForm
      >
        <Image size={20} />
      </button>
    </>
  )
}

export default ImageUpload
