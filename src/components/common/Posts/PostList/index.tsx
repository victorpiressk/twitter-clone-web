import PostCard from '../PostCard'
import * as S from './styles'
import type { PostListProps } from './types'

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
