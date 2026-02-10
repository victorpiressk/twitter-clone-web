import styled from 'styled-components'
import {
  colors,
  fontSizes,
  fontWeights,
  transitions
} from '../../../../styles/globalStyles'

export const ModalContent = styled.div<{ $step: string }>`
  margin: ${(props) =>
    props.$step === 'identifier' || props.$step === 'signup' ? '0 110px' : '0'};
  padding: ${(props) =>
    props.$step === 'identifier' || props.$step === 'signup'
      ? '20px 32px 48px'
      : '20px 80px'};
`

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 20px;
  margin-bottom: 32px;
`

export const Title = styled.h1`
  font-size: ${fontSizes['2xl']};
  font-weight: ${fontWeights.bold};
  color: ${(props) => props.theme.colors.text.primary};
  margin: 0;
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

export const SocialButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

export const SocialButton = styled.button<{ $provider: 'google' | 'apple' }>`
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background-color: ${(props) => props.theme.colors.background.primary};
  color: ${(props) => props.theme.colors.text.primary};
  border: 1px solid ${(props) => props.theme.colors.border.secondary};
  border-radius: 9999px;
  font-size: ${fontSizes.md};
  font-weight: ${fontWeights.medium};
  cursor: pointer;
  transition: background-color 0.2s;

  img {
    width: 20px;
    height: 20px;
    object-fit: contain;
  }

  &:hover {
    background-color: ${(props) => props.theme.colors.hover.primary};
  }
`

export const Divider = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  &::before,
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background-color: ${(props) => props.theme.colors.border.primary};
  }

  span {
    font-size: ${fontSizes.sm};
    color: ${(props) => props.theme.colors.text.primary};
  }
`

export const Terms = styled.p`
  font-size: ${fontSizes.sm};
  color: ${(props) => props.theme.colors.text.secondary};
  margin: 0 0 40px 0;
  max-width: 300px;
  line-height: 1.4;

  a {
    color: ${colors.primary};
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  @media (max-width: 1024px) {
    max-width: 100%;
  }
`

export const FloatingInputContainer = styled.div`
  position: relative;
  width: 100%;
`

export const FloatingLabel = styled.label<{
  $hasValue: boolean
  $isFocused: boolean
  $disabled?: boolean
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
    if (props.$disabled) return props.theme.colors.text.tertiary
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
  $disabled?: boolean
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
  color: ${(props) =>
    props.$disabled
      ? props.theme.colors.text.tertiary
      : props.theme.colors.text.primary};
  background-color: ${(props) =>
    props.$disabled
      ? props.theme.colors.background.secondary
      : props.theme.colors.background.primary};
  transition: ${transitions.fast};
  outline: none;
  cursor: ${(props) => (props.$disabled ? 'not-allowed' : 'text')};

  &::placeholder {
    color: transparent;
  }

  &:disabled {
    opacity: 0.6;
  }
`

export const InputError = styled.span`
  font-size: ${fontSizes.xs};
  color: ${colors.error};
  margin-top: 4px;
  display: block;
`

export const ForgotPassword = styled.button`
  background: none;
  border: none;
  color: ${colors.primary};
  font-size: ${fontSizes.sm};
  cursor: pointer;
  padding: 0;
  text-align: left;

  &:hover {
    text-decoration: underline;
  }
`

export const SignupText = styled.div`
  display: flex;
  gap: 4px;
  font-size: ${fontSizes.md};
  font-weight: ${fontWeights.regular};
  color: ${(props) => props.theme.colors.text.secondary};

  button {
    background: none;
    border: none;
    color: ${colors.primary};
    font-size: ${fontSizes.md};
    cursor: pointer;
    padding: 0;

    &:hover {
      text-decoration: underline;
    }
  }
`

export const Footer = styled.div`
  padding: 16px 64px;
  max-width: 568px;
  width: 100%;

  > button {
    width: 100%;
    height: 54px;
    font-weight: ${fontWeights.heavy};
    margin-bottom: 16px;
  }
`
