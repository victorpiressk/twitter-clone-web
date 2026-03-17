import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { RootState } from '../..'

export const baseApi = createApi({
  reducerPath: 'api',

  tagTypes: [
    'User',
    'Post',
    'Comment',
    'Follow',
    'Poll',
    'Location',
    'Hashtag',
    'Notification',
    'Search'
  ],

  baseQuery: fetchBaseQuery({
    baseUrl: 'https://twitter-clone-api-yu0y.onrender.com',

    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState
      const token = state.auth?.accessToken

      if (token) {
        headers.set('Authorization', `Token ${token}`)
      }

      return headers
    }
  }),

  endpoints: () => ({})
})
