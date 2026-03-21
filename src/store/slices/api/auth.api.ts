import { transformUser } from '../../../utils/transformers/entities'
import {
  transformRegisterRequest,
  transformLoginRequest
} from '../../../utils/transformers/requests'
import { baseApi } from './base.api'
import type { BackendUser } from '../../../types/contracts/dtos'
import type { BackendAuthResponse } from '../../../types/contracts/responses.backend'
import type { User } from '../../../types/domain/models'
import type {
  LoginRequest,
  RegisterRequest
} from '../../../types/domain/requests'
import type { AuthResponse } from '../../../types/domain/responses'

// ============================================
// API
// ============================================

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ============================================
    // REGISTER
    // ============================================

    register: builder.mutation<AuthResponse, RegisterRequest>({
      query: (body) => ({
        url: '/api/auth/register/',
        method: 'POST',
        body: transformRegisterRequest(body)
      }),
      transformResponse: (response: BackendAuthResponse): AuthResponse => ({
        user: transformUser(response.user),
        token: response.token
      }),
      invalidatesTags: ['User']
    }),

    // ============================================
    // LOGIN
    // ============================================

    login: builder.mutation<AuthResponse, LoginRequest>({
      query: (body) => ({
        url: '/api/auth/login/',
        method: 'POST',
        body: transformLoginRequest(body)
      }),
      transformResponse: (response: BackendAuthResponse): AuthResponse => ({
        user: transformUser(response.user),
        token: response.token
      }),
      invalidatesTags: ['User']
    }),

    // ============================================
    // LOGOUT
    // ============================================

    logout: builder.mutation<void, void>({
      query: () => ({
        url: '/api/auth/logout/',
        method: 'POST'
      }),
      invalidatesTags: ['User']
    }),

    // ============================================
    // GET CURRENT USER
    // ============================================

    getCurrentUser: builder.query<User, void>({
      query: () => '/api/users/me/',
      transformResponse: (response: BackendUser): User =>
        transformUser(response),
      providesTags: ['User']
    })
  })
})

// ============================================
// EXPORTS
// ============================================

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useGetCurrentUserQuery
} = authApi
