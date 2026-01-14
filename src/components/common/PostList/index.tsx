import PostCard from '../PostCard'
import type { PostListProps } from './types'
import * as S from './styles'

const PostList = ({ posts, onLike, onRetweet, onComment }: PostListProps) => {
  if (posts.length === 0) {
    return (
      <S.EmptyState>Nenhum post ainda. Seja o primeiro a postar!</S.EmptyState>
    )
  }

  return (
    <S.PostListContainer>
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          onLike={onLike}
          onRetweet={onRetweet}
          onComment={onComment}
        />
      ))}
    </S.PostListContainer>
  )
}

export default PostList
