import styled from 'styled-components'
import { colors, transitions } from '../../../styles/globalStyles'
import { light } from '../../../styles/themes/light'

export type SearchFormProps = {
  $variant?: string
}

export const SearchBarContainer = styled.div`
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: ${(props) => props.theme.colors.background.primary};
  padding-top: 4px;

  flex: 1;
  width: 100%;
`

export const SearchForm = styled.form<SearchFormProps>`
  position: relative;
  display: flex;
  align-items: center;
  background-color: ${(props) => props.theme.colors.background.primary};
  border: 1px solid ${(props) => props.theme.colors.border.secondary};
  border-radius: 9999px;
  padding: 11px 10px;
  transition: ${transitions.fast};

  width: ${(props) => (props.$variant === 'large' ? '100%' : '350px')};

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
    stroke: ${(props) => props.theme.colors.text.tertiary};
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
    stroke: ${(props) => props.theme.colors.background.primary};
  }
`
