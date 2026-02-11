export type TrendCategory =
  | 'technology'
  | 'sports'
  | 'news'
  | 'entertainment'
  | 'politics'
  | 'other'

export type Trend = {
  id: number
  name: string // Ex: "#React"
  category: TrendCategory
  tweetCount: number
  description?: string | null
  rank: number // 1, 2, 3... posição no ranking
  createdAt: string
  updatedAt: string

  // Opcionais (nice to have)
  location?: string // "Brasil", "Worldwide"
  velocity?: number // tweets/hora
}

// Para exibir trends por categoria
export type TrendsByCategory = {
  [key in TrendCategory]: Trend[]
}
