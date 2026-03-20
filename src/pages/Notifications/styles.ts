import styled from 'styled-components'
import { breakpoints, fontSizes, fontWeights } from '../../styles/globalStyles'

export const NotificationsContainer = styled.div`
  border-right: 1px solid ${(props) => props.theme.colors.border.primary};
  min-height: 100vh;
  width: 100%;
  max-width: 600px;
  flex-shrink: 0;

  @media (max-width: ${breakpoints.desktop}) {
    max-width: 100%;
  }
`

export const NotificationsList = styled.div``

export const EmptyState = styled.div`
  padding: 40px 20px;
  text-align: center;
  color: ${(props) => props.theme.colors.text.secondary};

  h3 {
    font-size: ${fontSizes.xl};
    font-weight: ${fontWeights.bold};
    color: ${(props) => props.theme.colors.text.primary};
    margin: 0 0 8px 0;
  }

  p {
    font-size: ${fontSizes.md};
    margin: 0;
  }
`
