import styled from 'styled-components'
import {
  colors,
  fontSizes,
  transitions
} from '../../../../../styles/globalStyles'
import { light } from '../../../../../styles/themes/light'

export const SearchBarContainer = styled.div`
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: ${(props) => props.theme.colors.background.primary};
  padding: 6px 0 16px 0;
`

export const SearchForm = styled.form`
  position: relative;
  display: flex;
  align-items: center;
  background-color: ${(props) => props.theme.colors.background.primary};
  border: 1px solid ${(props) => props.theme.colors.border.secondary};
  border-radius: 9999px;
  padding: 12px 16px;
  transition: ${transitions.fast};

  &:focus-within {
    background-color: transparent;
    outline: 1px solid ${colors.primary};
  }
`

export const SearchIcon = styled.div`
  width: 20px;
  height: 20px;
  margin-right: 4px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 100%;
    height: 100%;
    fill: ${(props) => props.theme.colors.text.secondary};
  }
`

export const SearchInput = styled.input`
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  font-size: ${fontSizes.sm};
  color: ${(props) => props.theme.colors.text.primary};

  &::placeholder {
    color: ${(props) => props.theme.colors.text.secondary};
  }
`

export const ClearButton = styled.button`
  width: 20px;
  height: 20px;
  padding: 0;
  margin-left: 8px;
  background: ${(props) =>
    props.theme === light ? colors.black : colors.white};
  border: none;
  border-radius: 50%;
  cursor: pointer;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: ${transitions.fast};

  svg {
    width: 12px;
    height: 12px;
    fill: ${(props) => props.theme.colors.background.primary};
  }

  &:hover {
    background: ${(props) => props.theme.colors.hover.background};
  }
`
