export type Post = {
  id: string
  author: {
    id: string
    username: string
    displayName: string
    avatar?: string
    bio?: string
    isFollowing: boolean
  }
  content: string
  createdAt: string
  stats: {
    comments: number
    retweets: number
    likes: number
    views: number
  }
  isLiked: boolean
  isRetweeted: boolean
}

export type PostCardProps = {
  post: Post
  onLike: (postId: string) => void
  onRetweet: (postId: string) => void
  onComment: (postId: string) => void
}
