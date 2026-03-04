import type { Poll, Location } from '../../../../types/domain/models'
import type { PostMediaWithFile } from '../../../../utils/mediaHelpers'

export type PostFormActionsProps = {
  content: string
  medias: PostMediaWithFile[] | File[]
  poll?: Poll | null
  maxMedias?: number
  isDisabled: boolean
  maxLength: number
  onMediaUpload: (files: File[]) => void
  onSubmit: () => void
  loading?: boolean
  submitLabel: string
  onEmojiSelect: (emoji: string) => void
  onLocationSelect: (location: Location) => void
  onPollCreate: (poll: Poll) => void
  onSchedule: (scheduledDate: Date) => void
}
