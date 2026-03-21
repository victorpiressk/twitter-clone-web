import styled from 'styled-components'
import { fontSizes, pageContainer600 } from '../../styles/globalStyles'
export {
  EmptyState,
  EmptyStateText,
  LoadingMore,
  LoadingText,
  EndMessage,
  PullMessage,
  ReleaseMessage
} from '../../styles/feedStyles'

export const ProfileContainer = styled.div`
  ${pageContainer600}
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
