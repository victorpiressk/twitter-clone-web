import { transformPost } from '../../../../utils/transformers/entities'
import { baseApi } from '../base.api'
import type { BackendPost } from '../../../../types/contracts/dtos'
import type { BackendPaginatedResponse } from '../../../../types/contracts/responses.backend'
import type { PaginationParams } from '../../../../types/contracts/shared'
import type { Post } from '../../../../types/domain/models'
import type { PaginatedResponse } from '../../../../types/domain/responses'

// ============================================
// API
// ============================================

export const scheduledApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ============================================
    // SCHEDULED POSTS
    // ============================================

    getScheduledPosts: builder.query<
      PaginatedResponse<Post>,
      PaginationParams | void
    >({
      query: (params) => ({
        url: '/api/posts/scheduled/',
        params: params || {}
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
    })
  })
})

// ============================================
// EXPORTS
// ============================================

export const { useGetScheduledPostsQuery } = scheduledApi
