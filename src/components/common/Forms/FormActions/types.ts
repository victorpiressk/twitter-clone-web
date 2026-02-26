import type { Poll, PostMedia, Location } from '../../../../types/domain/models'

export type PostFormActionsProps = {
  content: string
  medias: PostMedia[]
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
