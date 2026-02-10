import type { MediaFile } from '../MediaPreview/types'
import type { Poll } from '../FormActions/components/MediaActions/PollCreator/types'
import type { Location } from '../FormActions/components/MediaActions/LocationPicker/constants/mockLocations'

export type BaseFormProps = {
  userName: string
  userAvatar: string | null
  content: string
  medias: MediaFile[]
  location?: Location | null
  poll?: Poll | null
  scheduledFor?: Date | null
  onContentChange: (value: string) => void
  onMediasChange: (medias: MediaFile[]) => void
  onRemoveLocation?: () => void
  onRemovePoll?: () => void
  onRemoveSchedule?: () => void
  placeholder?: string
  maxLength?: number
  extraContent?: React.ReactNode
  isModal?: boolean
  mode?: 'comment' | 'retweet'
  disabled?: boolean
  onRemoveMedia?: (id: string) => void
}
