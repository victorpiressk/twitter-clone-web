import { baseApi } from './base.api'
import {
  transformUser,
  transformPost,
  transformHashtag
} from '../../../utils/transformers/entities'
import type { SearchResult } from '../../../types/domain/responses'
import type { BackendSearchResult } from '../../../types/contracts/responses.backend'

// ============================================
// TYPES
// ============================================

type GlobalSearchParams = {
  q: string // Query de busca (obrigatório)
  limit?: number // Limite de resultados por categoria (default: 10)
}

// ============================================
// API
// ============================================

export const searchApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ============================================
    // SEARCH
    // ============================================

    globalSearch: builder.query<SearchResult, GlobalSearchParams>({
      query: ({ q, limit = 10 }) => ({
        url: '/api/search/all/',
        params: { q, limit }
      }),
      transformResponse: (response: BackendSearchResult): SearchResult => ({
        users: response.users.map(transformUser),
        posts: response.posts.map(transformPost),
        hashtags: response.hashtags.map(transformHashtag)
      }),
      providesTags: ['Search']
    })
  })
})

// ============================================
// EXPORTS
// ============================================

export const { useGlobalSearchQuery } = searchApi
