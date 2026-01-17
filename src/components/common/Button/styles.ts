import styled, { css } from 'styled-components'
import { Link } from 'react-router-dom'
import { colors, fontWeights, transitions } from '../../../styles/globalStyles'
import type { ButtonVariant } from './types'

type StyledButtonProps = {
  variant: ButtonVariant
  $active?: boolean
}

// Estilos base compartilhados
const baseStyles = css<StyledButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 12px;

  padding: 12px 24px;
  border: none;
  cursor: pointer;

  font-size: 15px;
  font-weight: 700;

  transition: ${transitions.fast};

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
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
      background-color: ${(props) => props.theme.colors.hover.background};
    }

    ${(props) =>
      props.$active &&
      css`
        color: ${props.theme.colors.text.primary};
        font-weight: ${fontWeights.semibold};
        }
      `}
  `,

  ghost: css<StyledButtonProps>`
    background-color: transparent;
    color: ${(props) => props.theme.colors.text.primary};
    border-radius: 9999px;
    padding: 12px 16px;
    font-weight: ${fontWeights.regular};

    &:hover:not(:disabled) {
      background-color: ${(props) => props.theme.colors.hover.background};
    }

    ${(props) =>
      props.$active &&
      css`
        color: ${props.theme.colors.text.primary};
        font-weight: ${fontWeights.semibold};
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
      background-color: ${(props) => props.theme.colors.hover.background};
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
          width: 56px;
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
  ${(props) => variants[props.variant]}
`

// Link (type="link")
export const ButtonLink = styled(Link)<StyledButtonProps>`
  ${baseStyles}
  ${({ variant }) => variants[variant]}
  text-decoration: none;

  &:visited,
  &:active,
  &:focus {
    color: inherit;
    text-decoration: none;
  }
`
