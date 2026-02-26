import type {
  BackendPost,
  BackendPostDetail,
  BackendPostMedia,
  BackendPostWithInteractions
} from '../../../types/contracts/dtos'
import type {
  Post,
  PostDetail,
  PostMedia,
  PostWithInteractions
} from '../../../types/domain/models'
import { transformPoll } from './poll'
import { transformLocation } from './location'
import { transformUserToCardWithStats } from './user'

// ============================================
// BACKEND → FRONTEND
// ============================================

export const transformPostMedia = (
  backendPostMedia: BackendPostMedia
): PostMedia => ({
  id: backendPostMedia.id,
  type: backendPostMedia.type,
  url: backendPostMedia.url,
  thumbnail: backendPostMedia.thumbnail,
  order: backendPostMedia.order
})

export const transformPost = (backendPost: BackendPost): Post => ({
  id: backendPost.id,
  content: backendPost.content,
  author: transformUserToCardWithStats(backendPost.author),
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
  media: backendPost.media?.map(transformPostMedia),
  poll: backendPost.poll ? transformPoll(backendPost.poll) : undefined,
  location: backendPost.location
    ? transformLocation(backendPost.location)
    : undefined,
  inReplyTo: backendPost.in_reply_to,
  retweetOf: backendPost.retweet_of
})

export const transformPostWithInteractions = (
  backendPostWithInteractions: BackendPostWithInteractions
): PostWithInteractions => {
  // 1. Transforma os dados comuns do post (id, content, author...)
  const basePost = transformPost(backendPostWithInteractions)

  // 2. Retorna a união (merge) de tudo que está na basePost + o novo campo
  return {
    ...basePost,
    isLiked: backendPostWithInteractions.is_liked,
    isRetweeted: backendPostWithInteractions.is_retweeted,
    isBookmarked: backendPostWithInteractions.is_bookmarked
  }
}

export const transformPostDetail = (
  backendPostDetail: BackendPostDetail
): PostDetail => {
  // 1. Transforma os dados comuns do post (id, content, author...)
  const basePost = transformPost(backendPostDetail)

  // 2. Retorna a união (merge) de tudo que está na basePost + o novo campo
  return {
    ...basePost,
    fullThread: backendPostDetail.full_thread?.map(transformPost),
    comments: backendPostDetail.comments?.map(transformPost)
  }
}

// ============================================
// FRONTEND → BACKEND
// ============================================

export const transformPostMediaToBackend = (
  postMedia: PostMedia
): BackendPostMedia => ({
  id: postMedia.id,
  type: postMedia.type,
  url: postMedia.url,
  thumbnail: postMedia.thumbnail,
  order: postMedia.order
})

export const transformPostToBackend = (post: Post): BackendPost => ({
  id: post.id,
  content: post.content,
  author: {
    id: post.author.id,
    username: post.author.username,
    first_name: post.author.firstName,
    last_name: post.author.lastName,
    profile_image: post.author.avatar,
    bio: post.author.bio,
    is_following: post.author.isFollowing,
    stats: {
      following: post.author.stats.following,
      followers: post.author.stats.followers
    }
  },
  created_at: post.createdAt,
  updated_at: post.updatedAt,
  published_at: post.publishedAt,
  scheduled_for: post.scheduledFor,
  is_published: post.isPublished,
  stats: {
    comments: post.stats.comments,
    retweets: post.stats.retweets,
    likes: post.stats.likes,
    views: post.stats.views
  },
  media: post.media?.map(transformPostMediaToBackend),
  poll: post.poll
    ? {
        id: post.poll.id,
        question: post.poll.question,
        options: post.poll.options.map((opt) => ({
          id: opt.id,
          text: opt.text,
          votes: opt.votes,
          percentage: opt.percentage
        })),
        total_votes: post.poll.totalVotes,
        duration_hours: post.poll.durationHours,
        ends_at: post.poll.endsAt,
        is_active: post.poll.isActive
      }
    : undefined,
  location: post.location
    ? {
        id: post.location.id,
        name: post.location.name,
        latitude: post.location.latitude,
        longitude: post.location.longitude,
        posts_count: post.location.postsCount
      }
    : undefined,
  in_reply_to: post.inReplyTo,
  retweet_of: post.retweetOf
})
