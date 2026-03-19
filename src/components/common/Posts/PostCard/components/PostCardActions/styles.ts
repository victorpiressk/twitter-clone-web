import styled, { css } from 'styled-components'
import type { PostCardVariant } from '../../types'
import {
  colors,
  fontSizes,
  transitions
} from '../../../../../../styles/globalStyles'

export const PostActions = styled.div<{ $variant: PostCardVariant }>`
  display: flex;
  justify-content: ${({ $variant }) =>
    $variant === 'detailed' ? 'space-around' : 'space-between'};
  max-width: 100%;
  margin-top: 12px;

  /* No modo default, adiciona margem à esquerda para alinhar com o conteúdo */
  ${({ $variant }) =>
    $variant === 'default' &&
    css`
      margin: 12px 52px 0;
    `}
`

export const ActionButton = styled.button<{
  $active?: boolean
  $color?: string
}>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px;
  background: none;
  border: none;
  border-radius: 9999px;
  cursor: pointer;
  transition: ${transitions.fast};
  color: ${(props) =>
    props.$active && props.$color
      ? props.$color
      : props.theme.colors.text.secondary};

  &:hover {
    background-color: ${(props) => {
      if (props.$color === colors.primary) return `${colors.hover.primary}`
      if (props.$color === colors.success) return `${colors.hover.success}`
      if (props.$color === colors.like) return `${colors.hover.like}`
      return props.theme.colors.hover.primary
    }};

    color: ${(props) => props.$color || props.theme.colors.text.primary};
  }

  span {
    font-size: ${fontSizes.sm};
  }
`
