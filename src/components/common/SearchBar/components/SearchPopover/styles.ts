import styled from 'styled-components'
import {
  colors,
  fontSizes,
  fontWeights
} from '../../../../../styles/globalStyles'

export const PopoverContainer = styled.div``

export const EmptyMessage = styled.p`
  font-size: ${fontSizes.md};
  color: ${(props) => props.theme.colors.text.secondary};
  text-align: center;
  margin: 0;
  line-height: 1.5;
`

// Estilos do histórico
export const HistoryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
`

export const HistoryTitle = styled.h3`
  font-size: ${fontSizes.xl};
  font-weight: ${fontWeights.bold};
  color: ${(props) => props.theme.colors.text.primary};
  margin: 0;
`

export const ClearAllButton = styled.button`
  background: none;
  border: none;
  color: ${colors.primary};
  font-size: ${fontSizes.sm};
  font-weight: ${fontWeights.bold};
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 9999px;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${colors.hover.primary};
  }
`

export const HistoryList = styled.div`
  display: flex;
  flex-direction: column;
`

export const HistoryItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  cursor: pointer;
  transition: background-color 0.2s;
  border-radius: 4px;

  &:hover {
    background-color: ${(props) => props.theme.colors.hover.background};
  }
`

export const HistoryIcon = styled.div`
  font-size: 18px;
  flex-shrink: 0;
`

export const HistoryText = styled.div`
  flex: 1;
  min-width: 0;
`

export const HistoryMainText = styled.p`
  font-size: ${fontSizes.md};
  color: ${(props) => props.theme.colors.text.primary};
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export const HistorySubText = styled.p`
  font-size: ${fontSizes.sm};
  color: ${(props) => props.theme.colors.text.secondary};
  margin: 2px 0 0 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export const RemoveButton = styled.button`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  flex-shrink: 0;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${colors.hover.primary};
  }

  svg {
    width: 18px;
    height: 18px;
    fill: ${colors.primary};
  }
`
