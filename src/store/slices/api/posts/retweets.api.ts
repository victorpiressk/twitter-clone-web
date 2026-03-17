// src/store/slices/api/posts/retweets.api.ts

import type { BackendPost } from '../../../../types/contracts/dtos'
import type { Post } from '../../../../types/domain/models'
import { transformPost } from '../../../../utils/transformers/entities'
import { baseApi } from '../base.api'

// ============================================
// TYPES
// ============================================

type QuoteRetweetRequest = {
  postId: number
  content: string
  mediaFiles?: File[]
}

// ============================================
// API
// ============================================

export const retweetsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ============================================
    // SIMPLE RETWEET (sem comentário)
    // ============================================

    retweetPost: builder.mutation<Post, number>({
      query: (postId) => ({
        url: `/api/posts/${postId}/retweet/`,
        method: 'POST'
      }),
      transformResponse: (response: BackendPost): Post =>
        transformPost(response),
      invalidatesTags: (_result, _error, postId) => [
        { type: 'Post', id: 'LIST' },
        { type: 'Post', id: postId }
      ]
    }),

    // ============================================
    // QUOTE RETWEET (com comentário)
    // ============================================

    quoteRetweet: builder.mutation<Post, QuoteRetweetRequest>({
      query: ({ postId, content, mediaFiles }) => {
        const formData = new FormData()
        formData.append('content', content)

        if (mediaFiles && mediaFiles.length > 0) {
          mediaFiles.forEach((file) => {
            formData.append('media_files', file)
          })
        }

        return {
          url: `/api/posts/${postId}/quote_retweet/`,
          method: 'POST',
          body: formData
        }
      },
      transformResponse: (response: BackendPost): Post =>
        transformPost(response),
      invalidatesTags: (_result, _error, { postId }) => [
        { type: 'Post', id: 'LIST' },
        { type: 'Post', id: postId }
      ]
    }),

    // ============================================
    // UNRETWEET (desfazer retweet)
    // ============================================

    unretweetPost: builder.mutation<void, number>({
      query: (postId) => ({
        url: `/api/posts/${postId}/unretweet/`,
        method: 'DELETE'
      }),
      invalidatesTags: (_result, _error, postId) => [
        { type: 'Post', id: 'LIST' },
        { type: 'Post', id: postId }
      ]
    })
  })
})

// ============================================
// EXPORTS
// ============================================

export const {
  useRetweetPostMutation,
  useQuoteRetweetMutation,
  useUnretweetPostMutation
} = retweetsApi
