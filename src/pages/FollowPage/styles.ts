import styled from 'styled-components'
import { fontSizes, fontWeights } from '../../styles/globalStyles'

export const FollowContainer = styled.div`
  border-right: 1px solid ${(props) => props.theme.colors.border.primary};
  min-height: 100vh;
  width: 600px;
  flex-shrink: 0;
`

export const Header = styled.div`
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: ${(props) => props.theme.colors.background.blur};
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid ${(props) => props.theme.colors.border.primary};
  padding: 0 9px;
`

export const HeaderTop = styled.div`
  display: flex;
  align-items: center;
  gap: 28px;
  padding: 10px 0 2px;
`

export const HeaderInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
`

export const HeaderName = styled.span`
  font-size: ${fontSizes.xl};
  font-weight: ${fontWeights.bold};
  color: ${(props) => props.theme.colors.text.primary};
  margin: 0;

  line-height: 1;
  padding-bottom: 2px;
`

export const HeaderUsername = styled.span`
  font-size: ${fontSizes.sm};
  color: ${(props) => props.theme.colors.text.secondary};
`

export const UserList = styled.div`
  /* Lista de usuários */
`

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
