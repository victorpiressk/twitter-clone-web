import styled from 'styled-components'
import { fontSizes, fontWeights } from '../../../../styles/globalStyles'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 12px;
  border: 1px solid ${(props) => props.theme.colors.border.primary};
  border-radius: 16px;
  margin-top: 12px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${(props) => props.theme.colors.hover.primary};
  }
`

export const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`

export const AuthorInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1;
  min-width: 0;
`

export const TopRow = styled.div`
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
  overflow-wrap: break-word;
  margin: 0;
`

export const ImagesGrid = styled.div<{ $count: number }>`
  display: grid;
  gap: 2px;
  border-radius: 12px;
  overflow: hidden;
  margin-top: 8px;
  max-width: 100%;

  ${(props) => {
    if (props.$count === 1) {
      return `
        grid-template-columns: 1fr;
        max-height: 280px;
      `
    }
    if (props.$count === 2) {
      return `
        grid-template-columns: repeat(2, 1fr);
        max-height: 280px;
      `
    }
    if (props.$count === 3) {
      return `
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: repeat(2, 140px);

        img:first-child {
          grid-row: 1 / 3;
        }
      `
    }
    if (props.$count >= 4) {
      return `
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: repeat(2, 140px);
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
