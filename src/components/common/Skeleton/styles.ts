import styled, { keyframes } from 'styled-components'
import type { SkeletonVariant } from './types'

const shimmer = keyframes`
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
`

export const SkeletonBase = styled.div<{
  $variant: SkeletonVariant
  $width?: string | number
  $height?: string | number
  $borderRadius?: string
}>`
  background: ${(props) => props.theme.colors.border.primary};
  background-image: linear-gradient(
    90deg,
    ${(props) => props.theme.colors.border.primary} 0px,
    ${(props) => props.theme.colors.hover.primary} 40px,
    ${(props) => props.theme.colors.border.primary} 80px
  );
  background-size: 1000px 100%;
  animation: ${shimmer} 1.5s infinite linear;

  ${(props) => {
    const width =
      typeof props.$width === 'number' ? `${props.$width}px` : props.$width
    const height =
      typeof props.$height === 'number' ? `${props.$height}px` : props.$height

    // Variant: circle
    if (props.$variant === 'circle') {
      const size = width || height || '40px'
      return `
        width: ${size};
        height: ${size};
        border-radius: 50%;
      `
    }

    // Variant: text (linha de texto)
    if (props.$variant === 'text') {
      return `
        width: ${width || '100%'};
        height: ${height || '16px'};
        border-radius: 4px;
      `
    }

    // Variant: rect (retângulo customizável)
    return `
      width: ${width || '100%'};
      height: ${height || '100px'};
      border-radius: ${props.$borderRadius || '8px'};
    `
  }}
`
