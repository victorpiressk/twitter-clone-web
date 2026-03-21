import styled from 'styled-components'
import {
  fontSizes,
  fontWeights,
  pageContainer600
} from '../../styles/globalStyles'
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

export const ConnectContainer = styled.div`
  ${pageContainer600}
`

export const SectionTitle = styled.h3`
  font-size: ${fontSizes.xl};
  font-weight: ${fontWeights.heavy};
  color: ${(props) => props.theme.colors.text.primary};
  padding: 12px 16px;
  margin: 0;
`

export const UsersList = styled.div``
