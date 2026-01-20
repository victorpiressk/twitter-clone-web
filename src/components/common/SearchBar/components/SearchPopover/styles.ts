import styled, { css } from 'styled-components'
import {
  colors,
  fontSizes,
  fontWeights
} from '../../../../../styles/globalStyles'
import { light } from '../../../../../styles/themes/light'

const POPOVER_VARIANTS = {
  large: css`
    width: 445px;
  `,
  small: css`
    width: 350px;
  `
}

interface PopoverContainerProps {
  $variant?: keyof typeof POPOVER_VARIANTS
}

export const PopoverContainer = styled.div<PopoverContainerProps>`
  min-height: 100px;
  max-height: 480px;
  overflow-y: auto;
  overscroll-behavior-y: none;
  color-scheme: ${(props) => (props.theme === light ? 'light' : 'dark')};

  ${({ $variant }) => POPOVER_VARIANTS[$variant || 'small']}
`

export const EmptyMessage = styled.p`
  padding: 12px;
  font-size: ${fontSizes.md};
  font-weight: ${fontWeights.regular};
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
    background-color: ${(props) => props.theme.colors.hover.primary};
  }
`

export const HistoryIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: ${(props) => props.theme.colors.text.secondary};
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
`

// Estilos do Estado 3
export const SearchingSection = styled.div`
  padding: 0;
`

export const SuggestionItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${(props) => props.theme.colors.hover.primary};
  }
`

export const SuggestionIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: ${(props) => props.theme.colors.text.secondary};
`

export const SuggestionText = styled.p`
  font-size: ${fontSizes.md};
  color: ${(props) => props.theme.colors.text.primary};
  margin: 0;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export const Divider = styled.div`
  height: 1px;
  background-color: ${(props) => props.theme.colors.border.primary};
  margin: 8px 0;
`

export const UserResultItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${(props) => props.theme.colors.hover.primary};
  }
`

export const UserResultInfo = styled.div`
  flex: 1;
  min-width: 0;
`

export const UserResultName = styled.p`
  font-size: ${fontSizes.md};
  font-weight: ${fontWeights.bold};
  color: ${(props) => props.theme.colors.text.primary};
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export const UserResultUsername = styled.p`
  font-size: ${fontSizes.sm};
  color: ${(props) => props.theme.colors.text.secondary};
  margin: 2px 0 0 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export const UserResultBio = styled.p`
  font-size: ${fontSizes.sm};
  color: ${(props) => props.theme.colors.text.primary};
  margin: 4px 0 0 0;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`
