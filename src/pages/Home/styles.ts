import styled from 'styled-components'
import { breakpoints, pageContainer600 } from '../../styles/globalStyles'
export {
  EmptyState,
  EmptyStateTitle,
  EmptyStateText,
  LoadingMore,
  LoadingText,
  EndMessage,
  PullMessage,
  ReleaseMessage
} from '../../styles/feedStyles'

export const HomeContainer = styled.div`
  ${pageContainer600}
`

export const PostFormWrapper = styled.div`
  @media (max-width: ${breakpoints.mobile}) {
    display: none;
  }
`
