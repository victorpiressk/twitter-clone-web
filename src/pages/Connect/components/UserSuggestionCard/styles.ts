import styled from 'styled-components'
import { fontSizes, fontWeights } from '../../../../styles/globalStyles'

export const CardContainer = styled.div`
  display: flex;
  gap: 12px;
  padding: 12px 16px;
  border-bottom: 1px solid ${(props) => props.theme.colors.border.primary};
  transition: background-color 0.2s;

  &:hover {
    background-color: ${(props) => props.theme.colors.hover.primary};
  }
`

export const AvatarWrapper = styled.div`
  flex-shrink: 0;
  cursor: pointer;
`

export const UserInfo = styled.div`
  flex: 1;
  min-width: 0;
  cursor: pointer;
`

export const DisplayName = styled.h3`
  font-size: ${fontSizes.md};
  font-weight: ${fontWeights.heavy};
  color: ${(props) => props.theme.colors.text.primary};
  margin: 0;

  &:hover {
    text-decoration: underline;
  }
`

export const Username = styled.p`
  font-size: ${fontSizes.md};
  color: ${(props) => props.theme.colors.text.secondary};
`

export const Bio = styled.p`
  font-size: ${fontSizes.md};
  color: ${(props) => props.theme.colors.text.primary};
  line-height: 1.4;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`

export const ButtonWrapper = styled.div`
  flex-shrink: 0;
  align-self: flex-start;
`
