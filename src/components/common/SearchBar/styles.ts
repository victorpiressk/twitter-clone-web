import styled from 'styled-components'
import { colors, transitions } from '../../../styles/globalStyles'
import { light } from '../../../styles/themes/light'

export const SearchBarContainer = styled.div`
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: ${(props) => props.theme.colors.background.primary};
  padding-top: 4px;
`

export const SearchForm = styled.form`
  position: relative;
  display: flex;
  align-items: center;
  background-color: ${(props) => props.theme.colors.background.primary};
  border: 1px solid ${(props) => props.theme.colors.border.secondary};
  border-radius: 9999px;
  padding: 11px 10px;
  transition: ${transitions.fast};

  &:focus-within {
    background-color: transparent;
    outline: 1px solid ${colors.primary};
  }
`

export const SearchIcon = styled.div`
  width: 20px;
  height: 20px;
  margin-right: 3px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 16px;
    height: 16px;
    fill: ${(props) => props.theme.colors.text.tertiary};
  }
`

export const SearchInput = styled.input`
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  font-size: 14px;
  color: ${(props) => props.theme.colors.text.tertiary};

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
    fill: ${(props) => props.theme.colors.text.secondary};
  }
`
