import styled from 'styled-components'
import { breakpoints, fontSizes, fontWeights } from '../../styles/globalStyles'

export const ConnectContainer = styled.div`
  border-right: 1px solid ${(props) => props.theme.colors.border.primary};
  min-height: 100vh;
  width: 100%;
  max-width: 600px;
  flex-shrink: 0;

  @media (max-width: ${breakpoints.desktop}) {
    max-width: 100%;
  }
`

export const SectionTitle = styled.h3`
  font-size: ${fontSizes.xl};
  font-weight: ${fontWeights.heavy};
  color: ${(props) => props.theme.colors.text.primary};
  padding: 12px 16px;
  margin: 0;
`

export const UsersList = styled.div``

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  text-align: center;
`

export const EmptyStateTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 8px;
`

export const EmptyStateText = styled.p`
  font-size: 0.938rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  max-width: 400px;
`
