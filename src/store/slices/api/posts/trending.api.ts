import { baseApi } from '../base.api'
import { transformPost } from '../../../../utils/transformers/entities'
import type { Post } from '../../../../types/domain/models'
import type { BackendPost } from '../../../../types/contracts/dtos'
import type { BackendPaginatedResponse } from '../../../../types/contracts/responses.backend'
import type { PaginatedResponse } from '../../../../types/domain/responses'
import type { PeriodLimitParams } from '../../../../types/contracts/shared'

// ============================================
// API
// ============================================

export const trendingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ============================================
    // TRENDING
    // ============================================

    getTrendingPosts: builder.query<
      PaginatedResponse<Post>,
      PeriodLimitParams | void
    >({
      query: (params) => ({
        url: '/api/posts/trending/',
        params: params || { period: 'day', limit: 10 }
      }),
      transformResponse: (
        response: BackendPaginatedResponse<BackendPost>
      ): PaginatedResponse<Post> => ({
        count: response.count,
        next: response.next,
        previous: response.previous,
        results: response.results.map(transformPost)
      }),
      providesTags: ['Post']
    }),

    incrementViews: builder.mutation<void, number>({
      query: (postId) => ({
        url: `/api/posts/${postId}/increment-views/`,
        method: 'POST'
        // Body vazio
      })
      // ⚠️ SEM invalidatesTags (otimista - não força refetch)
      // Views incrementam no backend mas UI não re-renderiza automaticamente
      // Isso evita requisições desnecessárias a cada visualização
    })
  })
})

// ============================================
// EXPORTS
// ============================================

export const { useGetTrendingPostsQuery, useIncrementViewsMutation } =
  trendingApi
