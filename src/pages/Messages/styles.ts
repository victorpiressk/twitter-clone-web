import styled from 'styled-components'
import { breakpoints, pageContainer414 } from '../../styles/globalStyles'
export {
  EmptyState,
  EmptyStateTitle,
  EmptyStateText
} from '../../styles/feedStyles'

export const MessagesContainer = styled.div`
  ${pageContainer414}

  @media (max-width: ${breakpoints.desktop}) {
    max-width: 100%;
  }
`
