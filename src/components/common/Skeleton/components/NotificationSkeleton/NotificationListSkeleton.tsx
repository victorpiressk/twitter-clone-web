import NotificationSkeleton from './index'

type NotificationListSkeletonProps = {
  count?: number
}

const NotificationListSkeleton = ({
  count = 5
}: NotificationListSkeletonProps) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <NotificationSkeleton key={index} />
      ))}
    </>
  )
}

export default NotificationListSkeleton
