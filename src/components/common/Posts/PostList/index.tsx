import PostCard from '../PostCard'
import type { PostListProps } from './types'
import * as S from './styles'

const PostList = ({ posts, variant }: PostListProps) => {
  return (
    <S.PostListContainer>
      {posts.map((post) => (
        <PostCard key={post.id} postId={post.id} variant={variant} />
      ))}
    </S.PostListContainer>
  )
}

export default PostList
