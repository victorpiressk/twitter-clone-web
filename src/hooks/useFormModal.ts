import { useState, useCallback } from 'react'
import { useToast } from '../hooks/useToast'
import type { ImageFile } from '../components/common/Posts/ImagePreview/types'

export type UseFormModalConfig = {
  successMessage: string
  errorMessage: string
  onSubmit: (content: string, images?: ImageFile[]) => Promise<void> | void
}

export type UseFormModalReturn = {
  // Estado
  content: string
  images: ImageFile[]
  isSubmitting: boolean

  // Handlers
  handleContentChange: (value: string) => void
  handleImagesChange: (newImages: ImageFile[]) => void
  handleImageUpload: (newFiles: File[]) => void
  handleRemoveImage: (id: string) => void
  handleSubmit: () => Promise<void>
  handleClose: () => void

  // Validação
  isDisabled: boolean
}

export const useFormModal = (
  config: UseFormModalConfig
): UseFormModalReturn => {
  const { showToast } = useToast()
  const { successMessage, errorMessage, onSubmit } = config

  // Estado local
  const [content, setContent] = useState('')
  const [images, setImages] = useState<ImageFile[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Handler: Mudança de conteúdo
  const handleContentChange = useCallback((value: string) => {
    setContent(value)
  }, [])

  // Handler: Mudança de imagens (controle direto)
  const handleImagesChange = useCallback((newImages: ImageFile[]) => {
    setImages(newImages)
  }, [])

  // Handler: Upload de novas imagens
  const handleImageUpload = useCallback((newFiles: File[]) => {
    const newImages: ImageFile[] = newFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      id: `${Date.now()}-${Math.random()}`
    }))

    setImages((prev) => [...prev, ...newImages])
  }, [])

  // Handler: Remover imagem
  const handleRemoveImage = useCallback((id: string) => {
    setImages((prev) => {
      const updated = prev.filter((img) => img.id !== id)
      const removed = prev.find((img) => img.id === id)

      // Libera memória do preview
      if (removed) {
        URL.revokeObjectURL(removed.preview)
      }

      return updated
    })
  }, [])

  // Handler: Submit do formulário
  const handleSubmit = useCallback(async () => {
    if (!content.trim() && images.length === 0) return

    setIsSubmitting(true)

    try {
      await onSubmit(content.trim(), images)
      showToast('success', successMessage)

      // Cleanup após sucesso
      setContent('')
      images.forEach((img) => URL.revokeObjectURL(img.preview))
      setImages([])
    } catch (error) {
      showToast('error', errorMessage)
      console.error('Erro ao enviar formulário:', error)
    } finally {
      setIsSubmitting(false)
    }
  }, [content, images, onSubmit, successMessage, errorMessage, showToast])

  // Handler: Fechar modal (cleanup sem submit)
  const handleClose = useCallback(() => {
    setContent('')
    images.forEach((img) => URL.revokeObjectURL(img.preview))
    setImages([])
  }, [images])

  // Validação
  const isDisabled =
    (!content.trim() && images.length === 0) || content.length > 280

  return {
    // Estado
    content,
    images,
    isSubmitting,

    // Handlers
    handleContentChange,
    handleImagesChange,
    handleImageUpload,
    handleRemoveImage,
    handleSubmit,
    handleClose,

    // Validação
    isDisabled
  }
}
