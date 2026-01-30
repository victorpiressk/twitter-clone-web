import styled from 'styled-components'
import {
  colors,
  fontSizes,
  fontWeights,
  transitions
} from '../../../styles/globalStyles'

export const PostCardContainer = styled.article`
  display: flex;
  gap: 12px;
  padding: 16px;
  border-bottom: 1px solid ${(props) => props.theme.colors.border.primary};
  cursor: pointer;
  transition: ${transitions.fast};

  &:hover {
    background-color: ${(props) => props.theme.colors.hover.primary};
  }
`

export const PostContent = styled.div`
  flex: 1;
  min-width: 0;
`

export const PostHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  margin-bottom: 4px;
`

export const DisplayName = styled.span`
  font-size: ${fontSizes.md};
  font-weight: ${fontWeights.bold};
  color: ${(props) => props.theme.colors.text.primary};

  &:hover {
    text-decoration: underline;
  }
`

export const Username = styled.span`
  font-size: ${fontSizes.md};
  color: ${(props) => props.theme.colors.text.secondary};
`

export const Separator = styled.span`
  color: ${(props) => props.theme.colors.text.secondary};
`

export const PostDate = styled.span`
  font-size: ${fontSizes.md};
  color: ${(props) => props.theme.colors.text.secondary};

  &:hover {
    text-decoration: underline;
  }
`

export const PostText = styled.p`
  font-size: ${fontSizes.md};
  line-height: 1.5;
  color: ${(props) => props.theme.colors.text.primary};
  margin: 0 0 12px 0;
  word-wrap: break-word;
`

export const PostActions = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 425px;
  margin-top: 12px;
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
