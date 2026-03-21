import styled, { css } from 'styled-components'
import {
  breakpoints,
  colors,
  fontSizes,
  fontWeights,
  pageContainer414,
  transitions
} from '../../styles/globalStyles'

export const SettingsContainer = styled.div<{ $hidden?: boolean }>`
  ${pageContainer414}

  @media (max-width: ${breakpoints.desktop}) {
    max-width: 100%;
    ${(props) =>
      props.$hidden &&
      css`
        display: none;
      `}
  }
`

export const NavList = styled.ul`
  padding: 8px 0;
`

export const NavItem = styled.li<{ $active: boolean }>`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  cursor: pointer;
  font-size: ${fontSizes.md};
  font-weight: ${(props) =>
    props.$active ? fontWeights.bold : fontWeights.regular};
  color: ${(props) =>
    props.$active
      ? props.theme.colors.text.primary
      : props.theme.colors.text.secondary};
  background-color: ${(props) =>
    props.$active ? props.theme.colors.hover.primary : 'transparent'};
  border-right: ${(props) =>
    props.$active
      ? `2px solid ${props.theme.colors.border.primary}`
      : '2px solid transparent'};
  transition: background-color 150ms ease-in-out;

  &:hover {
    background-color: ${(props) => props.theme.colors.hover.primary};
  }
`

export const NavItemIcon = styled.span`
  display: flex;
  align-items: center;
  color: ${(props) => props.theme.colors.text.secondary};
`

export const ContentPanel = styled.div<{ $visible?: boolean }>`
  flex: 1;
  padding: 0 24px;
  min-width: 0;

  @media (max-width: ${breakpoints.wide}) {
    ${(props) =>
      !props.$visible &&
      css`
        display: none;
      `}
    padding: 0;
    width: 100%;
  }
`

export const ContentDescription = styled.p`
  font-size: ${fontSizes.sm};
  color: ${(props) => props.theme.colors.text.secondary};
  margin: 8px 16px 0;
`

export const FormContainer = styled.div`
  margin: 8px 16px 0;
`

export const FormGroup = styled.div`
  margin-bottom: 24px;
`

export const Label = styled.label`
  display: block;
  font-size: ${fontSizes.sm};
  font-weight: ${fontWeights.medium};
  color: ${(props) => props.theme.colors.text.secondary};
  margin-bottom: 8px;
`

export const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  font-size: ${fontSizes.md};
  color: ${(props) => props.theme.colors.text.primary};
  background-color: ${(props) => props.theme.colors.background.primary};
  border: 1px solid ${(props) => props.theme.colors.border.primary};
  border-radius: 4px;
  outline: none;
  transition: border-color 150ms ease-in-out;

  &:focus {
    border-color: ${(props) => props.theme.colors.border.primary};
  }

  &::placeholder {
    color: ${(props) => props.theme.colors.text.secondary};
  }
`

export const ErrorText = styled.span`
  display: block;
  font-size: ${fontSizes.xs};
  color: ${colors.error};
  margin-top: 4px;
`

export const SuccessText = styled.span`
  display: block;
  font-size: ${fontSizes.xs};
  color: ${colors.success};
  margin-top: 4px;
`

export const SaveButton = styled.button`
  padding: 10px 24px;
  font-size: ${fontSizes.md};
  font-weight: ${fontWeights.bold};
  color: ${(props) => props.theme.colors.text.reverse};
  background-color: ${(props) => props.theme.colors.background.primary};
  border: none;
  border-radius: 9999px;
  cursor: pointer;
  transition: ${transitions.fast};

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

export const ThemeToggleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 0;
  border-bottom: 1px solid ${(props) => props.theme.colors.border.primary};
`

export const ThemeToggleLabel = styled.span`
  font-size: ${fontSizes.md};
  color: ${(props) => props.theme.colors.text.primary};
`

export const Divider = styled.div`
  height: 1px;
  background-color: ${(props) => props.theme.colors.border.primary};
  margin: 24px 0;
`

export const InputRadio = styled.input`
  accent-color: ${colors.primary};
`
