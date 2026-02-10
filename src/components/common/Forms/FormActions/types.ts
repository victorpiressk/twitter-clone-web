import type { MediaFile } from '../MediaPreview/types'
import type { Location } from './components/MediaActions/LocationPicker/constants/mockLocations'
import type { Poll } from './components/MediaActions/PollCreator/types'

export type PostFormActionsProps = {
  content: string
  medias: MediaFile[]
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
