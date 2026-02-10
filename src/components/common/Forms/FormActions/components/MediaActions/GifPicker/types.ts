export type GifPickerProps = {
  isOpen: boolean
  onClose: () => void
  triggerRef: React.RefObject<HTMLElement | null>
  onGifSelect: (gifUrl: string, gifId: string) => void
}
