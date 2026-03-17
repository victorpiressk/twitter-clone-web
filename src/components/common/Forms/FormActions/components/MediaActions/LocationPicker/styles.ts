import styled from 'styled-components'
import {
  fontSizes,
  transitions,
  colors,
  fontWeights
} from '../../../../../../../styles/globalStyles'

export const LocationPickerContainer = styled.div`
  width: 350px;
  max-height: 400px;
  background-color: ${(props) => props.theme.colors.background.primary};
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`

export const SearchInput = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: none;
  border-bottom: 1px solid ${(props) => props.theme.colors.border.primary};
  background-color: ${(props) => props.theme.colors.background.primary};
  color: ${(props) => props.theme.colors.text.primary};
  font-size: ${fontSizes.md};
  outline: none;

  &::placeholder {
    color: ${(props) => props.theme.colors.text.secondary};
  }

  &:focus {
    border-bottom-color: ${colors.primary};
  }
`

export const LocationList = styled.div`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;

  /* Scrollbar customizado */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: ${(props) => props.theme.colors.background.secondary};
  }

  &::-webkit-scrollbar-thumb {
    background: ${(props) => props.theme.colors.border.primary};
    border-radius: 4px;

    &:hover {
      background: ${(props) => props.theme.colors.text.secondary};
    }
  }
`

export const LocationItem = styled.button`
  width: 100%;
  padding: 12px 16px;
  background: none;
  border: none;
  text-align: left;
  cursor: pointer;
  transition: background-color ${transitions.normal};
  color: ${(props) => props.theme.colors.text.primary};
  font-size: ${fontSizes.md};

  &:hover {
    background-color: ${(props) => props.theme.colors.hover.primary};
  }

  &:active {
    background-color: ${(props) => props.theme.colors.background.secondary};
  }
`

export const EmptyState = styled.div`
  padding: 32px 16px;
  text-align: center;
  color: ${(props) => props.theme.colors.text.secondary};
  font-size: ${fontSizes.md};
`

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid ${(props) => props.theme.colors.border.primary};
`

export const Title = styled.h3`
  font-size: ${fontSizes.lg};
  font-weight: ${fontWeights.bold};
  color: ${(props) => props.theme.colors.text.primary};
  margin: 0;
`

export const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.colors.text.secondary};
  transition: all 0.2s;

  &:hover {
    color: ${(props) => props.theme.colors.text.primary};
    background-color: ${(props) => props.theme.colors.hover.primary};
    border-radius: 50%;
  }

  svg {
    width: 20px;
    height: 20px;
  }
`

export const DisabledMessage = styled.div`
  padding: 32px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 12px;
`

export const DisabledTitle = styled.h3`
  font-size: ${fontSizes.lg};
  font-weight: ${fontWeights.bold};
  color: ${(props) => props.theme.colors.text.primary};
  margin: 0;
`

export const DisabledText = styled.p`
  font-size: ${fontSizes.md};
  color: ${(props) => props.theme.colors.text.secondary};
  line-height: 1.5;
  margin: 0;
  max-width: 400px;
`
