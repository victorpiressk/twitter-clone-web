import type { UserCardWithStats } from '../../../../../types/domain/models'

export type AvatarProfilePopoverProps = {
  isOpen: boolean
  userData: UserCardWithStats
  triggerRef: React.RefObject<HTMLElement | null>
  onFollowToggle: () => void
  onClose: () => void
  onMouseEnter?: () => void
  onMouseLeave?: () => void
}
