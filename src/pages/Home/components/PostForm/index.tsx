import { useRef, useState, useCallback } from 'react'
import { useCreatePostMutation } from '../../../../store/slices/api/posts'
import { upsertPost } from '../../../../store/slices/posts/postsSlice'
import { useAppDispatch } from '../../../../store/hooks'
import Avatar from '../../../../components/common/Avatar'
import Textarea from '../../../../components/common/Textarea'
import MediaPreview from '../../../../components/common/Forms/MediaPreview'
import LocationPreview from '../../../../components/common/Forms/LocationPreview'
import PollPreview from '../../../../components/common/Forms/PollPreview'
import SchedulePreview from '../../../../components/common/Forms/SchedulePreview'
import PostFormActions from '../../../../components/common/Forms/FormActions'
import { useToast } from '../../../../hooks/useToast'
import type { Poll, PostMedia, Location } from '../../../../types/domain/models'
import type { PostFormProps } from './types'
import * as S from './styles'
import { store } from '../../../../store'

const PostForm = ({
  userName,
  userAvatar,

  // Props controladas (FormModal usa via useFormModal)
  content: controlledContent,
  medias: controlledMedias,
  onContentChange,
  onMediasChange,

  isModal = false,
  showActions = true
}: PostFormProps) => {
  const dispatch = useAppDispatch()
  const { showToast } = useToast()

  // RTK Query mutation
  const [createPost, { isLoading: isSubmitting }] = useCreatePostMutation()

  const textareaRef = useRef<HTMLTextAreaElement | null>(null)

  // Estado interno (usado quando NÃO é controlado - Home)
  const [internalContent, setInternalContent] = useState('')
  const [internalMedias, setInternalMedias] = useState<PostMedia[]>([])
  const [location, setLocation] = useState<Location | null>(null)
  const [poll, setPoll] = useState<Poll | null>(null)
  const [scheduledFor, setScheduledFor] = useState<Date | null>(null)

  // Decide se usa estado controlado (modal) ou interno (home)
  const isControlled = controlledContent !== undefined
  const content = isControlled ? controlledContent! : internalContent
  const medias = isControlled ? controlledMedias! : internalMedias

  // Handler: Mudança de conteúdo
  const handleContentChange = (value: string) => {
    if (isControlled) {
      onContentChange?.(value)
    } else {
      setInternalContent(value)
    }
  }

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
      }

      if (validMedias.length > 0) {
        if (isControlled) {
          onMediasChange?.([...medias, ...validMedias])
        } else {
          setInternalMedias((prev) => [...prev, ...validMedias])
        }
      }
    },
    [medias, isControlled, onMediasChange, showToast]
  )

  // Handler: Remover mídia
  const handleRemoveMedia = (id: string) => {
    const updated = medias.filter((m) => m.id !== id)
    const removed = medias.find((m) => m.id === id)

    if (removed) {
      URL.revokeObjectURL(removed.url)
    }

    if (isControlled) {
      onMediasChange?.(updated)
    } else {
      setInternalMedias(updated)
    }
  }

  // Handler: Selecionar Emoji
  const handleEmojiSelect = (emoji: string) => {
    handleContentChange(content + emoji)
    setTimeout(() => {
      textareaRef.current?.focus()
    }, 0)
  }

  // Handler: Selecionar Location
  const handleLocationSelect = (loc: Location) => {
    setLocation(loc)
  }

  // Handler: Remover location
  const handleRemoveLocation = () => {
    setLocation(null)
  }

  // Handler: Criar enquete
  const handlePollCreate = (pollData: Poll) => {
    setPoll(pollData)

    // Limpa mídia
    if (medias.length > 0) {
      medias.forEach((m) => URL.revokeObjectURL(m.url))
      if (isControlled) {
        onMediasChange?.([])
      } else {
        setInternalMedias([])
      }
    }
  }

  // Handler: Remover enquete
  const handleRemovePoll = () => {
    setPoll(null)
  }

  // Handler: Criar agendamento
  const handleSchedule = (scheduledDate: Date) => {
    setScheduledFor(scheduledDate)
  }

  // Handler: Remover agendamento
  const handleRemoveSchedule = () => {
    setScheduledFor(null)
  }

  // Handler: Submit (integrado com Redux)
  const handleSubmit = async () => {
    if (!content.trim() && medias.length === 0) return

    try {
      // Chama API via RTK Query
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

      console.log('📥 Post criado - resposta:', result)

      // Adiciona post ao feed local
      dispatch(
        upsertPost({
          ...result,
          isLiked: false,
          isRetweeted: false,
          isBookmarked: false
        })
      )

      console.log('📊 Redux state:', store.getState().posts)

      showToast('success', 'Post criado com sucesso!')

      // Cleanup (apenas no modo não-controlado)
      if (!isControlled) {
        setInternalContent('')
        medias.forEach((m) => URL.revokeObjectURL(m.url))
        setInternalMedias([])
        setLocation(null)
        setPoll(null)
        setScheduledFor(null)
      }
    } catch (error) {
      console.error('Erro ao criar post:', error)
      showToast('error', 'Erro ao criar post. Tente novamente.')
    }
  }

  // Validação
  const isDisabled =
    (!content.trim() && medias.length === 0) || content.length > 280

  return (
    <S.PostFormContainer $isModal={isModal}>
      <Avatar src={userAvatar} alt={userName} size="small" />

      <S.PostFormContent>
        <Textarea
          value={content}
          onChange={handleContentChange}
          placeholder="O que está acontecendo?"
          maxLength={280}
          rows={1}
        />

        {/* Preview de mídias */}
        {medias.length > 0 && (
          <MediaPreview medias={medias} onRemove={handleRemoveMedia} />
        )}

        {/* Preview de enquete */}
        {poll && (
          <PollPreview
            question={poll.question}
            options={poll.options}
            duration={poll.durationHours}
            onRemove={handleRemovePoll}
            variant="editable"
          />
        )}

        {/* Preview de Schedule */}
        {scheduledFor && (
          <SchedulePreview
            scheduledDate={scheduledFor}
            onRemove={handleRemoveSchedule}
            variant="editable"
          />
        )}

        {/* Preview de location */}
        {location && (
          <LocationPreview
            locationName={location.name}
            onRemove={handleRemoveLocation}
            variant="editable"
          />
        )}

        {/* Actions */}
        {showActions && (
          <PostFormActions
            content={content}
            medias={medias}
            poll={poll}
            isDisabled={isDisabled}
            maxLength={280}
            onMediaUpload={handleMediaUpload}
            onSubmit={handleSubmit}
            loading={isSubmitting}
            submitLabel="Postar"
            onEmojiSelect={handleEmojiSelect}
            onLocationSelect={handleLocationSelect}
            onPollCreate={handlePollCreate}
            onSchedule={handleSchedule}
          />
        )}
      </S.PostFormContent>
    </S.PostFormContainer>
  )
}

export default PostForm
