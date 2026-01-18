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

export const SuggestionsList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`

export const SuggestionItem = styled.li`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${(props) => props.theme.colors.hover.primary};
  }
`

export const UserInfo = styled.div`
  flex: 1;
  min-width: 0;
`

export const DisplayName = styled.div`
  font-size: ${fontSizes.md};
  font-weight: ${fontWeights.bold};
  color: ${(props) => props.theme.colors.text.primary};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const Username = styled.div`
  font-size: ${fontSizes.sm};
  color: ${(props) => props.theme.colors.text.secondary};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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
  }

  ${ButtonLink} {
    &:hover {
      background-color: transparent;
    }
  }
`
