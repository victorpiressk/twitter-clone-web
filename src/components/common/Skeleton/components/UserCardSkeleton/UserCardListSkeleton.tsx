import UserCardSkeleton from './index'

type UserCardListSkeletonProps = {
  count?: number
}

const UserCardListSkeleton = ({ count = 3 }: UserCardListSkeletonProps) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <UserCardSkeleton key={index} />
      ))}
    </>
  )
}

export default UserCardListSkeleton
