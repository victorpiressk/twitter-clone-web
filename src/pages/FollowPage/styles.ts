import styled from 'styled-components'
import { breakpoints } from '../../styles/globalStyles'

export const FollowContainer = styled.div`
  border-right: 1px solid ${(props) => props.theme.colors.border.primary};
  min-height: 100vh;
  width: 100%;
  max-width: 600px;
  flex-shrink: 0;

  @media (max-width: ${breakpoints.desktop}) {
    max-width: 100%;
  }
`

export const HeaderTop = styled.div`
  display: flex;
  align-items: center;
  gap: 28px;
  padding: 10px 0 2px;
`

export const UserList = styled.div`
  /* Lista de usuários */
`

export const EmptyState = styled.div`
  padding: 40px 20px;
  text-align: center;
  color: ${(props) => props.theme.colors.text.secondary};
`

export const EmptyStateText = styled.p`
  font-size: 0.938rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  max-width: 400px;
`
