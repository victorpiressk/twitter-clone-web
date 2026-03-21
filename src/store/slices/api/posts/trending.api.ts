import { transformPost } from '../../../../utils/transformers/entities'
import { baseApi } from '../base.api'
import type { BackendPost } from '../../../../types/contracts/dtos'
import type { BackendPaginatedResponse } from '../../../../types/contracts/responses.backend'
import type { PeriodLimitParams } from '../../../../types/contracts/shared'
import type { Post } from '../../../../types/domain/models'
import type { PaginatedResponse } from '../../../../types/domain/responses'

// ============================================
// API
// ============================================

export const trendingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ============================================
    // GET TRENDING POSTS
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

    // ============================================
    // INCREMENT VIEWS
    // ============================================

    incrementViews: builder.mutation<void, number>({
      query: (postId) => ({
        url: `/api/posts/${postId}/increment-views/`,
        method: 'POST'
      })
    })
  })
})

// ============================================
// EXPORTS
// ============================================

export const { useGetTrendingPostsQuery, useIncrementViewsMutation } =
  trendingApi
