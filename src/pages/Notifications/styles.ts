import styled from 'styled-components'
import { fontSizes, fontWeights } from '../../styles/globalStyles'

export const NotificationsContainer = styled.div`
  border-right: 1px solid ${(props) => props.theme.colors.border.primary};
  min-height: 100vh;
  width: 600px;
  flex-shrink: 0;
`

export const NotificationsHeader = styled.div`
  position: sticky;
  top: 0;
  z-index: 10;

  background-color: ${(props) => props.theme.colors.background.blur};
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);

  backdrop-filter: blur(12px);
  border-bottom: 1px solid ${(props) => props.theme.colors.border.primary};
  padding: 12px 16px 0;
`

export const HeaderTitle = styled.h2`
  font-size: ${fontSizes.xl};
  font-weight: ${fontWeights.bold};
  color: ${(props) => props.theme.colors.text.primary};
  margin: 0;
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
