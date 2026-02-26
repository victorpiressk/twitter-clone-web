import type {
  BackendCreateCommentRequest,
  BackendCreateLocationRequest,
  BackendCreatePollRequest,
  BackendCreatePostRequest,
  BackendFollowHashtagRequest,
  BackendFollowRequest,
  BackendLikeRequest,
  BackendLoginRequest,
  BackendMarkNotificationReadRequest,
  BackendRegisterRequest,
  BackendReplyRequest,
  BackendRetweetRequest,
  BackendSearchParams,
  BackendUpdateUserRequest,
  BackendVotePollRequest
} from '../../types/contracts/requests.backend'
import type {
  CreateCommentRequest,
  CreateLocationRequest,
  CreatePollRequest,
  CreatePostRequest,
  FollowHashtagRequest,
  FollowRequest,
  LikeRequest,
  LoginRequest,
  MarkNotificationReadRequest,
  RegisterRequest,
  ReplyRequest,
  RetweetRequest,
  SearchParams,
  UpdateUserRequest,
  VotePollRequest
} from '../../types/domain/requests'

// ============================================
// AUTH REQUEST
// ============================================

export const transformRegisterRequest = (
  registerRequest: RegisterRequest
): BackendRegisterRequest => ({
  username: registerRequest.username,
  email: registerRequest.email,
  phone: registerRequest.phone,
  password: registerRequest.password,
  password_confirm: registerRequest.passwordConfirm,
  first_name: registerRequest.firstName,
  last_name: registerRequest.lastName,
  birth_date: registerRequest.birthDate
})

export const transformLoginRequest = (
  loginRequest: LoginRequest
): BackendLoginRequest => ({
  username: loginRequest.username,
  email: loginRequest.email,
  phone: loginRequest.phone,
  password: loginRequest.password
})

// ============================================
// USER REQUEST
// ============================================

export const transformUpdateUserRequest = (
  request: UpdateUserRequest
): BackendUpdateUserRequest => ({
  first_name: request.firstName,
  last_name: request.lastName,
  bio: request.bio,
  profile_image: request.avatar,
  banner: request.banner,
  location: request.location,
  website: request.website,
  birth_date: request.birthDate
})

// ============================================
// POSTS REQUEST
// ============================================

export const transformCreatePostRequest = (
  postRequest: CreatePostRequest
): BackendCreatePostRequest => ({
  content: postRequest.content,
  media_files: postRequest.mediaFiles,
  poll: postRequest.poll
    ? {
        question: postRequest.poll.question,
        duration_hours: postRequest.poll.durationHours,
        options: postRequest.poll.options
      }
    : undefined,
  location: postRequest.location
    ? {
        name: postRequest.location.name,
        latitude: postRequest.location.latitude,
        longitude: postRequest.location.longitude
      }
    : undefined,
  scheduled_for: postRequest.scheduledFor,
  in_reply_to: postRequest.inReplyTo,
  retweet_of: postRequest.retweetOf
})

// ============================================
// COMMENT REQUEST
// ============================================

export const transformCreateCommentRequest = (
  createCommentRequest: CreateCommentRequest
): BackendCreateCommentRequest => ({
  post: createCommentRequest.post,
  content: createCommentRequest.content
})

// ============================================
// LIKE REQUEST
// ============================================

export const transformLikeRequest = (
  likeRequest: LikeRequest
): BackendLikeRequest => ({
  post: likeRequest.post
})

// ============================================
// FOLLOW REQUEST
// ============================================

export const transformFollowRequest = (
  followRequest: FollowRequest
): BackendFollowRequest => ({
  user: followRequest.user
})

// ============================================
// POLL REQUEST
// ============================================

export const transformCreatePollRequest = (
  createPollRequest: CreatePollRequest
): BackendCreatePollRequest => ({
  question: createPollRequest.question,
  duration_hours: createPollRequest.durationHours,
  options: createPollRequest.options
})

export const transformVotePollRequest = (
  votePollRequest: VotePollRequest
): BackendVotePollRequest => ({
  option_id: votePollRequest.optionId
})

// ============================================
// LOCATION REQUEST
// ============================================

export const transformCreateLocationRequest = (
  createLocationRequest: CreateLocationRequest
): BackendCreateLocationRequest => ({
  name: createLocationRequest.name,
  latitude: createLocationRequest.latitude,
  longitude: createLocationRequest.longitude
})

// ============================================
// HASHTAG REQUEST
// ============================================

export const transformFollowHashtagRequest = (
  followHashtagRequest: FollowHashtagRequest
): BackendFollowHashtagRequest => ({
  tag: followHashtagRequest.tag
})

// ============================================
// NOTIFICATIONS REQUEST
// ============================================

export const transformMarkNotificationReadRequest = (
  id: MarkNotificationReadRequest
): BackendMarkNotificationReadRequest => {
  return id
}

// ============================================
// SEARCH REQUEST
// ============================================

export const transformSearchParams = (
  searchParams: SearchParams
): BackendSearchParams => ({
  q: searchParams.q,
  limit: searchParams.limit
})

// ============================================
// RETWEETS REQUEST
// ============================================

export const transformRetweetRequest = (
  id: RetweetRequest
): BackendRetweetRequest => {
  return id
}

// ============================================
// REPLIES REQUEST
// ============================================

export const transformReplyRequest = (
  replyRequest: ReplyRequest
): BackendReplyRequest => ({
  content: replyRequest.content
  // parent_post_id vem da URL, não do body
})
