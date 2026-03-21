import {
  transformFollow,
  transformUser
} from '../../../utils/transformers/entities'
import {
  transformFollowRequest,
  transformUpdateUserRequest
} from '../../../utils/transformers/requests'
import { baseApi } from './base.api'
import type { BackendFollow, BackendUser } from '../../../types/contracts/dtos'
import type { BackendPaginatedResponse } from '../../../types/contracts/responses.backend'
import type { PaginationParams } from '../../../types/contracts/shared'
import type { Follow, User } from '../../../types/domain/models'
import type {
  FollowRequest,
  UpdateUserRequest
} from '../../../types/domain/requests'
import type { PaginatedResponse } from '../../../types/domain/responses'

// ============================================
// HELPERS
// ============================================

const transformPaginatedUsers = (
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
    return { count: 0, next: null, previous: null, results: [] }
  }

  return {
    count: response.count,
    next: response.next,
    previous: response.previous,
    results: response.results.map(transformUser)
  }
}

// ============================================
// API
// ============================================

export const usersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ============================================
    // GET USERS
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

    // ============================================
    // GET USER BY ID
    // ============================================

    getUserById: builder.query<User, number>({
      query: (id) => `/api/users/${id}/`,
      transformResponse: (response: BackendUser): User =>
        transformUser(response),
      providesTags: (_result, _error, id) => [{ type: 'User', id }]
    }),

    // ============================================
    // UPDATE USER
    // ============================================

    updateUser: builder.mutation<
      User,
      { id: number; data: UpdateUserRequest | FormData }
    >({
      query: ({ id, data }) => {
        const body =
          data instanceof FormData ? data : transformUpdateUserRequest(data)
        return {
          url: `/api/users/${id}/`,
          method: 'PATCH',
          body
        }
      },
      transformResponse: (response: BackendUser): User =>
        transformUser(response),
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'User', id },
        'User'
      ]
    }),

    // ============================================
    // GET USER FOLLOWERS
    // ============================================

    getUserFollowers: builder.query<
      PaginatedResponse<User>,
      { userId: number; params?: PaginationParams }
    >({
      query: ({ userId, params }) => ({
        url: `/api/users/${userId}/followers/`,
        params: params || {}
      }),
      transformResponse: transformPaginatedUsers,
      providesTags: ['User']
    }),

    // ============================================
    // GET USER FOLLOWING
    // ============================================

    getUserFollowing: builder.query<
      PaginatedResponse<User>,
      { userId: number; params?: PaginationParams }
    >({
      query: ({ userId, params }) => ({
        url: `/api/users/${userId}/following/`,
        params: params || {}
      }),
      transformResponse: transformPaginatedUsers,
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
        if (!response || !response.results) return []
        return response.results.map(transformFollow)
      },
      providesTags: ['Follow']
    }),

    // ============================================
    // GET FOLLOWS
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

    // ============================================
    // FOLLOW USER
    // ============================================

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

    // ============================================
    // UNFOLLOW USER
    // ============================================

    unfollowUser: builder.mutation<void, number>({
      query: (followId) => ({
        url: `/api/follows/${followId}/`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Follow', 'User']
    }),

    // ============================================
    // UPDATE ACCOUNT
    // ============================================

    updateAccount: builder.mutation<
      User,
      {
        id: number
        data: {
          email?: string
          phone?: string
          username?: string
          current_password: string
        }
      }
    >({
      query: ({ id, data }) => ({
        url: `/api/users/${id}/account/`,
        method: 'PATCH',
        body: data
      }),
      transformResponse: (response: BackendUser): User =>
        transformUser(response),
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'User', id },
        'User'
      ]
    }),

    // ============================================
    // CHANGE PASSWORD
    // ============================================

    changePassword: builder.mutation<
      void,
      {
        id: number
        data: {
          current_password: string
          new_password: string
          new_password_confirm: string
        }
      }
    >({
      query: ({ id, data }) => ({
        url: `/api/users/${id}/change-password/`,
        method: 'POST',
        body: data
      })
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
  useUpdateAccountMutation,
  useChangePasswordMutation,
  useGetUserFollowersQuery,
  useGetUserFollowingQuery,
  useGetMyFollowsQuery,
  useGetFollowsQuery,
  useFollowUserMutation,
  useUnfollowUserMutation
} = usersApi
