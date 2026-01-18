import styled from 'styled-components'
import {
  fontSizes,
  fontWeights,
  transitions
} from '../../../../styles/globalStyles'

export const PostDetailContainer = styled.article`
  padding: 16px;
  border-bottom: 1px solid ${(props) => props.theme.colors.border.primary};
`

export const PostHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
`

export const AuthorInfo = styled.div`
  display: flex;
  flex-direction: column;
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

export const PostContent = styled.div`
  margin-bottom: 16px;
`

export const PostText = styled.p`
  font-size: ${fontSizes.xxl};
  line-height: 1.5;
  color: ${(props) => props.theme.colors.text.primary};
  margin: 0 0 16px 0;
  word-wrap: break-word;
`

export const PostDate = styled.div`
  padding: 16px 0;
  border-bottom: 1px solid ${(props) => props.theme.colors.border.primary};
  margin-bottom: 16px;
`

export const DateText = styled.span`
  font-size: ${fontSizes.md};
  color: ${(props) => props.theme.colors.text.secondary};

  &:hover {
    text-decoration: underline;
  }
`

export const PostStats = styled.div`
  display: flex;
  gap: 20px;
  padding: 16px 0;
  border-bottom: 1px solid ${(props) => props.theme.colors.border.primary};
  margin-bottom: 4px;
`

export const StatItem = styled.button`
  display: flex;
  gap: 4px;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  font-size: ${fontSizes.sm};

  &:hover {
    text-decoration: underline;
  }
`

export const StatNumber = styled.span`
  font-weight: ${fontWeights.bold};
  color: ${(props) => props.theme.colors.text.primary};
`

export const StatLabel = styled.span`
  color: ${(props) => props.theme.colors.text.secondary};
`

export const PostActions = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 12px 0;
  border-bottom: 1px solid ${(props) => props.theme.colors.border.primary};
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
      if (props.$color === props.theme.colors.background.primary)
        return 'rgba(29, 155, 240, 0.1)'
      if (props.$color === '#00ba7c') return 'rgba(0, 186, 124, 0.1)'
      if (props.$color === '#f91880') return 'rgba(249, 24, 128, 0.1)'
      return props.theme.colors.hover.primary
    }};

    color: ${(props) => props.$color || props.theme.colors.text.primary};
  }

  svg {
    width: 20px;
    height: 20px;
    fill: currentColor;
  }
`
