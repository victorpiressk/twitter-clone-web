export type SkeletonVariant = 'text' | 'circle' | 'rect'

export type SkeletonProps = {
  variant?: SkeletonVariant
  width?: string | number
  height?: string | number
  borderRadius?: string
}
