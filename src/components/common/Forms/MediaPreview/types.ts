import type { PostMedia } from '../../../../types/domain/models'

export type MediaPreviewProps = {
  medias: PostMedia[]
  onRemove: (id: string) => void
}
