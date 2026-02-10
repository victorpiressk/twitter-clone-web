import PostSkeleton from './index'

type PostListSkeletonProps = {
  count?: number
}

const PostListSkeleton = ({ count = 3 }: PostListSkeletonProps) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <PostSkeleton key={index} />
      ))}
    </>
  )
}

export default PostListSkeleton
