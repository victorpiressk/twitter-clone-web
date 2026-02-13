import type { Poll, PostMedia, Location } from '../../../../models'

export type BaseFormProps = {
  userName: string
  userAvatar: string | null
  content: string
  medias: PostMedia[]
  location?: Location | null
  poll?: Poll | null
  scheduledFor?: Date | null
  onContentChange: (value: string) => void
  onMediasChange: (medias: PostMedia[]) => void
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
