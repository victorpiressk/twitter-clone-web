import type { Location } from './Location'
import type { Poll } from './Poll'
import type { UserCardWithStats } from './User'

export type PostMedia = {
  id: string
  type: 'image' | 'video' | 'gif'
  url: string
  thumbnail?: string
  order: number // ← ordem de exibição
}

export type Post = {
  id: number
  content: string
  author: UserCardWithStats // Usa UserCardWithStats (não duplica tipagem)
  createdAt: string
  updatedAt: string
  publishedAt?: string // ← quando foi/será publicado
  scheduledFor?: string | null // ← data futura de publicação
  isPublished: boolean // ← false se agendado, true se já publicado
  stats: {
    replies: number
    retweets: number
    likes: number
    views: number
  }
  media?: PostMedia[]
  poll?: Poll // ← enquete
  location?: Location // ← geolocalização
  inReplyTo?: number | null // ID do post pai (Quando você responde/comenta um post)
  retweetOf?: number | null // ID do post original (se for retweet)
}

// Extensões para contextos específicos
export type PostWithInteractions = Post & {
  isLiked: boolean
  isRetweeted: boolean
  isBookmarked: boolean
  likeId: number | null
}

export type PostDetail = Post & {
  fullThread?: Post[] // Posts da thread (se existir)
  comments?: Post[] // Comentários do post
}
