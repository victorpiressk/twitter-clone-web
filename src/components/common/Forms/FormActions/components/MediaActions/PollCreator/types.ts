import type { PollOption } from '../../../../../Posts/PostCard/types'

export type Poll = {
  question: string
  options: PollOption[]
  duration: number // horas
}

export type PollCreatorProps = {
  isOpen: boolean
  onClose: () => void
  triggerRef: React.RefObject<HTMLElement | null>
  onPollCreate: (poll: Poll) => void
}
