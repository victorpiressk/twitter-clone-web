import { baseApi } from '../base.api'
import { transformPost } from '../../../../utils/transformers/entities'
import type { Post } from '../../../../types/domain/models'
import type { BackendPost } from '../../../../types/contracts/dtos'
import type { BackendPaginatedResponse } from '../../../../types/contracts/responses.backend'
import type { PaginatedResponse } from '../../../../types/domain/responses'
import type { ReplyRequest } from '../../../../types/domain/requests'
import type { PaginationParams } from '../../../../types/contracts/shared'

// ============================================
// API
// ============================================

export const repliesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ============================================
    // REPLIES
    // ============================================

    getPostReplies: builder.query<
      PaginatedResponse<Post>,
      { postId: number; params?: PaginationParams }
    >({
      query: ({ postId, params }) => ({
        url: `/api/posts/${postId}/replies/`,
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
      providesTags: (_result, _error, { postId }) => [
        { type: 'Post', id: postId },
        'Comment'
      ]
    }),

    replyToPost: builder.mutation<Post, { postId: number; data: ReplyRequest }>(
      {
        query: ({ postId, data }) => ({
          url: `/api/posts/${postId}/reply/`,
          method: 'POST',
          body: data // { content: string }
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
