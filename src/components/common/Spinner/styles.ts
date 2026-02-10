import styled, { keyframes } from 'styled-components'
import type { SpinnerSize } from './types'

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

const sizes = {
  small: '14px',
  medium: '18px',
  large: '24px'
}

const borderWidths = {
  small: '2px',
  medium: '2.5px',
  large: '3px'
}

export const SpinnerContainer = styled.div<{
  $size: SpinnerSize
  $color?: string
}>`
  width: ${(props) => sizes[props.$size]};
  height: ${(props) => sizes[props.$size]};
  border: ${(props) => borderWidths[props.$size]} solid
    ${(props) => props.$color || 'currentColor'};
  border-top-color: transparent;
  border-radius: 50%;
  animation: ${spin} 0.6s linear infinite;
  flex-shrink: 0;
`
