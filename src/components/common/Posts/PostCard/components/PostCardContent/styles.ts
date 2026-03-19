import styled from 'styled-components'
import {
  breakpoints,
  fontSizes,
  fontWeights,
  truncate
} from '../../../../../../styles/globalStyles'
import type { PostCardVariant } from '../../types'

export const PostContent = styled.div`
  flex: 1;
  min-width: 0;
`

export const PostHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  margin-bottom: 4px;

  @media (max-width: ${breakpoints.mobile}) {
    span {
      ${truncate}
      min-width: 0;
      flex: 1;
    }
  }
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

export const Separator = styled.div`
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
