// src/store/slices/api/hashtags.api.ts

import { baseApi } from './base.api'
import {
  transformHashtag,
  transformTrendingHashtag,
  transformPostWithInteractions
} from '../../../utils/transformers/entities'
import type {
  Hashtag,
  TrendingHashtag,
  PostWithInteractions
} from '../../../types/domain/models'
import type {
  BackendHashtag,
  BackendPostWithInteractions,
  BackendTrendingHashtag
} from '../../../types/contracts/dtos'
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

    // Endpoint 35: Listar todas hashtags
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

    // ✅ Endpoint 36: Detalhes por ID (numérico)
    getHashtagById: builder.query<Hashtag, number>({
      query: (id) => `/api/hashtags/${id}/`,
      transformResponse: (response: BackendHashtag): Hashtag =>
        transformHashtag(response),
      providesTags: (_result, _error, id) => [{ type: 'Hashtag', id }]
    }),

    // ✅ Endpoint 38: Buscar por NOME (retorna array)
    searchHashtags: builder.query<Hashtag[], string>({
      query: (q) => ({
        url: '/api/hashtags/search/',
        params: { q }
      }),
      transformResponse: (response: BackendHashtag[]): Hashtag[] =>
        response.map(transformHashtag),
      providesTags: ['Hashtag']
    }),

    // ✅ Endpoint 37: Posts por ID (numérico)
    getHashtagPosts: builder.query<
      PostWithInteractions[], // ✅ Retorna array direto
      { id: number; params?: PaginationParams }
    >({
      query: ({ id, params }) => ({
        url: `/api/hashtags/${id}/posts/`,
        params: params || {}
      }),
      // ✅ Backend retorna array direto, não objeto paginado
      transformResponse: (
        response: BackendPostWithInteractions[] // ✅ Array
      ): PostWithInteractions[] => {
        return response.map(transformPostWithInteractions)
      },
      providesTags: (_result, _error, { id }) => [
        { type: 'Hashtag', id },
        'Post'
      ]
    }),

    // Endpoint 39: Trending
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
      ): TrendingHashtag[] => {
        return response.results.map(transformTrendingHashtag)
      },
      providesTags: ['Hashtag']
    }),

    // Follow hashtag (usa ID)
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
