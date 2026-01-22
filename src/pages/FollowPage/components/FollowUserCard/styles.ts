import styled from 'styled-components'
import {
  fontSizes,
  fontWeights,
  transitions
} from '../../../../styles/globalStyles'

export const CardContainer = styled.div`
  display: flex;
  gap: 12px;
  padding: 12px 16px;
  border-bottom: 1px solid ${(props) => props.theme.colors.border.primary};
  cursor: pointer;
  transition: ${transitions.fast};

  &:hover {
    background-color: ${(props) => props.theme.colors.hover.primary};
  }
`

export const UserInfo = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
`

export const UserNames = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
`

export const DisplayName = styled.span`
  font-size: ${fontSizes.md};
  font-weight: ${fontWeights.bold};
  color: ${(props) => props.theme.colors.text.primary};

  &:hover {
    text-decoration: underline;
  }
`

export const Username = styled.span`
  font-size: ${fontSizes.md};
  color: ${(props) => props.theme.colors.text.secondary};
`

export const Bio = styled.p`
  font-size: ${fontSizes.md};
  color: ${(props) => props.theme.colors.text.primary};
  margin: 4px 0 0 0;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`

export const ActionButton = styled.div`
  flex-shrink: 0;
`
