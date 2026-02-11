import { useRef, useState, useCallback } from 'react'
import Avatar from '../../../../components/common/Avatar'
import Textarea from '../../../../components/common/Textarea'
import MediaPreview from '../../../../components/common/Forms/MediaPreview'
import LocationPreview from '../../../../components/common/Forms/LocationPreview'
import PollPreview from '../../../../components/common/Forms/PollPreview'
import SchedulePreview from '../../../../components/common/Forms/SchedulePreview'
import PostFormActions from '../../../../components/common/Forms/FormActions'
import { createMediaFile, validateMedia } from '../../../../utils/mediaHelpers'
import { useToast } from '../../../../hooks/useToast'
import type { Poll, PostMedia, Location } from '../../../../models'
import type { PostFormProps } from './types'
import * as S from './styles'

const PostForm = ({
  userName,
  userAvatar,

  // Props controladas (FormModal usa via useFormModal)
  content: controlledContent,
  medias: controlledMedias,
  onContentChange,
  onMediasChange,

  // Props não-controladas (Home usa)
  onSubmit,

  isModal = false,
  showActions = true
}: PostFormProps) => {
  const { showToast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
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

  // Handler: Upload de mídias (valida e cria MediaFile)
  const handleMediaUpload = useCallback(
    (newFiles: File[]) => {
      const validMedias: PostMedia[] = []

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

  // Handler: Submit
  const handleSubmit = async () => {
    if (!content.trim() && medias.length === 0) return

    setIsSubmitting(true)

    try {
      if (onSubmit) {
        await onSubmit(content, medias)
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
      }
    } catch {
      showToast('error', 'Erro ao criar post. Tente novamente.')
    } finally {
      setIsSubmitting(false)
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

        {/* Componente unificado de preview de medias*/}
        {medias.length > 0 && (
          <MediaPreview medias={medias} onRemove={handleRemoveMedia} />
        )}

        {/* Renderizar preview de enquete */}
        {poll && (
          <PollPreview
            question={poll.question}
            options={poll.options}
            duration={poll.durationHours}
            onRemove={handleRemovePoll}
            variant="editable"
          />
        )}

        {/* Renderizar preview de Schedule */}
        {scheduledFor && (
          <SchedulePreview
            scheduledDate={scheduledFor}
            onRemove={handleRemoveSchedule}
            variant="editable"
          />
        )}

        {/* Renderizar preview de location */}
        {location && (
          <LocationPreview
            locationName={location.name}
            onRemove={handleRemoveLocation}
            variant="editable"
          />
        )}

        {/* Renderiza actions apenas se showActions=true */}
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
