import {
  transformPost,
  transformPostWithInteractions
} from '../../../../utils/transformers/entities'
import { transformCreatePostRequest } from '../../../../utils/transformers/requests'
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
import type {
  CreatePostRequest,
  UpdatePostRequest
} from '../../../../types/domain/requests'
import type { PaginatedResponse } from '../../../../types/domain/responses'

// ============================================
// TYPES
// ============================================

export type GetPostsParams = PaginationParams & {
  author?: number
  has_media?: boolean
  has_reply?: boolean
  is_retweet?: boolean
  liked_by?: number
}

// ============================================
// API
// ============================================

export const postsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ============================================
    // GET POSTS
    // ============================================

    getPosts: builder.query<
      PaginatedResponse<PostWithInteractions>,
      GetPostsParams | void
    >({
      query: (params) => ({
        url: '/api/posts/',
        params: params || {}
      }),
      transformResponse: (
        response: BackendPaginatedResponse<BackendPostWithInteractions>
      ): PaginatedResponse<PostWithInteractions> => {
        if (!response || !response.results) {
          return { count: 0, next: null, previous: null, results: [] }
        }
        return {
          count: response.count,
          next: response.next,
          previous: response.previous,
          results: response.results.map(transformPostWithInteractions)
        }
      },
      providesTags: (result) =>
        result
          ? [
              ...result.results.map(({ id }) => ({
                type: 'Post' as const,
                id
              })),
              { type: 'Post', id: 'LIST' }
            ]
          : [{ type: 'Post', id: 'LIST' }]
    }),

    // ============================================
    // GET FEED
    // ============================================

    getFeed: builder.query<PaginatedResponse<PostWithInteractions>, void>({
      query: () => '/api/posts/feed/',
      transformResponse: (
        response: BackendPostWithInteractions[]
      ): PaginatedResponse<PostWithInteractions> => {
        const results = Array.isArray(response) ? response : []
        return {
          count: results.length,
          next: null,
          previous: null,
          results: results.map(transformPostWithInteractions)
        }
      },
      providesTags: (result) =>
        result
          ? [
              ...result.results.map(({ id }) => ({
                type: 'Post' as const,
                id
              })),
              { type: 'Post', id: 'FEED' }
            ]
          : [{ type: 'Post', id: 'FEED' }]
    }),

    // ============================================
    // GET POST BY ID
    // ============================================

    getPostById: builder.query<PostWithInteractions, number>({
      query: (id) => `/api/posts/${id}/`,
      transformResponse: (
        response: BackendPostWithInteractions
      ): PostWithInteractions => transformPostWithInteractions(response),
      providesTags: (_result, _error, id) => [{ type: 'Post', id }]
    }),

    // ============================================
    // CREATE POST
    // ============================================

    createPost: builder.mutation<Post, CreatePostRequest>({
      query: (body) => {
        const transformed = transformCreatePostRequest(body)
        const formData = new FormData()

        formData.append('content', transformed.content)

        if (transformed.media_files) {
          transformed.media_files.forEach((file) => {
            formData.append('media_files', file)
          })
        }

        if (transformed.poll) {
          formData.append('poll', JSON.stringify(transformed.poll))
        }

        if (transformed.location) {
          formData.append('location', JSON.stringify(transformed.location))
        }

        if (transformed.scheduled_for) {
          formData.append('scheduled_for', transformed.scheduled_for)
        }

        // Aceita o número 0, mas pula null/undefined
        if (transformed.in_reply_to != null) {
          formData.append('in_reply_to', String(transformed.in_reply_to))
        }

        if (transformed.retweet_of != null) {
          formData.append('retweet_of', String(transformed.retweet_of))
        }

        return { url: '/api/posts/', method: 'POST', body: formData }
      },
      transformResponse: (response: BackendPost): Post =>
        transformPost(response),
      invalidatesTags: (_result, _error, arg) => [
        { type: 'Post' as const, id: 'LIST' },
        ...(arg.inReplyTo
          ? [{ type: 'Comment' as const, id: arg.inReplyTo }]
          : [])
      ]
    }),

    // ============================================
    // UPDATE POST
    // ============================================

    updatePost: builder.mutation<Post, { id: number; data: UpdatePostRequest }>(
      {
        query: ({ id, data }) => ({
          url: `/api/posts/${id}/`,
          method: 'PATCH',
          body: data
        }),
        invalidatesTags: (_result, _error, { id }) => [{ type: 'Post', id }]
      }
    ),

    // ============================================
    // DELETE POST
    // ============================================

    deletePost: builder.mutation<void, number>({
      query: (id) => ({
        url: `/api/posts/${id}/`,
        method: 'DELETE'
      }),
      invalidatesTags: [
        { type: 'Post', id: 'LIST' },
        { type: 'Post', id: 'FEED' }
      ]
    })
  })
})

// ============================================
// EXPORTS
// ============================================

export const {
  useGetPostsQuery,
  useGetFeedQuery,
  useGetPostByIdQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation
} = postsApi
