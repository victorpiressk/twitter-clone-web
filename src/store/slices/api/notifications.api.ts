import { baseApi } from './base.api'
import { transformNotification } from '../../../utils/transformers/entities'
import type { Notification } from '../../../types/domain/models'
import type { BackendNotification } from '../../../types/contracts/dtos'
import type { BackendPaginatedResponse } from '../../../types/contracts/responses.backend'
import type { PaginatedResponse } from '../../../types/domain/responses'
import type { PaginationParams } from '../../../types/contracts/shared'

// ============================================
// TYPES
// ============================================

type UnreadCountResponse = {
  count: number
}

// ============================================
// API
// ============================================

export const notificationsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ============================================
    // NOTIFICAÇÕES
    // ============================================

    getNotifications: builder.query<
      PaginatedResponse<Notification>,
      PaginationParams | void
    >({
      query: (params) => ({
        url: '/api/notifications/',
        params: params || {}
      }),
      transformResponse: (
        response: BackendPaginatedResponse<BackendNotification>
      ): PaginatedResponse<Notification> => ({
        count: response.count,
        next: response.next,
        previous: response.previous,
        results: response.results.map(transformNotification)
      }),
      providesTags: ['Notification']
    }),

    getUnreadCount: builder.query<UnreadCountResponse, void>({
      query: () => '/api/notifications/unread_count/',
      providesTags: ['Notification']
    }),

    markNotificationRead: builder.mutation<Notification, number>({
      query: (id) => ({
        url: `/api/notifications/${id}/read/`,
        method: 'POST'
        // Body vazio
      }),
      transformResponse: (response: BackendNotification): Notification =>
        transformNotification(response),
      invalidatesTags: ['Notification']
    })
  })
})

// ============================================
// EXPORTS
// ============================================

export const {
  useGetNotificationsQuery,
  useGetUnreadCountQuery,
  useMarkNotificationReadMutation
} = notificationsApi
