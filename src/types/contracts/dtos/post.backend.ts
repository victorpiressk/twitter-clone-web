import type { BackendLocation } from './location.backend'
import type { BackendPoll } from './poll.backend'
import type { BackendUserCardWithStats } from './user.backend'

export type BackendPostMedia = {
  id: string
  type: 'image' | 'video' | 'gif'
  url: string
  thumbnail?: string
  order: number // ← ordem de exibição
}

export type BackendPost = {
  id: number
  content: string
  author: BackendUserCardWithStats // Usa UserCardWithStats (não duplica tipagem)
  created_at: string
  updated_at: string
  published_at?: string // ← quando foi/será publicado
  scheduled_for?: string | null // ← data futura de publicação
  is_published: boolean // ← false se agendado, true se já publicado
  stats: {
    comments: number
    retweets: number
    likes: number
    views: number
  }
  media?: BackendPostMedia[]
  poll?: BackendPoll // ← enquete
  location?: BackendLocation // ← geolocalização
  in_reply_to?: number | null // ID do post pai (Quando você responde/comenta um post)
  retweet_of?: number | null // ID do post original (se for retweet)
}

// Extensões para contextos específicos
export type BackendPostWithInteractions = BackendPost & {
  is_liked: boolean
  is_retweeted: boolean
  is_bookmarked: boolean
}

export type BackendPostDetail = BackendPost & {
  full_thread?: BackendPost[] // Posts da thread (se existir)
  comments?: BackendPost[] // Comentários do post
}
