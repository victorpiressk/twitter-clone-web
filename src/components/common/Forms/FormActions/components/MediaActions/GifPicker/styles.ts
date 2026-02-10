import styled from 'styled-components'
import { colors, fontSizes } from '../../../../../../../styles/globalStyles'

export const GifPickerContainer = styled.div`
  width: 400px;
  max-height: 500px;
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

export const GifGridWrapper = styled.div`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 8px;

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
