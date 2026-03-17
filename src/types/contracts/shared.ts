// Queries params
export type PaginationParams = {
  page?: number
  page_size?: number
}

// Para os casos de Trending e Hashtags
export type PeriodLimitParams = {
  period?: 'day' | 'week' | 'month'
  limit?: number
}
