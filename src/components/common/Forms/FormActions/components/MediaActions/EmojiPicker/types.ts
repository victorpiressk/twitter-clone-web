export type EmojiPickerProps = {
  isOpen: boolean
  onClose: () => void
  triggerRef: React.RefObject<HTMLElement | null>
  onEmojiSelect: (emoji: string) => void
}
