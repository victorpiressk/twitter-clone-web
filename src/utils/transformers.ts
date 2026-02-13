import type {
  BackendUser,
  BackendPost,
  BackendPoll,
  BackendPollOption,
  BackendPostMedia,
  BackendLocation,
  BackendCreatePostRequest,
  BackendRegisterRequest,
  CreatePostRequest,
  RegisterRequest
} from '../types/api'
import type {
  User,
  Post,
  Poll,
  PollOption,
  PostMedia,
  Location,
  UserCardWithStats,
  PostWithInteractions
} from '../models'

// ============================================
// USER TRANSFORMERS
// ============================================

// Backend → Frontend
export const transformUser = (backendUser: BackendUser): User => ({
  id: backendUser.id,
  username: backendUser.username,
  email: backendUser.email,
  firstName: backendUser.first_name,
  lastName: backendUser.last_name,
  bio: backendUser.bio,
  avatar: backendUser.profile_image,
  banner: backendUser.banner || null,
  location: backendUser.location || '',
  website: backendUser.website || '',
  birthDate: backendUser.birth_date || null,
  createdAt: backendUser.created_at,
  stats: {
    posts: backendUser.stats.posts_count,
    following: backendUser.stats.following_count,
    followers: backendUser.stats.followers_count
  }
})

export const transformBackendUserToCardWithStats = (
  backendUser: BackendUser
): UserCardWithStats => ({
  id: backendUser.id,
  username: backendUser.username,
  firstName: backendUser.first_name,
  lastName: backendUser.last_name,
  avatar: backendUser.profile_image,
  bio: backendUser.bio,
  isFollowing: false, // Precisa calcular separadamente
  stats: {
    following: backendUser.stats.following_count,
    followers: backendUser.stats.followers_count
  }
})

// Frontend → Backend
export const transformUserToBackend = (
  user: Partial<User>
): Partial<BackendUser> => ({
  first_name: user.firstName,
  last_name: user.lastName,
  bio: user.bio,
  profile_image: user.avatar,
  banner: user.banner,
  location: user.location,
  website: user.website,
  birth_date: user.birthDate
})

// ============================================
// POLL TRANSFORMERS
// ============================================

// Backend → Frontend
export const transformBackendPoll = (backendPoll: BackendPoll): Poll => ({
  id: backendPoll.id,
  question: backendPoll.question,
  options: backendPoll.options.map(transformBackendPollOption),
  durationHours: backendPoll.duration_hours,
  endsAt: backendPoll.ends_at,
  totalVotes: backendPoll.total_votes
})

export const transformBackendPollOption = (
  backendOption: BackendPollOption
): PollOption => ({
  id: backendOption.id,
  text: backendOption.text,
  votes: backendOption.votes,
  percentage: backendOption.percentage
})

// Frontend → Backend
export const transformPollToBackend = (poll: Poll): BackendPoll => ({
  id: poll.id,
  question: poll.question,
  options: poll.options.map(transformPollOptionToBackend),
  duration_hours: poll.durationHours,
  ends_at: poll.endsAt,
  total_votes: poll.totalVotes
})

export const transformPollOptionToBackend = (
  option: PollOption
): BackendPollOption => ({
  id: option.id,
  text: option.text,
  votes: option.votes,
  percentage: option.percentage
})

// ============================================
// MEDIA TRANSFORMERS
// ============================================

// Backend → Frontend
export const transformBackendMedia = (
  backendMedia: BackendPostMedia
): PostMedia => ({
  id: backendMedia.id.toString(),
  type: backendMedia.type as 'image' | 'video' | 'gif',
  url: backendMedia.url,
  thumbnail: backendMedia.thumbnail,
  order: backendMedia.order
})

// Frontend → Backend
export const transformMediaToBackend = (
  media: PostMedia
): BackendPostMedia => ({
  id: media.id,
  type: media.type,
  url: media.url,
  thumbnail: media.thumbnail,
  order: media.order
})

// ============================================
// LOCATION TRANSFORMERS
// ============================================

// Backend → Frontend
export const transformBackendLocation = (
  backendLocation: BackendLocation
): Location => ({
  id: backendLocation.id,
  name: backendLocation.name,
  latitude: backendLocation.latitude,
  longitude: backendLocation.longitude
})

// Frontend → Backend
export const transformLocationToBackend = (
  location: Location
): BackendLocation => ({
  id: location.id,
  name: location.name,
  latitude: location.latitude,
  longitude: location.longitude
})

// ============================================
// POST TRANSFORMERS
// ============================================

// Backend → Frontend
export const transformPost = (backendPost: BackendPost): Post => ({
  id: backendPost.id,
  content: backendPost.content,
  author: transformBackendUserToCardWithStats(backendPost.author),
  createdAt: backendPost.created_at,
  updatedAt: backendPost.updated_at,
  publishedAt: backendPost.published_at,
  scheduledFor: backendPost.scheduled_for,
  isPublished: backendPost.is_published,
  stats: {
    comments: backendPost.stats.comments,
    retweets: backendPost.stats.retweets,
    likes: backendPost.stats.likes,
    views: backendPost.stats.views
  },
  media: backendPost.media?.map(transformBackendMedia),
  poll: backendPost.poll ? transformBackendPoll(backendPost.poll) : undefined,
  location: backendPost.location
    ? transformBackendLocation(backendPost.location)
    : undefined,
  inReplyTo: backendPost.in_reply_to,
  retweetOf: backendPost.retweet_of
})

// Frontend → Backend
export const transformPostToBackend = (
  post: Partial<Post>
): Partial<BackendPost> => ({
  content: post.content,

  // ✅ Transformar objetos aninhados
  poll: post.poll ? transformPollToBackend(post.poll) : undefined,
  location: post.location
    ? transformLocationToBackend(post.location)
    : undefined,
  media: post.media?.map(transformMediaToBackend),

  scheduled_for: post.scheduledFor,
  is_published: post.isPublished,
  in_reply_to: post.inReplyTo,
  retweet_of: post.retweetOf
})

// ✅ Para posts do feed (com interações)
export const transformPostWithInteractions = (
  backendPost: BackendPost & {
    is_liked?: boolean
    is_retweeted?: boolean
    is_bookmarked?: boolean
  }
): PostWithInteractions => ({
  ...transformPost(backendPost),
  isLiked: backendPost.is_liked || false,
  isRetweeted: backendPost.is_retweeted || false,
  isBookmarked: backendPost.is_bookmarked || false
})

// ============================================
// REQUEST TRANSFORMERS (Frontend → Backend)
// ============================================

export const transformRegisterRequest = (
  request: RegisterRequest
): BackendRegisterRequest => {
  return {
    username: request.username,
    email: request.email,
    phone: request.phone,
    password: request.password,
    password_confirm: request.confirmPassword,
    first_name: request.firstName,
    last_name: request.lastName,
    birth_date: request.birthDate
  }
}

export const transformCreatePostRequest = (
  request: CreatePostRequest
): BackendCreatePostRequest => {
  return {
    content: request.content,

    // ✅ Transformar poll de request (simplificado)
    poll: request.poll
      ? {
          question: request.poll.question,
          options: request.poll.options.map((text, index) => ({
            text,
            order: index + 1
          })),
          duration_hours: request.poll.durationHours
          // Backend gera: id, ends_at, total_votes
        }
      : undefined,

    // ✅ Transformar location
    location: request.location
      ? {
          id: request.location.id,
          name: request.location.name,
          latitude: request.location.latitude,
          longitude: request.location.longitude
        }
      : undefined,

    // ✅ Transformar media
    media: request.media?.map((m) => ({
      id: m.id,
      type: m.type,
      url: m.url,
      order: m.order
    })),

    scheduled_for: request.scheduledFor,
    in_reply_to: request.inReplyTo,
    retweet_of: request.retweetOf
  }
}
