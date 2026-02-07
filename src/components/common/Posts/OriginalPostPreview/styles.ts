import styled from 'styled-components'
import { colors, fontSizes, fontWeights } from '../../../../styles/globalStyles'

export const Container = styled.div<{ $showConnector?: boolean }>`
  display: flex;
  gap: 12px;
  position: relative;
  padding: 12px 0;
  max-width: 100%;

  ${(props) =>
    props.$showConnector &&
    `
    &::after {
      content: '';
      position: absolute;
      left: 20px;
      top: 52px;
      bottom: -12px;
      width: 2px;
      height: 100%;
      background-color: ${props.theme.colors.border.primary};
    }
  `}
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
  min-width: 0;
`

export const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`

export const AuthorName = styled.span`
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

export const Timestamp = styled.span`
  font-size: ${fontSizes.md};
  color: ${(props) => props.theme.colors.text.secondary};

  &::before {
    content: '·';
    margin: 0 4px;
  }
`

export const PostContent = styled.p`
  font-size: ${fontSizes.md};
  color: ${(props) => props.theme.colors.text.primary};
  line-height: 1.5;
  word-wrap: break-word;
  white-space: pre-wrap;
  margin: 0;
  overflow-wrap: break-word;
`

export const ImagesGrid = styled.div<{ $count: number }>`
  display: grid;
  gap: 2px;
  border-radius: 16px;
  overflow: hidden;
  margin-top: 12px;

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

export const ReplyingTo = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: ${fontSizes.sm};
  color: ${(props) => props.theme.colors.text.secondary};
  margin: 8px 0;
  padding-left: 52px;

  span {
    color: ${colors.primary};

    &:hover {
      text-decoration: underline;
    }
  }
`
