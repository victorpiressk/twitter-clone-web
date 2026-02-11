import type { Poll } from '../../../../../../../models'

export type PollCreatorProps = {
  isOpen: boolean
  onClose: () => void
  triggerRef: React.RefObject<HTMLElement | null>
  onPollCreate: (poll: Poll) => void
}
