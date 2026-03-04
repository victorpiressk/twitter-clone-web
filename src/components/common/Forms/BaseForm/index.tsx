// src/components/common/Forms/BaseForm/BaseForm.tsx
import Avatar from '../../Avatar'
import Textarea from '../../Textarea'
import MediaPreview from '../MediaPreview'
import LocationPreview from '../LocationPreview'
import PollPreview from '../PollPreview'
import SchedulePreview from '../SchedulePreview'
import type { PostMediaWithFile } from '../../../../utils/mediaHelpers'
import type { BaseFormProps } from './types'
import * as S from './styles'

const BaseForm = ({
  userName,
  userAvatar,
  content,
  medias,
  location,
  poll,
  scheduledFor,
  onContentChange,
  onMediasChange,
  onRemoveMedia,
  onRemoveLocation,
  onRemovePoll,
  onRemoveSchedule,
  placeholder = 'O que está acontecendo?',
  maxLength = 280,
  extraContent,
  isModal = false,
  mode = 'comment',
  disabled = false
}: BaseFormProps) => {
  const handleRemoveMedia = (id: string) => {
    if (onRemoveMedia) {
      onRemoveMedia(id)
    } else {
      // Fallback
      const updated = medias.filter((m) => m.id !== id)
      const removed = medias.find((m) => m.id === id)

      if (removed && 'url' in removed) {
        URL.revokeObjectURL(removed.url)
      }

      onMediasChange(updated as PostMediaWithFile[])
    }
  }

  return (
    <S.Container $isModal={isModal}>
      {/* ✅ CORRIGIDO: Renderiza extraContent para comments */}
      {extraContent && mode === 'comment' && (
        <S.ExtraContentWrapper>{extraContent}</S.ExtraContentWrapper>
      )}

      <S.Content>
        <Avatar src={userAvatar} alt={userName} size="small" />

        <S.TextareaWrapper>
          <Textarea
            value={content}
            onChange={onContentChange}
            placeholder={placeholder}
            maxLength={maxLength}
            rows={1}
            disabled={disabled}
          />

          {/* MediaPreview */}
          {medias.length > 0 && (
            <MediaPreview medias={medias} onRemove={handleRemoveMedia} />
          )}

          {/* ✅ CORRIGIDO: Renderiza extraContent para quotes também */}
          {extraContent && mode === 'quote' && (
            <S.ExtraContentWrapper>{extraContent}</S.ExtraContentWrapper>
          )}

          {/* PollPreview */}
          {poll && onRemovePoll && (
            <PollPreview
              question={poll.question}
              options={poll.options}
              duration={poll.durationHours}
              onRemove={onRemovePoll}
              variant="editable"
            />
          )}

          {/* SchedulePreview */}
          {scheduledFor && onRemoveSchedule && (
            <SchedulePreview
              scheduledDate={scheduledFor}
              onRemove={onRemoveSchedule}
              variant="editable"
            />
          )}

          {/* LocationPreview */}
          {location && onRemoveLocation && (
            <LocationPreview
              locationName={location.name}
              onRemove={onRemoveLocation}
              variant="editable"
            />
          )}
        </S.TextareaWrapper>
      </S.Content>
    </S.Container>
  )
}

export default BaseForm
