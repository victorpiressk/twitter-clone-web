import { useCallback, useRef, useState } from 'react'
import { useToast } from './useToast'
import type { MediaFile } from '../components/common/Forms/MediaPreview/types'
import type { Location } from '../components/common/Forms/FormActions/components/MediaActions/LocationPicker/constants/mockLocations'
import type { Poll } from '../components/common/Forms/FormActions/components/MediaActions/PollCreator/types'
import { createMediaFile, validateMedia } from '../utils/mediaHelpers'

export type UseFormModalConfig = {
  successMessage: string
  errorMessage: string
  onSubmit: (
    content: string,
    medias?: MediaFile[],
    location?: Location,
    poll?: Poll,
    scheduledFor?: Date
  ) => Promise<void> | void
}

export type UseFormModalReturn = {
  // Estado
  content: string
  medias: MediaFile[]
  location: Location | null
  poll: Poll | null
  scheduledFor: Date | null
  isSubmitting: boolean

  // Handlers
  handleContentChange: (value: string) => void
  handleMediasChange: (newMedias: MediaFile[]) => void
  handleMediaUpload: (newFiles: File[]) => void
  handleRemoveMedia: (id: string) => void
  handleEmojiSelect: (emoji: string) => void
  handleLocationSelect: (location: Location) => void
  handleRemoveLocation: () => void
  handlePollCreate: (poll: Poll) => void
  handleRemovePoll: () => void
  handleSchedule: (scheduledDate: Date) => void
  handleRemoveSchedule: () => void
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
  const [medias, setMedias] = useState<MediaFile[]>([])
  const [location, setLocation] = useState<Location | null>(null)
  const [poll, setPoll] = useState<Poll | null>(null)
  const [scheduledFor, setScheduledFor] = useState<Date | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Handler: Mudança de conteúdo
  const handleContentChange = useCallback((value: string) => {
    setContent(value)
  }, [])

  // Handler: Mudança direta de mídias (controle direto do array)
  const handleMediasChange = useCallback((newMedias: MediaFile[]) => {
    setMedias(newMedias)
  }, [])

  // Handler: Upload de mídias (funciona para imagem, GIF, vídeo)
  const handleMediaUpload = useCallback(
    (newFiles: File[]) => {
      const validMedias: MediaFile[] = []

      for (const file of newFiles) {
        // Valida antes de adicionar
        const validation = validateMedia(file, [...medias, ...validMedias])

        if (!validation.valid) {
          showToast('error', validation.error!)
          continue
        }

        const mediaFile = createMediaFile(file)
        if (mediaFile) {
          validMedias.push(mediaFile)
        }
      }

      setMedias((prev) => [...prev, ...validMedias])
    },
    [medias, showToast]
  )

  // Handler: Remover mídia
  const handleRemoveMedia = useCallback((id: string) => {
    setMedias((prev) => {
      const updated = prev.filter((m) => m.id !== id)
      const removed = prev.find((m) => m.id === id)

      // Libera memória do preview
      if (removed) {
        URL.revokeObjectURL(removed.preview)
      }

      return updated
    })
  }, [])

  // Handler: Selecionar emoji
  const handleEmojiSelect = useCallback((emoji: string) => {
    setContent((prev) => prev + emoji)
    setTimeout(() => {
      textareaRef.current?.focus()
    }, 0)
  }, [])

  // Handlers: Location
  const handleLocationSelect = useCallback((loc: Location) => {
    setLocation(loc)
  }, [])

  const handleRemoveLocation = useCallback(() => {
    setLocation(null)
  }, [])

  // Handlers de Poll
  const handlePollCreate = useCallback(
    (pollData: Poll) => {
      setPoll(pollData)

      // Limpa mídia ao criar poll (regra: poll OU mídia)
      if (medias.length > 0) {
        medias.forEach((m) => URL.revokeObjectURL(m.preview))
        setMedias([])
      }
    },
    [medias]
  )

  const handleRemovePoll = useCallback(() => {
    setPoll(null)
  }, [])

  // Handlers de Schedule
  const handleSchedule = useCallback((scheduledDate: Date) => {
    setScheduledFor(scheduledDate)
  }, [])

  const handleRemoveSchedule = useCallback(() => {
    setScheduledFor(null)
  }, [])

  // Handler: Submit do formulário
  const handleSubmit = useCallback(async () => {
    if (!content.trim() && medias.length === 0) return

    setIsSubmitting(true)

    try {
      await onSubmit(
        content.trim(),
        medias || undefined,
        location || undefined,
        poll || undefined,
        scheduledFor || undefined
      )
      showToast('success', successMessage)

      // Cleanup após sucesso
      setContent('')
      medias.forEach((m) => URL.revokeObjectURL(m.preview))
      setMedias([])
      setLocation(null)
      setPoll(null)
      setScheduledFor(null)
    } catch (error) {
      showToast('error', errorMessage)
      console.error('Erro ao enviar formulário:', error)
    } finally {
      setIsSubmitting(false)
    }
  }, [
    content,
    medias,
    location,
    poll,
    scheduledFor,
    onSubmit,
    successMessage,
    errorMessage,
    showToast
  ])

  // Handler: Fechar modal (cleanup sem submit)
  const handleClose = useCallback(() => {
    setContent('')
    medias.forEach((m) => URL.revokeObjectURL(m.preview))
    setMedias([])
    setLocation(null)
    setPoll(null)
    setScheduledFor(null)
  }, [medias])

  // Validação
  const isDisabled =
    (!content.trim() && medias.length === 0) || content.length > 280

  return {
    // Estado
    content,
    medias,
    location,
    poll,
    scheduledFor,
    isSubmitting,

    // Handlers
    handleContentChange,
    handleMediasChange,
    handleMediaUpload,
    handleRemoveMedia,
    handleEmojiSelect,
    handleLocationSelect,
    handleRemoveLocation,
    handlePollCreate,
    handleRemovePoll,
    handleSchedule,
    handleRemoveSchedule,
    handleSubmit,
    handleClose,

    // Validação
    isDisabled
  }
}
