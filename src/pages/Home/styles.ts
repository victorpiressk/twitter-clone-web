import styled from 'styled-components'
import { breakpoints, fontWeights } from '../../styles/globalStyles'

export const HomeContainer = styled.div`
  border-right: 1px solid ${(props) => props.theme.colors.border.primary};
  min-height: 100vh;
  width: 100%;
  max-width: 600px;
  flex-shrink: 0;

  @media (max-width: ${breakpoints.desktop}) {
    max-width: 100%;
  }
`

export const PostFormWrapper = styled.div`
  @media (max-width: ${breakpoints.mobile}) {
    display: none;
  }
`

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;
`

export const EmptyStateTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: ${fontWeights.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 8px;
`

export const EmptyStateText = styled.p`
  font-size: 0.938rem;
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
