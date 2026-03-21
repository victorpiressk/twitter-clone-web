import {
  transformPost,
  transformPostWithInteractions
} from '../../../../utils/transformers/entities'
import { baseApi } from '../base.api'
import type {
  BackendPost,
  BackendPostWithInteractions
} from '../../../../types/contracts/dtos'
import type { BackendPaginatedResponse } from '../../../../types/contracts/responses.backend'
import type { PaginationParams } from '../../../../types/contracts/shared'
import type {
  Post,
  PostWithInteractions
} from '../../../../types/domain/models'
import type { ReplyRequest } from '../../../../types/domain/requests'
import type { PaginatedResponse } from '../../../../types/domain/responses'

// ============================================
// API
// ============================================

export const repliesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ============================================
    // GET POST REPLIES
    // ============================================

    getPostReplies: builder.query<
      PaginatedResponse<PostWithInteractions>,
      { postId: number; params?: PaginationParams }
    >({
      query: ({ postId, params }) => ({
        url: `/api/posts/${postId}/replies/`,
        params: params || {}
      }),
      transformResponse: (
        response: BackendPaginatedResponse<BackendPostWithInteractions>
      ): PaginatedResponse<PostWithInteractions> => {
        // API retorna array direto
        if (Array.isArray(response)) {
          return {
            count: response.length,
            next: null,
            previous: null,
            results: response.map(transformPostWithInteractions)
          }
        }

        // API retorna objeto paginado
        if (response && Array.isArray(response.results)) {
          return {
            count: response.count || 0,
            next: response.next || null,
            previous: response.previous || null,
            results: response.results.map(transformPostWithInteractions)
          }
        }

        // Fallback
        return { count: 0, next: null, previous: null, results: [] }
      },
      providesTags: (_result, _error, { postId }) => [
        { type: 'Post', id: postId },
        'Comment'
      ]
    }),

    // ============================================
    // REPLY TO POST
    // ============================================

    replyToPost: builder.mutation<Post, { postId: number; data: ReplyRequest }>(
      {
        query: ({ postId, data }) => ({
          url: `/api/posts/${postId}/reply/`,
          method: 'POST',
          body: data
        }),
        transformResponse: (response: BackendPost): Post =>
          transformPost(response),
        invalidatesTags: ['Post', 'Comment']
      }
    )
  })
})

// ============================================
// EXPORTS
// ============================================

export const { useGetPostRepliesQuery, useReplyToPostMutation } = repliesApi
