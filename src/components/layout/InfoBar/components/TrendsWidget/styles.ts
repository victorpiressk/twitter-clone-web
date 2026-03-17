import styled from 'styled-components'
import {
  colors,
  fontSizes,
  fontWeights
} from '../../../../../styles/globalStyles'
import { ButtonLink } from '../../../../common/Button/styles'

export const Widget = styled.div`
  background-color: ${(props) => props.theme.colors.background.primary};
  border: 1px solid ${(props) => props.theme.colors.border.primary};
  border-radius: 16px;
`

export const WidgetHeader = styled.div`
  padding: 12px 16px;
`

export const WidgetTitle = styled.h2`
  font-size: ${fontSizes.xl};
  font-weight: ${fontWeights.heavy};
  color: ${(props) => props.theme.colors.text.primary};
`

export const TrendsList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`

export const TrendItem = styled.li`
  padding: 12px 16px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${(props) => props.theme.colors.hover.primary};
  }
`

export const TrendCategory = styled.span`
  display: block;
  font-size: ${fontSizes.sm};
  color: ${(props) => props.theme.colors.text.secondary};
  margin-bottom: 2px;
`

export const TrendName = styled.span`
  display: block;
  font-size: ${fontSizes.md};
  font-weight: ${fontWeights.bold};
  color: ${(props) => props.theme.colors.text.primary};
  margin-bottom: 2px;
`

export const TrendCount = styled.span`
  display: block;
  font-size: ${fontSizes.sm};
  color: ${(props) => props.theme.colors.text.secondary};
`

export const ShowMore = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  cursor: pointer;
  font-size: ${fontSizes.md};
  color: ${colors.primary};
  transition: background-color 0.2s;

  &:hover {
    background-color: ${(props) => props.theme.colors.hover.primary};
    border-radius: 0 0 16px 16px;
  }

  ${ButtonLink} {
    &:hover {
      background-color: transparent;
    }
  }
`

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

export const LoadingState = styled.div`
  padding: 20px 16px;
  text-align: center;
  color: ${(props) => props.theme.colors.text.secondary};
  font-size: ${fontSizes.sm};
`

export const EmptyState = styled.div`
  padding: 20px 16px;
  text-align: center;
  color: ${(props) => props.theme.colors.text.secondary};
  font-size: ${fontSizes.sm};
`
