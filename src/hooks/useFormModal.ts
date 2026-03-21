import { useCallback, useRef, useState } from 'react'
import { createMediaFile } from '../utils/mediaHelpers'
import { useCreatePost } from './'
import type { Poll, Location } from '../types/domain/models'
import type { PostMediaWithFile } from '../utils/mediaHelpers'

// ============================================
// TYPES
// ============================================

export type FormModalType = 'create' | 'comment' | 'quote' | 'edit'

export type UseFormModalConfig = {
  type: FormModalType
  targetPostId?: number
}

export type UseFormModalReturn = {
  content: string
  medias: PostMediaWithFile[]
  location: Location | null
  poll: Poll | null
  scheduledFor: Date | null
  isSubmitting: boolean
  handleContentChange: (value: string) => void
  handleMediasChange: (newMedias: PostMediaWithFile[]) => void
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
  isDisabled: boolean
}

// ============================================
// HOOK
// ============================================

export const useFormModal = (
  config: UseFormModalConfig
): UseFormModalReturn => {
  const { type, targetPostId } = config

  // ============================================
  // DEPENDENCIES
  // ============================================

  const { createPost, quoteTweet, commentPost, updatePost, isCreating } =
    useCreatePost()

  // ============================================
  // STATE
  // ============================================

  const [content, setContent] = useState('')
  const [medias, setMedias] = useState<PostMediaWithFile[]>([])
  const [location, setLocation] = useState<Location | null>(null)
  const [poll, setPoll] = useState<Poll | null>(null)
  const [scheduledFor, setScheduledFor] = useState<Date | null>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // ============================================
  // MEDIA HANDLERS
  // ============================================

  const handleMediasChange = useCallback((newMedias: PostMediaWithFile[]) => {
    setMedias(newMedias)
  }, [])

  const handleMediaUpload = useCallback((newFiles: File[]) => {
    const validMedias: PostMediaWithFile[] = newFiles.map((file) =>
      createMediaFile(file)
    )
    if (validMedias.length > 0) {
      setMedias((prev) => [...prev, ...validMedias])
    }
  }, [])

  const handleRemoveMedia = useCallback((id: string) => {
    setMedias((prev) => {
      const removed = prev.find((m) => m.id === id)
      if (removed) URL.revokeObjectURL(removed.url)
      return prev.filter((m) => m.id !== id)
    })
  }, [])

  // ============================================
  // CONTENT HANDLERS
  // ============================================

  const handleContentChange = useCallback((value: string) => {
    setContent(value)
  }, [])

  const handleEmojiSelect = useCallback((emoji: string) => {
    setContent((prev) => prev + emoji)
    setTimeout(() => textareaRef.current?.focus(), 0)
  }, [])

  // ============================================
  // EXTRA HANDLERS
  // ============================================

  const handleLocationSelect = useCallback(
    (loc: Location) => setLocation(loc),
    []
  )

  const handleRemoveLocation = useCallback(() => setLocation(null), [])

  const handlePollCreate = useCallback(
    (pollData: Poll) => {
      setPoll(pollData)
      if (medias.length > 0) {
        medias.forEach((m) => URL.revokeObjectURL(m.url))
        setMedias([])
      }
    },
    [medias]
  )

  const handleRemovePoll = useCallback(() => setPoll(null), [])

  const handleSchedule = useCallback(
    (scheduledDate: Date) => setScheduledFor(scheduledDate),
    []
  )

  const handleRemoveSchedule = useCallback(() => setScheduledFor(null), [])

  // ============================================
  // RESET
  // ============================================

  const reset = useCallback(() => {
    setContent('')
    medias.forEach((m) => URL.revokeObjectURL(m.url))
    setMedias([])
    setLocation(null)
    setPoll(null)
    setScheduledFor(null)
  }, [medias])

  const handleClose = useCallback(() => {
    reset()
  }, [reset])

  // ============================================
  // SUBMIT
  // ============================================

  const handleSubmit = useCallback(async () => {
    if (!content.trim() && medias.length === 0) return

    try {
      const files =
        medias.length > 0
          ? medias
              .map((m) => m._file)
              .filter((f): f is File => f instanceof File)
          : undefined

      switch (type) {
        case 'create':
          await createPost(content.trim(), files)
          break
        case 'comment':
          if (!targetPostId) throw new Error('targetPostId obrigatório')
          await commentPost(targetPostId, content.trim(), files)
          break
        case 'quote':
          if (!targetPostId) throw new Error('targetPostId obrigatório')
          await quoteTweet(targetPostId, content.trim(), files)
          break
        case 'edit':
          if (!targetPostId) throw new Error('targetPostId obrigatório')
          await updatePost(targetPostId, content.trim(), files)
          break
        default:
          throw new Error(`Tipo desconhecido: ${type}`)
      }

      reset()
    } catch (error) {
      console.error('Erro ao processar:', error)
    }
  }, [
    type,
    targetPostId,
    content,
    medias,
    createPost,
    commentPost,
    quoteTweet,
    updatePost,
    reset
  ])

  // ============================================
  // VALIDATION
  // ============================================

  const isDisabled =
    (!content.trim() && medias.length === 0) || content.length > 280

  // ============================================
  // RETURN
  // ============================================

  return {
    content,
    medias,
    location,
    poll,
    scheduledFor,
    isSubmitting: isCreating,
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
    isDisabled
  }
}
