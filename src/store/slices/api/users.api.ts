// src/store/slices/api/users.api.ts

import { baseApi } from './base.api'
import {
  transformFollow,
  transformUser
} from '../../../utils/transformers/entities'
import {
  transformFollowRequest,
  transformUpdateUserRequest
} from '../../../utils/transformers/requests'
import type { Follow, User } from '../../../types/domain/models'
import type { BackendFollow, BackendUser } from '../../../types/contracts/dtos'
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

    updateUser: builder.mutation<
      User,
      { id: number; data: UpdateUserRequest | FormData } // ✅ Aceita ambos
    >({
      query: ({ id, data }) => {
        // ✅ Se for FormData, usa direto
        // ✅ Se for UpdateUserRequest, transforma
        const body =
          data instanceof FormData ? data : transformUpdateUserRequest(data)

        return {
          url: `/api/users/${id}/`,
          method: 'PATCH',
          body
          // ⚠️ NÃO adicionar headers: { 'Content-Type': 'multipart/form-data' }
          // O fetch detecta automaticamente quando é FormData
        }
      },
      transformResponse: (response: BackendUser): User =>
        transformUser(response),
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'User', id },
        'User' // Invalida lista também
      ]
    }),

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
      ): PaginatedResponse<User> => {
        if (Array.isArray(response)) {
          return {
            count: response.length,
            next: null,
            previous: null,
            results: response.map(transformUser)
          }
        }

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
          results: response.results.map(transformUser)
        }
      },
      providesTags: ['User']
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
      ): PaginatedResponse<User> => {
        if (Array.isArray(response)) {
          return {
            count: response.length,
            next: null,
            previous: null,
            results: response.map(transformUser)
          }
        }

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
          results: response.results.map(transformUser)
        }
      },
      providesTags: ['User']
    }),

    // ============================================
    // GET MY FOLLOWS
    // ============================================
    getMyFollows: builder.query<Follow[], void>({
      query: () => '/api/follows/',
      transformResponse: (
        response: BackendPaginatedResponse<BackendFollow>
      ): Follow[] => {
        // ✅ Backend retorna objeto paginado
        if (!response || !response.results) {
          return []
        }

        return response.results.map(transformFollow)
      },
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

    followUser: builder.mutation<Follow, FollowRequest>({
      query: (body) => ({
        url: '/api/follows/',
        method: 'POST',
        body: transformFollowRequest(body)
      }),
      transformResponse: (response: BackendFollow): Follow =>
        transformFollow(response),
      invalidatesTags: ['Follow', 'User']
    }),

    unfollowUser: builder.mutation<void, number>({
      query: (followId) => ({
        url: `/api/follows/${followId}/`,
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
  useGetMyFollowsQuery,
  useGetFollowsQuery,
  useFollowUserMutation,
  useUnfollowUserMutation
} = usersApi
