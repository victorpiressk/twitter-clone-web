import type { FormModalType } from '../../../../hooks'
import type { Poll, Location } from '../../../../types/domain/models'
import type { PostMediaWithFile } from '../../../../utils/mediaHelpers'

export type BaseFormProps = {
  userName: string
  userAvatar: string | null
  content: string
  medias: PostMediaWithFile[]
  location?: Location | null
  poll?: Poll | null
  scheduledFor?: Date | null
  onContentChange: (value: string) => void
  onMediasChange: (medias: PostMediaWithFile[]) => void
  onRemoveLocation?: () => void
  onRemovePoll?: () => void
  onRemoveSchedule?: () => void
  placeholder?: string
  maxLength?: number
  extraContent?: React.ReactNode
  isModal?: boolean
  mode?: FormModalType
  disabled?: boolean
  onRemoveMedia?: (id: string) => void
  onSubmit?: () => void
}
