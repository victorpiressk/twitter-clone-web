import { baseApi } from '../base.api'

// ============================================
// API
// ============================================

export const interactionsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ============================================
    // RETWEETS
    // ============================================

    retweetPost: builder.mutation<void, number>({
      query: (postId) => ({
        url: `/api/posts/${postId}/retweet/`,
        method: 'POST'
        // Body vazio (postId vem da URL)
      }),
      invalidatesTags: ['Post']
    }),

    unretweetPost: builder.mutation<void, number>({
      query: (postId) => ({
        url: `/api/posts/${postId}/unretweet/`,
        method: 'DELETE'
        // Body vazio (postId vem da URL)
      }),
      invalidatesTags: ['Post']
    })
  })
})

// ============================================
// EXPORTS
// ============================================

export const { useRetweetPostMutation, useUnretweetPostMutation } =
  interactionsApi
