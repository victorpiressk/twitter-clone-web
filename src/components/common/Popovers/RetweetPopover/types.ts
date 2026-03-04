export type RetweetPopoverProps = {
  isOpen: boolean
  onClose: () => void
  triggerRef: React.RefObject<HTMLElement | null>
  isRetweeted: boolean | undefined
  isQuoteRetweet?: boolean
  onRetweet: () => void
  onQuote: () => void
}
