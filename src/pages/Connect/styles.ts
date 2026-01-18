import styled from 'styled-components'
import { fontSizes, fontWeights } from '../../styles/globalStyles'

export const ConnectContainer = styled.div`
  border-right: 1px solid ${(props) => props.theme.colors.border.primary};
  min-height: 100vh;
  width: 600px;
  flex-shrink: 0;
`

export const ConnectHeader = styled.div`
  position: sticky;
  top: 0;
  z-index: 10;

  display: flex;
  gap: 28px;

  background-color: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);

  padding: 8px 8px;
  align-items: center;
`

export const HeaderTitle = styled.h2`
  font-size: ${fontSizes.xl};
  font-weight: ${fontWeights.bold};
  color: ${(props) => props.theme.colors.text.primary};
  margin: 0;
`

export const SectionTitle = styled.h3`
  font-size: ${fontSizes.xl};
  font-weight: ${fontWeights.heavy};
  color: ${(props) => props.theme.colors.text.primary};
  padding: 12px 16px;
  margin: 0;
`

export const UsersList = styled.div``
