import {
  transformLocation,
  transformPost
} from '../../../../utils/transformers/entities'
import { baseApi } from '../base.api'
import type {
  BackendLocation,
  BackendPost
} from '../../../../types/contracts/dtos'
import type { BackendPaginatedResponse } from '../../../../types/contracts/responses.backend'
import type { PaginationParams } from '../../../../types/contracts/shared'
import type { Location, Post } from '../../../../types/domain/models'
import type { PaginatedResponse } from '../../../../types/domain/responses'

// ============================================
// TYPES
// ============================================

type GetNearbyLocationsParams = {
  latitude: string
  longitude: string
  radius?: number // km (default: 10)
  limit?: number // (default: 20)
}

// ============================================
// API
// ============================================

export const locationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ============================================
    // GET LOCATIONS
    // ============================================

    getLocations: builder.query<
      PaginatedResponse<Location>,
      PaginationParams | void
    >({
      query: (params) => ({
        url: '/api/locations/',
        params: params || {}
      }),
      transformResponse: (
        response: BackendPaginatedResponse<BackendLocation>
      ): PaginatedResponse<Location> => ({
        count: response.count,
        next: response.next,
        previous: response.previous,
        results: response.results.map(transformLocation)
      }),
      providesTags: ['Location']
    }),

    // ============================================
    // GET LOCATION BY ID
    // ============================================

    getLocationById: builder.query<Location, number>({
      query: (id) => `/api/locations/${id}/`,
      transformResponse: (response: BackendLocation): Location =>
        transformLocation(response),
      providesTags: (_result, _error, id) => [{ type: 'Location', id }]
    }),

    // ============================================
    // GET LOCATION POSTS
    // ============================================

    getLocationPosts: builder.query<
      PaginatedResponse<Post>,
      { locationId: number; params?: PaginationParams }
    >({
      query: ({ locationId, params }) => ({
        url: `/api/locations/${locationId}/posts/`,
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
      providesTags: (_result, _error, { locationId }) => [
        { type: 'Location', id: locationId },
        'Post'
      ]
    }),

    // ============================================
    // GET NEARBY LOCATIONS
    // ============================================

    getNearbyLocations: builder.query<Location[], GetNearbyLocationsParams>({
      query: ({ latitude, longitude, radius = 10, limit = 20 }) => ({
        url: '/api/locations/nearby/',
        params: { latitude, longitude, radius, limit }
      }),
      transformResponse: (
        response: BackendPaginatedResponse<BackendLocation>
      ): Location[] => response.results.map(transformLocation),
      providesTags: ['Location']
    })
  })
})

// ============================================
// EXPORTS
// ============================================

export const {
  useGetLocationsQuery,
  useGetLocationByIdQuery,
  useGetLocationPostsQuery,
  useGetNearbyLocationsQuery
} = locationApi
