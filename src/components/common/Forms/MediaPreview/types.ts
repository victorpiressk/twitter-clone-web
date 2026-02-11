import type { PostMedia } from '../../../../models'

export type MediaPreviewProps = {
  medias: PostMedia[]
  onRemove: (id: string) => void
}
