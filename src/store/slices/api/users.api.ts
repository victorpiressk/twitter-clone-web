// src/store/slices/api/users.api.ts

import { baseApi } from './base.api'
import { transformUser } from '../../../utils/transformers/entities'
import {
  transformFollowRequest,
  transformUpdateUserRequest
} from '../../../utils/transformers/requests'
import type { User } from '../../../types/domain/models'
import type { BackendUser } from '../../../types/contracts/dtos'
import type { BackendPaginatedResponse } from '../../../types/contracts/responses.backend'
import type { PaginatedResponse } from '../../../types/domain/responses'
import type {
  FollowRequest,
  UpdateUserRequest
} from '../../../types/domain/requests'
import type { PaginationParams } from '../../../types/contracts/shared'

// ============================================
// API
// ============================================

export const usersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ============================================
    // USUÁRIOS
    // ============================================

    getUsers: builder.query<PaginatedResponse<User>, PaginationParams | void>({
      query: (params) => ({
        url: '/api/users/',
        params: params || {}
      }),
      transformResponse: (
        response: BackendPaginatedResponse<BackendUser>
      ): PaginatedResponse<User> => ({
        count: response.count,
        next: response.next,
        previous: response.previous,
        results: response.results.map(transformUser)
      }),
      providesTags: ['User']
    }),

    getUserById: builder.query<User, number>({
      query: (id) => `/api/users/${id}/`,
      transformResponse: (response: BackendUser): User =>
        transformUser(response),
      providesTags: (_result, _error, id) => [{ type: 'User', id }]
    }),

    updateUser: builder.mutation<User, { id: number; data: UpdateUserRequest }>(
      {
        query: ({ id, data }) => ({
          url: `/api/users/${id}/`,
          method: 'PATCH',
          body: transformUpdateUserRequest(data)
        }),
        transformResponse: (response: BackendUser): User =>
          transformUser(response),
        invalidatesTags: (_result, _error, { id }) => [{ type: 'User', id }]
      }
    ),

    getUserFollowers: builder.query<
      PaginatedResponse<User>,
      { userId: number; params?: PaginationParams }
    >({
      query: ({ userId, params }) => ({
        url: `/api/users/${userId}/followers/`,
        params: params || {}
      }),
      transformResponse: (
        response: BackendPaginatedResponse<BackendUser>
      ): PaginatedResponse<User> => ({
        count: response.count,
        next: response.next,
        previous: response.previous,
        results: response.results.map(transformUser)
      }),
      providesTags: ['Follow']
    }),

    getUserFollowing: builder.query<
      PaginatedResponse<User>,
      { userId: number; params?: PaginationParams }
    >({
      query: ({ userId, params }) => ({
        url: `/api/users/${userId}/following/`,
        params: params || {}
      }),
      transformResponse: (
        response: BackendPaginatedResponse<BackendUser>
      ): PaginatedResponse<User> => ({
        count: response.count,
        next: response.next,
        previous: response.previous,
        results: response.results.map(transformUser)
      }),
      providesTags: ['Follow']
    }),

    // ============================================
    // SEGUIDORES
    // ============================================

    getFollows: builder.query<PaginatedResponse<User>, PaginationParams | void>(
      {
        query: (params) => ({
          url: '/api/follows/',
          params: params || {}
        }),
        transformResponse: (
          response: BackendPaginatedResponse<BackendUser>
        ): PaginatedResponse<User> => ({
          count: response.count,
          next: response.next,
          previous: response.previous,
          results: response.results.map(transformUser)
        }),
        providesTags: ['Follow']
      }
    ),

    followUser: builder.mutation<void, FollowRequest>({
      query: (body) => ({
        url: '/api/follows/',
        method: 'POST',
        body: transformFollowRequest(body)
      }),
      invalidatesTags: ['Follow', 'User']
    }),

    unfollowUser: builder.mutation<void, number>({
      query: (id) => ({
        url: `/api/follows/${id}/`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Follow', 'User']
    })
  })
})

// ============================================
// EXPORTS
// ============================================

export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useUpdateUserMutation,
  useGetUserFollowersQuery,
  useGetUserFollowingQuery,
  useGetFollowsQuery,
  useFollowUserMutation,
  useUnfollowUserMutation
} = usersApi
