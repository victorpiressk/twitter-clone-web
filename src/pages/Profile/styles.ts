import styled from 'styled-components'
import { breakpoints, fontSizes } from '../../styles/globalStyles'

export const ProfileContainer = styled.div`
  border-right: 1px solid ${(props) => props.theme.colors.border.primary};
  min-height: 100vh;
  width: 100%;
  max-width: 600px;
  flex-shrink: 0;

  @media (max-width: ${breakpoints.desktop}) {
    max-width: 100%;
  }
`

export const PostCount = styled.p`
  font-size: ${fontSizes.sm};
  color: ${(props) => props.theme.colors.text.secondary};
`

export const TabContent = styled.div`
  border-top: 1px solid ${(props) => props.theme.colors.border.primary};
`

export const ComingSoon = styled.div`
  padding: 40px 20px;
  text-align: center;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 0.938rem;
`

export const EmptyState = styled.div`
  padding: 60px 20px;
  text-align: center;
`

export const EmptyStateText = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 0.938rem;
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
