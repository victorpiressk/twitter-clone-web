import {
  transformPostWithInteractions,
  transformLike
} from '../../../../utils/transformers/entities'
import { transformLikeRequest } from '../../../../utils/transformers/requests'
import { baseApi } from '../base.api'
import type {
  BackendPostWithInteractions,
  BackendLike
} from '../../../../types/contracts/dtos'
import type { BackendPaginatedResponse } from '../../../../types/contracts/responses.backend'
import type { PaginationParams } from '../../../../types/contracts/shared'
import type {
  PostWithInteractions,
  Like
} from '../../../../types/domain/models'
import type { LikeRequest } from '../../../../types/domain/requests'
import type { PaginatedResponse } from '../../../../types/domain/responses'

// ============================================
// TYPES
// ============================================

type GetLikesParams = PaginationParams & {
  post?: number
}

// ============================================
// API
// ============================================

export const likesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ============================================
    // GET LIKES
    // ============================================

    getLikes: builder.query<
      PaginatedResponse<PostWithInteractions>,
      GetLikesParams | void
    >({
      query: (params) => ({
        url: '/api/likes/',
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

    // ============================================
    // LIKE POST
    // ============================================

    likePost: builder.mutation<Like, LikeRequest>({
      query: (body) => ({
        url: '/api/likes/',
        method: 'POST',
        body: transformLikeRequest(body)
      }),
      transformResponse: (response: BackendLike): Like =>
        transformLike(response),
      invalidatesTags: ['Post']
    }),

    // ============================================
    // UNLIKE POST
    // ============================================

    unlikePost: builder.mutation<void, number>({
      query: (id) => ({
        url: `/api/likes/${id}/`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Post']
    })
  })
})

// ============================================
// EXPORTS
// ============================================

export const { useGetLikesQuery, useLikePostMutation, useUnlikePostMutation } =
  likesApi
