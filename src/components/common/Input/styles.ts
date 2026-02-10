import styled from 'styled-components'
import {
  colors,
  fontSizes,
  fontWeights,
  transitions
} from '../../../styles/globalStyles'

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`

export const Label = styled.label`
  font-size: ${fontSizes.sm};
  font-weight: ${fontWeights.medium};
  color: ${(props) => props.theme.colors.text.primary};
`

export const InputWrapper = styled.div`
  position: relative;
`

export const StyledInput = styled.input<{ $hasError?: boolean }>`
  width: 100%;
  padding: 16px;

  font-family: inherit;
  font-size: ${fontSizes.md};
  color: ${(props) => props.theme.colors.text.primary};

  background-color: ${(props) => props.theme.colors.background.primary};
  border: 1px solid
    ${(props) =>
      props.$hasError ? colors.error : props.theme.colors.border.secondary};
  border-radius: 8px;

  transition: ${transitions.fast};

  &:focus {
    outline: none;
    border-color: ${(props) =>
      props.$hasError ? colors.error : props.theme.colors.border.primary};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &::placeholder {
    color: ${(props) => props.theme.colors.text.tertiary};
  }
`

export const ErrorMessage = styled.span`
  font-size: ${fontSizes.sm};
  color: ${colors.error};
`

export const StyledTextarea = styled.textarea<{ $hasError: boolean }>`
  width: 100%;
  padding: 12px;
  font-size: ${fontSizes.md};
  font-family: inherit;
  color: ${(props) => props.theme.colors.text.primary};
  background-color: ${(props) => props.theme.colors.background.primary};
  border: 1px solid
    ${(props) =>
      props.$hasError ? colors.error : props.theme.colors.border.primary};
  border-radius: 4px;
  transition: ${transitions.fast};
  resize: vertical;
  min-height: 80px;

  &:focus {
    outline: none;
    border-color: ${(props) =>
      props.$hasError ? colors.error : colors.primary};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &::placeholder {
    color: ${(props) => props.theme.colors.text.tertiary};
  }
`
