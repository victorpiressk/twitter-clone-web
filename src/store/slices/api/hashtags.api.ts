import { baseApi } from './base.api'
import {
  transformHashtag,
  transformTrendingHashtag,
  transformPost
} from '../../../utils/transformers/entities'
import type {
  Hashtag,
  TrendingHashtag,
  Post
} from '../../../types/domain/models'
import type { BackendHashtag, BackendPost } from '../../../types/contracts/dtos'
import type { BackendPaginatedResponse } from '../../../types/contracts/responses.backend'
import type { PaginatedResponse } from '../../../types/domain/responses'
import type {
  PaginationParams,
  PeriodLimitParams
} from '../../../types/contracts/shared'

// ============================================
// API
// ============================================

export const hashtagsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ============================================
    // HASHTAGS
    // ============================================

    getHashtags: builder.query<
      PaginatedResponse<Hashtag>,
      PaginationParams | void
    >({
      query: (params) => ({
        url: '/api/hashtags/',
        params: params || {}
      }),
      transformResponse: (
        response: BackendPaginatedResponse<BackendHashtag>
      ): PaginatedResponse<Hashtag> => ({
        count: response.count,
        next: response.next,
        previous: response.previous,
        results: response.results.map(transformHashtag)
      }),
      providesTags: ['Hashtag']
    }),

    getHashtagByName: builder.query<Hashtag, string>({
      query: (tag) => `/api/hashtags/${tag}/`,
      transformResponse: (response: BackendHashtag): Hashtag =>
        transformHashtag(response),
      providesTags: (_result, _error, tag) => [{ type: 'Hashtag', id: tag }]
    }),

    getHashtagPosts: builder.query<
      PaginatedResponse<Post>,
      { tag: string; params?: PaginationParams }
    >({
      query: ({ tag, params }) => ({
        url: `/api/hashtags/${tag}/posts/`,
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
      providesTags: (_result, _error, { tag }) => [
        { type: 'Hashtag', id: tag },
        'Post'
      ]
    }),

    getTrendingHashtags: builder.query<
      TrendingHashtag[],
      PeriodLimitParams | void
    >({
      query: (params) => ({
        url: '/api/hashtags/trending/',
        params: params || { period: 'day', limit: 10 }
      }),
      transformResponse: (
        response: BackendPaginatedResponse<BackendHashtag>
      ): TrendingHashtag[] => {
        return response.results.map(transformTrendingHashtag)
      },
      providesTags: ['Hashtag']
    }),

    followHashtag: builder.mutation<void, string>({
      query: (tag) => ({
        url: `/api/hashtags/${tag}/follow/`,
        method: 'POST'
        // Body vazio
      }),
      invalidatesTags: (_result, _error, tag) => [
        { type: 'Hashtag', id: tag },
        'Hashtag'
      ]
    })
  })
})

// ============================================
// EXPORTS
// ============================================

export const {
  useGetHashtagsQuery,
  useGetHashtagByNameQuery,
  useGetHashtagPostsQuery,
  useGetTrendingHashtagsQuery,
  useFollowHashtagMutation
} = hashtagsApi
