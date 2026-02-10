export type PostSchedulerProps = {
  isOpen: boolean
  onClose: () => void
  triggerRef: React.RefObject<HTMLElement | null>
  onSchedule: (scheduledDate: Date) => void
}
