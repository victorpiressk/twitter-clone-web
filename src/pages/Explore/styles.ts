import styled from 'styled-components'
import { breakpoints, fontSizes, fontWeights } from '../../styles/globalStyles'

export const ExploreContainer = styled.div`
  border-right: 1px solid ${(props) => props.theme.colors.border.primary};
  min-height: 100vh;
  width: 100%;
  max-width: 600px;
  flex-shrink: 0;

  @media (max-width: ${breakpoints.desktop}) {
    max-width: 100%;
  }
`

export const TabContent = styled.div`
  /* Conteúdo das tabs */
`

export const EmptyState = styled.div`
  padding: 40px 20px;
  text-align: center;
  color: ${(props) => props.theme.colors.text.secondary};
`

export const LoadingMore = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
`

export const LoadingText = styled.p`
  font-size: ${fontSizes.md};
  color: ${(props) => props.theme.colors.text.secondary};
`

export const EndMessage = styled.div`
  padding: 40px 20px;
  text-align: center;
  color: ${(props) => props.theme.colors.text.secondary};
  font-size: ${fontSizes.md};
  border-top: 1px solid ${(props) => props.theme.colors.border.primary};
`

export const PullMessage = styled.div`
  text-align: center;
  padding: 16px;
  color: ${(props) => props.theme.colors.text.secondary};
  font-size: ${fontSizes.sm};
`

export const ReleaseMessage = styled.div`
  text-align: center;
  padding: 16px;
  color: ${(props) => props.theme.colors.text.primary};
  font-size: ${fontSizes.sm};
  font-weight: ${fontWeights.bold};
`
