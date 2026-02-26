export type Hashtag = {
  id: number
  tag: string // "python" (sem #)
  postsCount: number // Quantos posts usam essa hashtag
  isTrending: boolean // Se está em alta no momento
  rank?: number // Posição no ranking (1, 2, 3...)
}

// Alias para uso no TrendsWidget (mais semântico)
export type TrendingHashtag = Hashtag & {
  rank: number // Obrigatório para trends
}
