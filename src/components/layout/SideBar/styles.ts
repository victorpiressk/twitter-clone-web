import styled, { css } from 'styled-components'
import {
  breakpoints,
  fontSizes,
  fontWeights
} from '../../../styles/globalStyles'
import { ButtonLink, ButtonContainer } from '../../common/Button/styles'
import type { ButtonVariant } from '../../common/Button/types'

// Definimos as variações de estilo
const ITEM_VARIANTS = {
  default: css`
    width: 100%;
    padding: 16px;
    font-size: ${fontSizes.xl};
  `,
  profile: css`
    width: 300px;
    padding: 12px;
    font-size: ${fontSizes.md};
  `
}

type SideButtonProps = {
  variant: ButtonVariant
}

interface PopoverItemProps {
  $variant?: keyof typeof ITEM_VARIANTS
}

export const Aside = styled.aside`
  position: fixed;
  top: 0;
  width: 275px;
  height: 100vh;
  overflow-y: auto;

  padding: 0 16px 0 8px;
  display: flex;
  flex-direction: column;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: ${(props) => props.theme.colors.border.primary};
    border-radius: 3px;

    &:hover {
      background: ${(props) => props.theme.colors.border.secondary};
    }
  }

  @media (max-width: ${breakpoints.tablet}) {
    width: 50px;
  }
`

export const Nav = styled.nav`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-bottom: 16px;
`

export const NavList = styled.ul`
  display: flex;
  flex-direction: column;

  li:last-child {
    margin-top: 16px;
  }

  ${ButtonLink} {
    padding: 12px;
    font-size: ${fontSizes.xl};
    justify-content: flex-start;
    gap: 20px;
    text-decoration: none;
  }
`

export const Logo = styled.button`
  padding: 12px;
  font-size: 28px;
  font-weight: ${fontWeights.bold};
  background: none;
  border: none;
  cursor: pointer;
  color: ${(props) => props.theme.colors.text.primary};
  transition: background-color 0.2s;
  border-radius: 9999px;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: ${(props) => props.theme.colors.hover.background};
  }
`

export const SideButton = styled(ButtonContainer)<SideButtonProps>`
  ${({ variant }) => css`
    width: ${variant === 'secondary' ? '220px' : 'auto'};
    padding: ${variant === 'secondary' ? '16px' : '12px'};
    font-size: ${variant === 'secondary' ? fontSizes.lg : fontSizes.xl};
    justify-content: ${variant === 'secondary' ? 'center' : 'flex-start'};
  `}
`

export const UserNames = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`

export const DisplayName = styled.h1`
  font-size: ${fontSizes.sm};
  font-weight: ${fontWeights.bold};
  color: ${(props) => props.theme.colors.text.primary};
  margin: 0;
`

export const Username = styled.p`
  font-size: ${fontSizes.sm};
  color: ${(props) => props.theme.colors.text.secondary};
  margin: 4px 0 0 0;
  text-align: start;
`

export const PopoverItem = styled.button<PopoverItemProps>`
  display: flex;
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
  font-weight: ${fontWeights.bold};
  color: ${(props) => props.theme.colors.text.primary};
  text-align: left;
  transition: background-color 0.2s;

  /* Aplica a variante (se não passar nada, usa 'default') */
  ${({ $variant }) => ITEM_VARIANTS[$variant || 'default']}

  &:hover {
    background-color: ${(props) => props.theme.colors.hover.background};
  }
`
