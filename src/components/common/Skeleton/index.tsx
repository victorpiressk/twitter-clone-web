import * as S from './styles'
import type { SkeletonProps } from './types'

const Skeleton = ({
  variant = 'text',
  width,
  height,
  borderRadius
}: SkeletonProps) => {
  return (
    <S.SkeletonBase
      $variant={variant}
      $width={width}
      $height={height}
      $borderRadius={borderRadius}
    />
  )
}

export default Skeleton
