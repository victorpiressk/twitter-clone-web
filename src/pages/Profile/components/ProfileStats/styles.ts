import styled from 'styled-components'
import { fontSizes, fontWeights } from '../../../../styles/globalStyles'

export const StatsContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 12px;
`

export const StatItem = styled.button`
  display: flex;
  gap: 4px;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  font-size: ${fontSizes.sm};
  color: ${(props) => props.theme.colors.text.secondary};

  &:hover {
    text-decoration: underline;
  }
`

export const StatNumber = styled.span`
  font-weight: ${fontWeights.bold};
  color: ${(props) => props.theme.colors.text.primary};
`

export const StatLabel = styled.span`
  color: ${(props) => props.theme.colors.text.secondary};
`
