import styled from 'styled-components'
import { fontSizes, fontWeights } from '../../styles/globalStyles'

export const PostDetailContainer = styled.div`
  border-right: 1px solid ${(props) => props.theme.colors.border.primary};
  min-height: 100vh;
  width: 600px;
  flex-shrink: 0;
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

export const NoComments = styled.div`
  padding: 32px 16px;
  text-align: center;
  border-bottom: 1px solid ${(props) => props.theme.colors.border.primary};
`

export const NoCommentsText = styled.p`
  font-size: ${fontSizes.md};
  color: ${(props) => props.theme.colors.text.secondary};
  margin: 0;
`

export const PullToRefresh = styled.div<{ $distance: number }>`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%) translateY(${({ $distance }) => $distance - 40}px);
  padding: 12px 24px;
  background: ${({ theme }) => theme.colors.background.secondary};
  border-radius: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  z-index: 10;
  opacity: ${({ $distance }) => Math.min($distance / 80, 1)};
  transition: opacity 0.2s;
`

// src/pages/Home/styles.ts - Adicionar esses estilos

export const LoadingMore = styled.div`
  display: flex;
  justify-content: center;
  padding: 24px;
`

export const LoadingText = styled.span`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 0.875rem;
`

export const EndMessage = styled.div`
  text-align: center;
  padding: 32px 16px;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 0.875rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border.primary};
`

export const PullMessage = styled.div`
  text-align: center;
  padding: 12px;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 0.875rem;
`

export const ReleaseMessage = styled.div`
  text-align: center;
  padding: 12px;
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 0.875rem;
  font-weight: 600;
`
