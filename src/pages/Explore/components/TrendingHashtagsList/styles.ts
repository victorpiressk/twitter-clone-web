import styled from 'styled-components'
import { fontSizes, fontWeights } from '../../../../styles/globalStyles'

export const TrendingList = styled.div`
  display: flex;
  flex-direction: column;
`

export const TrendingItem = styled.button`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: none;
  border: none;
  border-bottom: 1px solid ${(props) => props.theme.colors.border.primary};
  cursor: pointer;
  transition: background-color 0.2s;
  text-align: left;

  &:hover {
    background-color: ${(props) => props.theme.colors.hover.primary};
  }

  &:last-child {
    border-bottom: none;
  }
`

export const TrendingInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`

export const TrendingName = styled.span`
  font-size: ${fontSizes.md};
  font-weight: ${fontWeights.bold};
  color: ${(props) => props.theme.colors.text.primary};
  margin-bottom: 2px;
`

export const TrendingStats = styled.span`
  font-size: ${fontSizes.sm};
  color: ${(props) => props.theme.colors.text.secondary};
`

export const TrendingRank = styled.div`
  color: ${(props) => props.theme.colors.text.secondary};
  min-width: 36px;
  margin-bottom: 6px;
`

export const Separator = styled.span`
  color: ${(props) => props.theme.colors.text.secondary};
`
