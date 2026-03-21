import { transformPoll } from '../../../../utils/transformers/entities'
import { transformVotePollRequest } from '../../../../utils/transformers/requests'
import { baseApi } from '../base.api'
import type { BackendPoll } from '../../../../types/contracts/dtos'
import type { BackendPaginatedResponse } from '../../../../types/contracts/responses.backend'
import type { PaginationParams } from '../../../../types/contracts/shared'
import type { Poll } from '../../../../types/domain/models'
import type { VotePollRequest } from '../../../../types/domain/requests'
import type { PaginatedResponse } from '../../../../types/domain/responses'

// ============================================
// API
// ============================================

export const pollsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ============================================
    // GET POLLS
    // ============================================

    getPolls: builder.query<PaginatedResponse<Poll>, PaginationParams | void>({
      query: (params) => ({
        url: '/api/polls/',
        params: params || {}
      }),
      transformResponse: (
        response: BackendPaginatedResponse<BackendPoll>
      ): PaginatedResponse<Poll> => ({
        count: response.count,
        next: response.next,
        previous: response.previous,
        results: response.results.map(transformPoll)
      }),
      providesTags: ['Poll']
    }),

    // ============================================
    // GET POLL BY ID
    // ============================================

    getPollById: builder.query<Poll, number>({
      query: (id) => `/api/polls/${id}/`,
      transformResponse: (response: BackendPoll): Poll =>
        transformPoll(response),
      providesTags: (_result, _error, id) => [{ type: 'Poll', id }]
    }),

    // ============================================
    // VOTE POLL
    // ============================================

    votePoll: builder.mutation<Poll, { pollId: number; data: VotePollRequest }>(
      {
        query: ({ pollId, data }) => ({
          url: `/api/polls/${pollId}/vote/`,
          method: 'POST',
          body: transformVotePollRequest(data)
        }),
        transformResponse: (response: BackendPoll): Poll =>
          transformPoll(response),
        invalidatesTags: (_result, _error, { pollId }) => [
          { type: 'Poll', id: pollId },
          'Post'
        ]
      }
    ),

    // ============================================
    // UNVOTE POLL
    // ============================================

    unvotePoll: builder.mutation<Poll, number>({
      query: (pollId) => ({
        url: `/api/polls/${pollId}/unvote/`,
        method: 'DELETE'
      }),
      transformResponse: (response: BackendPoll): Poll =>
        transformPoll(response),
      invalidatesTags: (_result, _error, pollId) => [
        { type: 'Poll', id: pollId },
        'Post'
      ]
    })
  })
})

// ============================================
// EXPORTS
// ============================================

export const {
  useGetPollsQuery,
  useGetPollByIdQuery,
  useVotePollMutation,
  useUnvotePollMutation
} = pollsApi
