import PostCard from '../PostCard'
import type { PostListProps } from './types'
import * as S from './styles'

const PostList = ({
  posts,
  onLike,
  onRetweet,
  onQuoteTweet,
  onComment,
  variant
}: PostListProps) => {
  return (
    <S.PostListContainer>
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          onLike={onLike}
          onRetweet={onRetweet}
          onQuoteTweet={onQuoteTweet}
          onComment={onComment}
          variant={variant}
        />
      ))}
    </S.PostListContainer>
  )
}

export default PostList
