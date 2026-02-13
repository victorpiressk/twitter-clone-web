// src/store/slices/api.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { RootState } from '..'
import type { User, Post, PostWithInteractions } from '../../models'
import type {
  BackendUser,
  BackendPost,
  BackendAuthResponse,
  BackendPaginatedResponse,
  AuthResponse,
  RegisterRequest,
  LoginRequest,
  CreatePostRequest,
  UpdatePostRequest,
  CreateCommentRequest,
  FollowRequest,
  LikeRequest,
  PaginatedResponse
} from '../../types/api'
import {
  transformUser,
  transformPost,
  transformPostWithInteractions,
  transformPostToBackend,
  transformCreatePostRequest,
  transformRegisterRequest
} from '../../utils/transformers'

const api = createApi({
  reducerPath: 'api',
  tagTypes: ['Post', 'User', 'Comment', 'Follow'],

  baseQuery: fetchBaseQuery({
    baseUrl: 'https://twitter-clone-api-yu0y.onrender.com',

    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.accessToken

      if (token) {
        headers.set('Authorization', `Token ${token}`)
      }

      return headers
    }
  }),

  endpoints: (builder) => ({
    // ============================================
    // AUTENTICAÇÃO
    // ============================================
    register: builder.mutation<AuthResponse, RegisterRequest>({
      query: (body) => ({
        url: 'api/auth/register/',
        method: 'POST',
        body: transformRegisterRequest(body)
      }),
      // ✅ NOVO: Transforma resposta
      transformResponse: (response: BackendAuthResponse): AuthResponse => ({
        user: transformUser(response.user),
        token: response.token
      }),
      invalidatesTags: ['User']
    }),

    login: builder.mutation<AuthResponse, LoginRequest>({
      query: (body) => ({
        url: '/api/auth/login/',
        method: 'POST',
        body
      }),
      // ✅ NOVO: Transforma resposta
      transformResponse: (response: BackendAuthResponse): AuthResponse => ({
        user: transformUser(response.user),
        token: response.token
      })
    }),

    logout: builder.mutation<void, void>({
      query: () => ({
        url: '/api/auth/logout/',
        method: 'POST'
      })
    }),

    // ============================================
    // USUÁRIOS
    // ============================================
    getUsers: builder.query<PaginatedResponse<User>, void>({
      query: () => '/api/users/',
      // ✅ NOVO: Transforma resposta paginada
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
      // ✅ NOVO: Transforma resposta
      transformResponse: (response: BackendUser): User =>
        transformUser(response),
      providesTags: (_result, _error, id) => [{ type: 'User', id }]
    }),

    getCurrentUser: builder.query<User, void>({
      query: () => '/api/users/me/',
      // ✅ NOVO: Transforma resposta
      transformResponse: (response: BackendUser): User =>
        transformUser(response),
      providesTags: ['User']
    }),

    updateUser: builder.mutation<User, { id: number; data: Partial<User> }>({
      query: ({ id, data }) => ({
        url: `/api/users/${id}/`,
        method: 'PATCH',
        body: data
      }),
      // ✅ NOVO: Transforma resposta
      transformResponse: (response: BackendUser): User =>
        transformUser(response),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'User', id }]
    }),

    getUserFollowers: builder.query<PaginatedResponse<User>, number>({
      query: (id) => `/api/users/${id}/followers/`,
      // ✅ NOVO: Transforma resposta
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

    getUserFollowing: builder.query<PaginatedResponse<User>, number>({
      query: (id) => `/api/users/${id}/following/`,
      // ✅ NOVO: Transforma resposta
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
    getFollows: builder.query<PaginatedResponse<User>, void>({
      query: () => '/api/follows/',
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

    followUser: builder.mutation<void, FollowRequest>({
      query: (body) => ({
        url: '/api/follows/',
        method: 'POST',
        body
      }),
      invalidatesTags: ['Follow', 'User']
    }),

    unfollowUser: builder.mutation<void, number>({
      query: (id) => ({
        url: `/api/follows/${id}/`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Follow', 'User']
    }),

    // ============================================
    // POSTAGENS
    // ============================================
    getPosts: builder.query<PaginatedResponse<Post>, void>({
      query: () => '/api/posts/',
      // ✅ NOVO: Transforma resposta
      transformResponse: (
        response: BackendPaginatedResponse<BackendPost>
      ): PaginatedResponse<Post> => ({
        count: response.count,
        next: response.next,
        previous: response.previous,
        results: response.results.map(transformPost)
      }),
      providesTags: ['Post']
    }),

    getPostById: builder.query<Post, number>({
      query: (id) => `/api/posts/${id}/`,
      // ✅ NOVO: Transforma resposta
      transformResponse: (response: BackendPost): Post =>
        transformPost(response),
      providesTags: (_result, _error, id) => [{ type: 'Post', id }]
    }),

    createPost: builder.mutation<Post, CreatePostRequest>({
      query: (body) => ({
        url: '/api/posts/',
        method: 'POST',
        // ✅ NOVO: Transforma request (frontend → backend)
        body: transformCreatePostRequest(body)
      }),
      // ✅ NOVO: Transforma resposta (backend → frontend)
      transformResponse: (response: BackendPost): Post =>
        transformPost(response),
      invalidatesTags: ['Post']
    }),

    updatePost: builder.mutation<Post, { id: number; data: UpdatePostRequest }>(
      {
        query: ({ id, data }) => ({
          url: `/api/posts/${id}/`,
          method: 'PATCH',
          body: transformPostToBackend(data)
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
    }),

    getFeed: builder.query<PaginatedResponse<PostWithInteractions>, void>({
      query: () => '/api/posts/feed/',
      // ✅ NOVO: Transforma posts com interações
      transformResponse: (
        response: BackendPaginatedResponse<
          BackendPost & {
            is_liked?: boolean
            is_retweeted?: boolean
            is_bookmarked?: boolean
          }
        >
      ): PaginatedResponse<PostWithInteractions> => ({
        count: response.count,
        next: response.next,
        previous: response.previous,
        results: response.results.map(transformPostWithInteractions)
      }),
      providesTags: ['Post']
    }),

    // ============================================
    // COMENTÁRIOS
    // ============================================
    getComments: builder.query<PaginatedResponse<Post>, void>({
      query: () => '/api/comments/',
      transformResponse: (
        response: BackendPaginatedResponse<BackendPost>
      ): PaginatedResponse<Post> => ({
        count: response.count,
        next: response.next,
        previous: response.previous,
        results: response.results.map(transformPost)
      }),
      providesTags: ['Comment']
    }),

    createComment: builder.mutation<Post, CreateCommentRequest>({
      query: (body) => ({
        url: '/api/comments/',
        method: 'POST',
        body
      }),
      transformResponse: (response: BackendPost): Post =>
        transformPost(response),
      invalidatesTags: ['Comment', 'Post']
    }),

    updateComment: builder.mutation<
      Post,
      { id: number; data: { content: string } }
    >({
      query: ({ id, data }) => ({
        url: `/api/comments/${id}/`,
        method: 'PATCH',
        body: data
      }),
      transformResponse: (response: BackendPost): Post =>
        transformPost(response),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'Comment', id }]
    }),

    deleteComment: builder.mutation<void, number>({
      query: (id) => ({
        url: `/api/comments/${id}/`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Comment', 'Post']
    }),

    // ============================================
    // CURTIDAS
    // ============================================
    getLikes: builder.query<PaginatedResponse<PostWithInteractions>, void>({
      query: () => '/api/likes/',
      transformResponse: (
        response: BackendPaginatedResponse<
          BackendPost & { is_liked?: boolean; is_retweeted?: boolean }
        >
      ): PaginatedResponse<PostWithInteractions> => ({
        count: response.count,
        next: response.next,
        previous: response.previous,
        results: response.results.map(transformPostWithInteractions)
      }),
      providesTags: ['Post']
    }),

    likePost: builder.mutation<void, LikeRequest>({
      query: (body) => ({
        url: '/api/likes/',
        method: 'POST',
        body
      }),
      invalidatesTags: ['Post']
    }),

    unlikePost: builder.mutation<void, number>({
      query: (id) => ({
        url: `/api/likes/${id}/`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Post']
    })
  })
})

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useGetUsersQuery,
  useGetUserByIdQuery,
  useGetCurrentUserQuery,
  useUpdateUserMutation,
  useGetUserFollowersQuery,
  useGetUserFollowingQuery,
  useGetFollowsQuery,
  useFollowUserMutation,
  useUnfollowUserMutation,
  useGetPostsQuery,
  useGetPostByIdQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
  useGetFeedQuery,
  useGetCommentsQuery,
  useCreateCommentMutation,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
  useGetLikesQuery,
  useLikePostMutation,
  useUnlikePostMutation
} = api

export default api
