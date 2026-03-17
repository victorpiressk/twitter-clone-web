// src/components/common/Forms/PostForm/PostForm.tsx
import { useRef, useState, useCallback } from 'react'
import { useCreatePost } from '../../../../hooks'
import Avatar from '../../../../components/common/Avatar'
import Textarea from '../../../../components/common/Textarea'
import MediaPreview from '../../../../components/common/Forms/MediaPreview'
import LocationPreview from '../../../../components/common/Forms/LocationPreview'
import PollPreview from '../../../../components/common/Forms/PollPreview'
import SchedulePreview from '../../../../components/common/Forms/SchedulePreview'
import PostFormActions from '../../../../components/common/Forms/FormActions'
import { useAppSelector } from '../../../../store/hooks'
import { selectCurrentUser } from '../../../../store/slices/auth/authSlice'
import { createMediaFile } from '../../../../utils/mediaHelpers'
import type { Poll, Location } from '../../../../types/domain/models'
import type { PostMediaWithFile } from '../../../../utils/mediaHelpers'
import type { PostFormProps } from './types'
import * as S from './styles'

const PostForm = ({
  // Props controladas (FormModal usa via useFormModal)
  content: controlledContent,
  medias: controlledMedias,
  onContentChange,
  onMediasChange,

  isModal = false,
  showActions = true
}: PostFormProps) => {
  // Usar usuário do Redux
  const user = useAppSelector(selectCurrentUser)

  // ✅ Usa useCreatePost
  const { createPost, isCreating } = useCreatePost()

  const textareaRef = useRef<HTMLTextAreaElement | null>(null)

  // Estado interno (usado quando NÃO é controlado - Home)
  const [internalContent, setInternalContent] = useState('')
  const [internalMedias, setInternalMedias] = useState<PostMediaWithFile[]>([])
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

  // ✅ Handler: Upload de mídias CORRIGIDO
  const handleMediaUpload = useCallback(
    (newFiles: File[]) => {
      // ✅ Usa createMediaFile do mediaHelpers
      const validMedias: PostMediaWithFile[] = newFiles.map((file) =>
        createMediaFile(file)
      )

      if (validMedias.length > 0) {
        if (isControlled) {
          onMediasChange?.([...medias, ...validMedias])
        } else {
          setInternalMedias((prev) => [...prev, ...validMedias])
        }
      }
    },
    [medias, isControlled, onMediasChange]
  )

  // Handler: Remover mídia
  const handleRemoveMedia = (id: string) => {
    const updated = medias.filter((m) => m.id !== id)
    const removed = medias.find((m) => m.id === id)

    if (removed && 'url' in removed) {
      URL.revokeObjectURL(removed.url)
    }

    if (isControlled) {
      onMediasChange?.(updated)
    } else {
      setInternalMedias(updated as PostMediaWithFile[])
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
      medias.forEach((m) => {
        if ('url' in m) {
          URL.revokeObjectURL(m.url)
        }
      })
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

  // ✅ Handler: Submit (usando useCreatePost)
  const handleSubmit = async () => {
    if (!content.trim() && medias.length === 0) return

    try {
      // ✅ Chama createPost do useCreatePost
      await createPost(content.trim(), medias.length > 0 ? medias : undefined)

      // Cleanup (apenas no modo não-controlado)
      if (!isControlled) {
        setInternalContent('')
        medias.forEach((m) => {
          if ('url' in m) {
            URL.revokeObjectURL(m.url)
          }
        })
        setInternalMedias([])
        setLocation(null)
        setPoll(null)
        setScheduledFor(null)
      }
    } catch (error) {
      // Erro já tratado no useCreatePost (toast)
      console.error('Erro ao criar post:', error)
    }
  }

  // Validação
  const isDisabled =
    (!content.trim() && medias.length === 0) || content.length > 280

  return (
    <S.PostFormContainer $isModal={isModal}>
      <Avatar src={user?.avatar} alt={user?.username} size="small" />

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
            loading={isCreating}
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
