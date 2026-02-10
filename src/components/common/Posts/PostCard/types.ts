import type { MediaFile } from '../../Forms/MediaPreview/types'

export type User = {
  id: number
  username: string
  first_name: string
  last_name: string
  email: string
  profile_image: string | null
  banner: string | null
  bio: string
  location: string
  website: string
  birth_date: string | null
  created_at: string
  stats: {
    posts: number
    following: number
    followers: number
  }
}

export type UserCard = Pick<
  User,
  'id' | 'username' | 'first_name' | 'last_name' | 'profile_image' | 'bio'
> & {
  isFollowing: boolean
}

export type PostMedia = {
  id: number
  type: 'image' | 'video' | 'gif'
  url: string
  thumbnail?: string
  order: number // ← ordem de exibição
}

// POLL (Enquete)
export type PostPoll = {
  id: number
  question?: string // opcional, pode estar no content do post
  options: PollOption[]
  duration_hours: number // duração em horas (ex: 24, 168)
  ends_at: string // quando termina
  total_votes: number
}

export type PollOption = {
  id: number
  text: string
  votes: number
  percentage: number // calculado
}

export type PollWithUserVote = PostPoll & {
  user_voted_option_id?: number | null // qual opção o usuário votou
}

// GEOLOCALIZAÇÃO
export type PostLocation = {
  id: number
  name: string // "São Paulo, Brasil"
  latitude?: number
  longitude?: number
}

/**
 * Extensões para contextos específicos
 */
export type PostWithInteractions = Post & {
  is_liked: boolean
  is_retweeted: boolean
  is_bookmarked: boolean
}

export type PostDetail = Post & {
  full_thread?: Post[] // Posts da thread (se existir)
  comments?: Post[] // Comentários do post
}

export type Post = {
  id: number
  content: string
  author: UserCard // Usa UserPreview (não duplica tipagem)
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
  media?: PostMedia[]
  poll?: PostPoll // ← enquete
  location?: PostLocation // ← geolocalização
  in_reply_to?: number | null // ID do post pai (Quando você responde/comenta um post)
  retweet_of?: number | null // ID do post original (se for retweet)
  retweet_comment?: {
    id: number
    author: UserCard
    content: string
    createdAt: string
    media?: PostMedia[]
  }
}

export type PostCardVariant = 'default' | 'detailed'

export type PostCardProps = {
  post: PostWithInteractions
  variant?: PostCardVariant
  onLike: (postId: number) => void
  onRetweet: (postId: number) => void
  onQuoteTweet: (postId: number, content: string, medias?: MediaFile[]) => void
  onComment: (postId: number, content: string, medias?: MediaFile[]) => void
}
