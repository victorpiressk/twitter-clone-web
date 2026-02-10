import styled, { css } from 'styled-components'
import {
  colors,
  fontSizes,
  fontWeights,
  transitions
} from '../../../../styles/globalStyles'
import type { PostCardVariant } from './types'

export const Wrapper = styled.div`
  border-bottom: 1px solid ${(props) => props.theme.colors.border.primary};
`

export const PostCardContainer = styled.article<{
  $clickable: boolean
  $variant: PostCardVariant
}>`
  position: relative;
  display: flex;
  flex-direction: column; /* ← SEMPRE column (actions ficam abaixo) */
  padding: 16px;
  transition: ${transitions.fast};

  ${({ $clickable }) =>
    $clickable &&
    css`
      cursor: pointer;
      &:hover {
        background-color: ${(props) => props.theme.colors.hover.primary};
      }
    `}
`

/* NOVO: Container para Avatar + Content (apenas no modo default) */
export const PostMainContent = styled.div`
  display: flex;
  gap: 12px;
  width: 100%;
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

export const PostHeaderStacked = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 8px;

  > div {
    display: flex;
    flex-direction: column;
  }
`

export const PostDateDetailed = styled.div`
  font-size: ${fontSizes.md};
  color: ${(props) => props.theme.colors.text.secondary};
  padding: 12px 0;
  border-bottom: 1px solid ${(props) => props.theme.colors.border.primary};
  margin-bottom: 12px;
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

export const PostText = styled.p<{ $variant: PostCardVariant }>`
  font-size: ${({ $variant }) =>
    $variant === 'default' ? fontSizes.md : fontSizes.xl};
  line-height: 1.5;
  color: ${(props) => props.theme.colors.text.primary};
  margin: 0 0 12px 0;
  word-wrap: break-word;
`

/* ALTERADO: Actions agora ficam SEMPRE abaixo do conteúdo */
export const PostActions = styled.div<{ $variant: PostCardVariant }>`
  display: flex;
  justify-content: ${({ $variant }) =>
    $variant === 'detailed' ? 'space-around' : 'space-between'};
  max-width: ${({ $variant }) => ($variant === 'detailed' ? '100%' : '425px')};
  margin-top: 12px;

  /* No modo default, adiciona margem à esquerda para alinhar com o conteúdo */
  ${({ $variant }) =>
    $variant === 'default' &&
    css`
      margin-left: 52px; /* Avatar (40px) + gap (12px) = 52px */
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

export const ImagesGrid = styled.div<{ $count: number }>`
  display: grid;
  gap: 2px;
  border-radius: 16px;
  overflow: hidden;
  margin-top: 12px;
  max-width: 100%;

  ${(props) => {
    if (props.$count === 1) {
      return `
        grid-template-columns: 1fr;
        max-height: 510px;
      `
    }
    if (props.$count === 2) {
      return `
        grid-template-columns: repeat(2, 1fr);
        max-height: 285px;
      `
    }
    if (props.$count === 3) {
      return `
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: repeat(2, 285px);

        img:first-child {
          grid-row: 1 / 3;
        }
      `
    }
    if (props.$count >= 4) {
      return `
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: repeat(2, 285px);
      `
    }
  }}
`

export const PostImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  max-width: 100%;
`

export const RetweetIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px 0 16px;
  font-size: ${fontSizes.sm};
  font-weight: ${fontWeights.regular};
  color: ${(props) => props.theme.colors.text.secondary};
  cursor: pointer;
  transition: color ${transitions.fast};

  &:hover {
    color: ${(props) => props.theme.colors.text.primary};
    text-decoration: underline;
  }

  svg {
    width: 16px;
    height: 16px;
    color: ${(props) => props.theme.colors.text.secondary};
  }
`
