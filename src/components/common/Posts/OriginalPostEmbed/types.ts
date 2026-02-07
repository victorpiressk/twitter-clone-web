import type { PostMedia, UserCard } from '../PostCard/types'

export type OriginalPostEmbedProps = {
  post: {
    id: number
    author: UserCard
    content: string
    createdAt: string
    media?: PostMedia[]
  }
}
