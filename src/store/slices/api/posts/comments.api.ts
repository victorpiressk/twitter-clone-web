import { baseApi } from '../base.api'
import { transformPost } from '../../../../utils/transformers/entities'
import { transformCreateCommentRequest } from '../../../../utils/transformers/requests'
import type { Post } from '../../../../types/domain/models'
import type { BackendPost } from '../../../../types/contracts/dtos'
import type { BackendPaginatedResponse } from '../../../../types/contracts/responses.backend'
import type { PaginatedResponse } from '../../../../types/domain/responses'
import type { CreateCommentRequest } from '../../../../types/domain/requests'
import type { PaginationParams } from '../../../../types/contracts/shared'

// ============================================
// TYPES
// ============================================

export type GetCommentsParams = PaginationParams & {
  post?: number
}

type UpdateCommentParams = {
  id: number
  data: { content: string }
}

// ============================================
// API
// ============================================

export const commentsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ============================================
    // COMENTÁRIOS
    // ============================================

    getComments: builder.query<
      PaginatedResponse<Post>,
      GetCommentsParams | void
    >({
      query: (params) => ({
        url: '/api/comments/',
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
      providesTags: ['Comment']
    }),

    createComment: builder.mutation<Post, CreateCommentRequest>({
      query: (body) => ({
        url: '/api/comments/',
        method: 'POST',
        body: transformCreateCommentRequest(body)
      }),
      transformResponse: (response: BackendPost): Post =>
        transformPost(response),
      invalidatesTags: ['Comment', 'Post']
    }),

    updateComment: builder.mutation<Post, UpdateCommentParams>({
      query: ({ id, data }) => ({
        url: `/api/comments/${id}/`,
        method: 'PATCH',
        body: data
      }),
      transformResponse: (response: BackendPost): Post =>
        transformPost(response),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'Comment', id }]
    }),

    deleteComment: builder.mutation<void, number>({
      query: (id) => ({
        url: `/api/comments/${id}/`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Comment', 'Post']
    })
  })
})

// ============================================
// EXPORTS
// ============================================

export const {
  useGetCommentsQuery,
  useCreateCommentMutation,
  useUpdateCommentMutation,
  useDeleteCommentMutation
} = commentsApi
