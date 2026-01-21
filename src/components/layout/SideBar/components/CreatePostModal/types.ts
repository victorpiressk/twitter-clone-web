export type CreatePostModalProps = {
  isOpen: boolean
  onClose: () => void
  onSubmit: (content: string) => void
  userName?: string
  userAvatar?: string
}
