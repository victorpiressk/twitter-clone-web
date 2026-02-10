import styled, { css } from 'styled-components'
import { Link } from 'react-router-dom'
import {
  colors,
  fontSizes,
  fontWeights,
  transitions
} from '../../../styles/globalStyles'
import type { ButtonVariant } from './types'

type StyledButtonProps = {
  $variant: ButtonVariant
  $active?: boolean
  $loading?: boolean
}

// Estilos base compartilhados
const baseStyles = css<StyledButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  padding: 8px 16px;
  border: none;
  cursor: pointer;

  font-size: ${fontSizes.md};
  font-weight: ${fontWeights.medium};

  transition: ${transitions.fast};

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  ${(props) =>
    props.$loading &&
    css`
      cursor: wait;
      position: relative;
    `}
`

// Variantes
const variants = {
  primary: css`
    background-color: ${colors.primary};
    color: ${colors.white};
    border-radius: 9999px;

    &:hover:not(:disabled) {
      background-color: ${colors.primaryHover};
    }
  `,

  secondary: css`
    background-color: ${(props) => props.theme.colors.text.primary};
    color: ${(props) => props.theme.colors.text.reverse};
    border-radius: 9999px;
    text-align: center;
    display: block;

    &:hover:not(:disabled) {
      opacity: 0.9;
    }
  `,

  outline: css<StyledButtonProps>`
    background-color: transparent;
    color: ${(props) => props.theme.colors.text.primary};
    border: 1px solid ${(props) => props.theme.colors.border.secondary};
    border-radius: 9999px;
    font-weight: ${fontWeights.bold};

    &:hover:not(:disabled) {
      background-color: ${(props) => props.theme.colors.hover.secondary};
    }

    ${(props) =>
      props.$active &&
      css`
        color: ${props.theme.colors.text.primary};
        font-weight: ${fontWeights.bold};
        }
      `}
  `,

  ghost: css<StyledButtonProps>`
    background-color: transparent;
    color: ${(props) => props.theme.colors.text.primary};
    border-radius: 9999px;
    padding: 12px;
    font-weight: ${fontWeights.regular};

    &:hover:not(:disabled) {
      background-color: ${(props) => props.theme.colors.hover.secondary};
    }

    ${(props) =>
      props.$active &&
      css`
        color: ${props.theme.colors.text.primary};
        font-weight: ${fontWeights.bold};
        }
      `}
  `,

  tab: css<StyledButtonProps>`
    background-color: transparent;
    color: ${(props) => props.theme.colors.text.secondary};
    border-radius: 0;
    padding: 16px;
    position: relative;
    font-weight: ${fontWeights.medium};

    &:hover:not(:disabled) {
      background-color: ${(props) => props.theme.colors.hover.secondary};
    }

    ${(props) =>
      props.$active &&
      css`
        color: ${props.theme.colors.text.primary};
        font-weight: ${fontWeights.bold};

        &::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 64px;
          height: 4px;
          background-color: ${colors.primary};
          border-radius: 9999px;
        }
      `}
  `,

  danger: css`
    background-color: ${colors.error};
    color: ${colors.white};
    font-weight: ${fontWeights.bold};
    border-radius: 9999px;

    &:hover:not(:disabled) {
      background-color: ${colors.hover.error};
    }
  `
}

// Button (type="button" ou "submit")
export const ButtonContainer = styled.button<StyledButtonProps>`
  ${baseStyles}
  ${({ $variant }) => variants[$variant]}
`

// Link (type="link")
export const ButtonLink = styled(Link)<StyledButtonProps>`
  ${baseStyles}
  ${({ $variant }) => variants[$variant]}
  text-decoration: none;

  &:visited,
  &:active,
  &:focus {
    color: inherit;
    text-decoration: none;
  }
`

export const ButtonContent = styled.span<{ $loading: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;

  ${(props) =>
    props.$loading &&
    css`
      opacity: 0.7;
    `}
`
