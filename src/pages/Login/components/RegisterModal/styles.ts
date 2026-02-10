import styled from 'styled-components'
import {
  colors,
  fontSizes,
  fontWeights,
  transitions
} from '../../../../styles/globalStyles'

export const ModalContent = styled.div`
  padding: 20px 80px;
`

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 20px;
  margin-bottom: 32px;
`

export const Title = styled.h1`
  font-size: ${fontSizes['3xl']};
  font-weight: ${fontWeights.bold};
  color: ${(props) => props.theme.colors.text.primary};
  margin: 0;
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

export const FloatingInputContainer = styled.div`
  position: relative;
  width: 100%;
`

export const FloatingLabel = styled.label<{
  $hasValue: boolean
  $isFocused: boolean
}>`
  position: absolute;
  left: 12px;
  top: ${(props) => (props.$hasValue || props.$isFocused ? '8px' : '50%')};
  transform: translateY(
    ${(props) => (props.$hasValue || props.$isFocused ? '0' : '-50%')}
  );
  font-size: ${(props) =>
    props.$hasValue || props.$isFocused ? fontSizes.xs : fontSizes.md};
  color: ${(props) => {
    if (props.$isFocused) return colors.primary
    return props.theme.colors.text.secondary
  }};
  pointer-events: none;
  transition: ${transitions.fast};
  background-color: ${(props) => props.theme.colors.background.primary};
  padding: 0 4px;
`

export const FloatingInput = styled.input<{
  $hasValue: boolean
  $isFocused: boolean
  $hasError: boolean
}>`
  width: 100%;
  min-height: 54px;
  padding: ${(props) =>
    props.$hasValue || props.$isFocused ? '20px 12px 8px 12px' : '16px 12px'};
  border: 1px solid
    ${(props) => {
      if (props.$hasError) return colors.error
      if (props.$isFocused) return colors.primary
      return props.theme.colors.border.secondary
    }};
  border-radius: 4px;
  font-size: ${fontSizes.md};
  color: ${(props) => props.theme.colors.text.primary};
  background-color: ${(props) => props.theme.colors.background.primary};
  transition: ${transitions.fast};
  outline: none;

  &::placeholder {
    color: transparent;
  }
`

export const InputError = styled.span`
  font-size: ${fontSizes.xs};
  color: ${colors.error};
  margin-top: 4px;
  display: block;
`

export const ToggleButton = styled.button`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: ${colors.primary};
  font-size: ${fontSizes.sm};
  font-weight: ${fontWeights.medium};
  cursor: pointer;
  padding: 4px 8px;

  &:hover {
    text-decoration: underline;
  }
`

export const Footer = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  padding: 16px 64px;
  max-width: 568px;
  width: 100%;

  button {
    width: 100%;
    height: 54px;
    font-weight: ${fontWeights.heavy};
  }
`
