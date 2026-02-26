import { baseApi } from '../base.api'
import type {
  BackendPost,
  BackendPostWithInteractions
} from '../../../../types/contracts/dtos'
import type { BackendPaginatedResponse } from '../../../../types/contracts/responses.backend'
import type {
  Post,
  PostWithInteractions
} from '../../../../types/domain/models'
import type {
  CreatePostRequest,
  UpdatePostRequest
} from '../../../../types/domain/requests'
import type { PaginatedResponse } from '../../../../types/domain/responses'
import {
  transformPost,
  transformPostWithInteractions
} from '../../../../utils/transformers/entities'
import { transformCreatePostRequest } from '../../../../utils/transformers/requests'
import type { PaginationParams } from '../../../../types/contracts/shared'

// ============================================
// API
// ============================================

export const postsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ============================================
    // POSTAGENS
    // ============================================

    getPosts: builder.query<
      PaginatedResponse<PostWithInteractions>,
      PaginationParams | void
    >({
      query: (params) => ({
        url: '/api/posts/',
        params: params || {}
      }),
      transformResponse: (
        response: BackendPaginatedResponse<BackendPostWithInteractions>
      ): PaginatedResponse<PostWithInteractions> => ({
        count: response.count,
        next: response.next,
        previous: response.previous,
        results: response.results.map(transformPostWithInteractions)
      }),
      providesTags: ['Post']
    }),

    getFeed: builder.query<PaginatedResponse<PostWithInteractions>, void>({
      query: () => '/api/posts/feed/',
      transformResponse: (
        response: BackendPaginatedResponse<BackendPostWithInteractions>
      ): PaginatedResponse<PostWithInteractions> => {
        // ✅ Safe check
        if (!response || !response.results) {
          return {
            count: 0,
            next: null,
            previous: null,
            results: []
          }
        }

        return {
          count: response.count,
          next: response.next,
          previous: response.previous,
          results: response.results.map(transformPostWithInteractions)
        }
      },
      providesTags: ['Post']
    }),

    getPostById: builder.query<Post, number>({
      query: (id) => `/api/posts/${id}/`,
      transformResponse: (response: BackendPost): Post =>
        transformPost(response),
      providesTags: (_result, _error, id) => [{ type: 'Post', id }]
    }),

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

        if (transformed.in_reply_to) {
          formData.append('in_reply_to', transformed.in_reply_to.toString())
        }

        if (transformed.retweet_of) {
          formData.append('retweet_of', transformed.retweet_of.toString())
        }

        return {
          url: '/api/posts/',
          method: 'POST',
          body: formData
        }
      },
      transformResponse: (response: BackendPost): Post =>
        transformPost(response),
      invalidatesTags: ['Post']
    }),

    updatePost: builder.mutation<Post, { id: number; data: UpdatePostRequest }>(
      {
        query: ({ id, data }) => ({
          url: `/api/posts/${id}/`,
          method: 'PATCH',
          body: data
        }),
        transformResponse: (response: BackendPost): Post =>
          transformPost(response),
        invalidatesTags: (_result, _error, { id }) => [{ type: 'Post', id }]
      }
    ),

    deletePost: builder.mutation<void, number>({
      query: (id) => ({
        url: `/api/posts/${id}/`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Post']
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
