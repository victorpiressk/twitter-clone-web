import Avatar from '../../Avatar'
import Textarea from '../../Textarea'
import LocationPreview from '../LocationPreview'
import MediaPreview from '../MediaPreview'
import PollPreview from '../PollPreview'
import SchedulePreview from '../SchedulePreview'
import * as S from './styles'
import type { BaseFormProps } from './types'
import type { PostMediaWithFile } from '../../../../utils/mediaHelpers'

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
  disabled = false,
  onSubmit
}: BaseFormProps) => {
  const handleRemoveMedia = (id: string) => {
    if (onRemoveMedia) {
      onRemoveMedia(id)
    } else {
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
            onKeyDown={(e) => {
              if (
                e.key === 'Enter' &&
                !e.shiftKey &&
                !e.ctrlKey &&
                !e.metaKey
              ) {
                e.preventDefault()
                onSubmit?.()
              }
            }}
          />

          {medias.length > 0 && (
            <MediaPreview medias={medias} onRemove={handleRemoveMedia} />
          )}

          {extraContent && mode === 'quote' && (
            <S.ExtraContentWrapper>{extraContent}</S.ExtraContentWrapper>
          )}

          {poll && onRemovePoll && (
            <PollPreview
              question={poll.question}
              options={poll.options}
              duration={poll.durationHours}
              onRemove={onRemovePoll}
              variant="editable"
            />
          )}

          {scheduledFor && onRemoveSchedule && (
            <SchedulePreview
              scheduledDate={scheduledFor}
              onRemove={onRemoveSchedule}
              variant="editable"
            />
          )}

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
