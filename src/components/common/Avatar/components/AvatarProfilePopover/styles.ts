import styled from 'styled-components'
import {
  fontSizes,
  fontWeights,
  transitions
} from '../../../../../styles/globalStyles'

export const PopoverContainer = styled.div`
  width: 300px;
  background-color: ${(props) => props.theme.colors.background.primary};
  border-radius: 16px;
  box-shadow: 0px 0px 8px 1px ${(props) => props.theme.colors.shadow.primary};
  padding: 16px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 12px;
`

export const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1;
  min-width: 0;
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
  margin: 0;
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`

export const Stats = styled.div`
  display: flex;
  gap: 16px;
  justify-content: start;
`

export const StatItem = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  font-size: ${fontSizes.md};
  color: ${(props) => props.theme.colors.text.secondary};
  transition: ${transitions.fast};

  &:hover {
    text-decoration: underline;
  }
`

export const StatNumber = styled.span`
  font-weight: ${fontWeights.bold};
  color: ${(props) => props.theme.colors.text.primary};
  margin-right: 4px;
`
