import {
  transformHashtag,
  transformTrendingHashtag,
  transformPostWithInteractions
} from '../../../utils/transformers/entities'
import { baseApi } from './base.api'
import type {
  BackendHashtag,
  BackendPostWithInteractions,
  BackendTrendingHashtag
} from '../../../types/contracts/dtos'
import type { BackendPaginatedResponse } from '../../../types/contracts/responses.backend'
import type {
  PaginationParams,
  PeriodLimitParams
} from '../../../types/contracts/shared'
import type {
  Hashtag,
  TrendingHashtag,
  PostWithInteractions
} from '../../../types/domain/models'
import type { PaginatedResponse } from '../../../types/domain/responses'

// ============================================
// API
// ============================================

export const hashtagsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ============================================
    // GET HASHTAGS
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

    // ============================================
    // GET HASHTAG BY ID
    // ============================================

    getHashtagById: builder.query<Hashtag, number>({
      query: (id) => `/api/hashtags/${id}/`,
      transformResponse: (response: BackendHashtag): Hashtag =>
        transformHashtag(response),
      providesTags: (_result, _error, id) => [{ type: 'Hashtag', id }]
    }),

    // ============================================
    // SEARCH HASHTAGS
    // ============================================

    searchHashtags: builder.query<Hashtag[], string>({
      query: (q) => ({
        url: '/api/hashtags/search/',
        params: { q }
      }),
      transformResponse: (response: BackendHashtag[]): Hashtag[] =>
        response.map(transformHashtag),
      providesTags: ['Hashtag']
    }),

    // ============================================
    // GET HASHTAG POSTS
    // ============================================

    getHashtagPosts: builder.query<
      PostWithInteractions[],
      { id: number; params?: PaginationParams }
    >({
      query: ({ id, params }) => ({
        url: `/api/hashtags/${id}/posts/`,
        params: params || {}
      }),
      transformResponse: (
        response: BackendPostWithInteractions[]
      ): PostWithInteractions[] => response.map(transformPostWithInteractions),
      providesTags: (_result, _error, { id }) => [
        { type: 'Hashtag', id },
        'Post'
      ]
    }),

    // ============================================
    // GET TRENDING HASHTAGS
    // ============================================

    getTrendingHashtags: builder.query<
      TrendingHashtag[],
      PeriodLimitParams | void
    >({
      query: (params) => ({
        url: '/api/hashtags/trending/',
        params: params || { period: 'day', limit: 10 }
      }),
      transformResponse: (
        response: BackendPaginatedResponse<BackendTrendingHashtag>
      ): TrendingHashtag[] => response.results.map(transformTrendingHashtag),
      providesTags: ['Hashtag']
    }),

    // ============================================
    // FOLLOW HASHTAG
    // ============================================

    followHashtag: builder.mutation<void, number>({
      query: (id) => ({
        url: `/api/hashtags/${id}/follow/`,
        method: 'POST'
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: 'Hashtag', id },
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
  useGetHashtagByIdQuery,
  useSearchHashtagsQuery,
  useGetHashtagPostsQuery,
  useGetTrendingHashtagsQuery,
  useFollowHashtagMutation
} = hashtagsApi
