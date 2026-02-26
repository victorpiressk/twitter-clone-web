import { useCallback, useRef, useState } from 'react'
import { useCreatePostMutation } from '../store/slices/api/posts'
import { upsertPost } from '../store/slices/posts/postsSlice'
import { useAppDispatch } from '../store/hooks'
import { useToast } from './useToast'
import type { Poll, PostMedia, Location } from '../types/domain/models'

export type UseFormModalConfig = {
  successMessage: string
  errorMessage: string
}

export type UseFormModalReturn = {
  // Estado
  content: string
  medias: PostMedia[]
  location: Location | null
  poll: Poll | null
  scheduledFor: Date | null
  isSubmitting: boolean

  // Handlers
  handleContentChange: (value: string) => void
  handleMediasChange: (newMedias: PostMedia[]) => void
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
  const dispatch = useAppDispatch()
  const { showToast } = useToast()
  const { successMessage, errorMessage } = config

  // ✅ RTK Query mutation
  const [createPost] = useCreatePostMutation()

  // Estado local do formulário
  const [content, setContent] = useState('')
  const [medias, setMedias] = useState<PostMedia[]>([])
  const [location, setLocation] = useState<Location | null>(null)
  const [poll, setPoll] = useState<Poll | null>(null)
  const [scheduledFor, setScheduledFor] = useState<Date | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Handler: Mudança de conteúdo
  const handleContentChange = useCallback((value: string) => {
    setContent(value)
  }, [])

  // Handler: Mudança direta de mídias
  const handleMediasChange = useCallback((newMedias: PostMedia[]) => {
    setMedias(newMedias)
  }, [])

  // Handler: Upload de mídias
  const handleMediaUpload = useCallback(
    (newFiles: File[]) => {
      const validMedias: PostMedia[] = []

      for (const file of newFiles) {
        if (!file) {
          showToast('error', 'Erro ao carregar mídia!')
          continue
        }
        // TODO: Processar arquivo e criar PostMedia
        // Por enquanto, apenas valida
      }

      if (validMedias.length > 0) {
        setMedias((prev) => [...prev, ...validMedias])
      }
    },
    [showToast]
  )

  // Handler: Remover mídia
  const handleRemoveMedia = useCallback((id: string) => {
    setMedias((prev) => {
      const updated = prev.filter((m) => m.id !== id)
      const removed = prev.find((m) => m.id === id)

      if (removed) {
        URL.revokeObjectURL(removed.url)
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

  // Handlers: Poll
  const handlePollCreate = useCallback(
    (pollData: Poll) => {
      setPoll(pollData)

      // Limpa mídia ao criar poll
      if (medias.length > 0) {
        medias.forEach((m) => URL.revokeObjectURL(m.url))
        setMedias([])
      }
    },
    [medias]
  )

  const handleRemovePoll = useCallback(() => {
    setPoll(null)
  }, [])

  // Handlers: Schedule
  const handleSchedule = useCallback((scheduledDate: Date) => {
    setScheduledFor(scheduledDate)
  }, [])

  const handleRemoveSchedule = useCallback(() => {
    setScheduledFor(null)
  }, [])

  // ✅ Handler: Submit (integrado com Redux)
  const handleSubmit = useCallback(async () => {
    if (!content.trim() && medias.length === 0) return

    setIsSubmitting(true)

    try {
      // ✅ Chama API via RTK Query
      const result = await createPost({
        content: content.trim(),
        media: medias,
        location: location || undefined,
        poll: poll
          ? {
              question: poll.question,
              options: poll.options.map((opt) => opt.text),
              durationHours: poll.durationHours
            }
          : undefined,
        scheduledFor: scheduledFor?.toISOString()
      }).unwrap()

      // ✅ Adiciona post ao feed local (otimista)
      dispatch(
        upsertPost({
          ...result,
          isLiked: false,
          isRetweeted: false,
          isBookmarked: false
        })
      )

      showToast('success', successMessage)

      // Cleanup após sucesso
      setContent('')
      medias.forEach((m) => URL.revokeObjectURL(m.url))
      setMedias([])
      setLocation(null)
      setPoll(null)
      setScheduledFor(null)
    } catch (error) {
      showToast('error', errorMessage)
      console.error('Erro ao criar post:', error)
    } finally {
      setIsSubmitting(false)
    }
  }, [
    content,
    medias,
    location,
    poll,
    scheduledFor,
    createPost,
    dispatch,
    successMessage,
    errorMessage,
    showToast
  ])

  // Handler: Fechar modal (cleanup sem submit)
  const handleClose = useCallback(() => {
    setContent('')
    medias.forEach((m) => URL.revokeObjectURL(m.url))
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
