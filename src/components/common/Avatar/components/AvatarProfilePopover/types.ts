import type { UserCardWithStats } from '../../../../../models'

export type AvatarProfilePopoverProps = {
  isOpen: boolean
  userData: UserCardWithStats
  triggerRef: React.RefObject<HTMLElement | null>
  onFollowToggle: (userId: number) => void
  onClose: () => void
  onMouseEnter?: () => void
  onMouseLeave?: () => void
}
