import styled from 'styled-components'
import { fontSizes, fontWeights } from '../../styles/globalStyles'

export const PostDetailContainer = styled.div`
  border-right: 1px solid ${(props) => props.theme.colors.border.primary};
  min-height: 100vh;
`

export const PostDetailHeader = styled.div`
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: ${(props) => props.theme.colors.background.primary};
  backdrop-filter: blur(12px);
  border-bottom: 1px solid ${(props) => props.theme.colors.border.primary};
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 32px;
`

export const HeaderTitle = styled.h2`
  font-size: ${fontSizes.xl};
  font-weight: ${fontWeights.bold};
  color: ${(props) => props.theme.colors.text.primary};
  margin: 0;
`

export const CommentsSection = styled.div``

export const CommentsSectionTitle = styled.h3`
  font-size: ${fontSizes.lg};
  font-weight: ${fontWeights.bold};
  color: ${(props) => props.theme.colors.text.primary};
  padding: 16px;
  margin: 0;
  border-bottom: 1px solid ${(props) => props.theme.colors.border.primary};
`
