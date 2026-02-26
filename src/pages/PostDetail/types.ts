import type { PostWithInteractions } from '../../types/domain/models'

export type PostWithComments = {
  comments: PostWithInteractions[]
}
