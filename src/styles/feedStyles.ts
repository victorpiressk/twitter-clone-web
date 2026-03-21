import styled from 'styled-components'
import { fontSizes, fontWeights } from './globalStyles'

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;
  color: ${({ theme }) => theme.colors.text.secondary};
`

export const EmptyStateTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: ${fontWeights.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 8px;
`

export const EmptyStateText = styled.p`
  font-size: ${fontSizes.md};
  color: ${({ theme }) => theme.colors.text.secondary};
  max-width: 400px;
`

export const LoadingMore = styled.div`
  display: flex;
  justify-content: center;
  padding: 24px;
`

export const LoadingText = styled.span`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${fontSizes.sm};
`

export const EndMessage = styled.div`
  text-align: center;
  padding: 32px 16px;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${fontSizes.sm};
  border-top: 1px solid ${({ theme }) => theme.colors.border.primary};
`

export const PullMessage = styled.div`
  text-align: center;
  padding: 12px;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${fontSizes.sm};
`

export const ReleaseMessage = styled.div`
  text-align: center;
  padding: 12px;
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${fontSizes.sm};
  font-weight: ${fontWeights.bold};
`
