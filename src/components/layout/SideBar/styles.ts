import styled, { css } from 'styled-components'
import { fontSizes, fontWeights } from '../../../styles/globalStyles'
import { ButtonLink, ButtonContainer } from '../../common/Button/styles'
import type { ButtonVariant } from '../../common/Button/types'
import { light } from '../../../styles/themes/light'

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
  $variant: ButtonVariant
}

interface PopoverItemProps {
  $variant?: keyof typeof ITEM_VARIANTS
}

export const Aside = styled.aside`
  position: fixed;
  top: 0;
  width: 275px;
  height: 100vh;

  padding: 0 8px 0 8px;
  display: flex;
  flex-direction: column;
  border-right: 1px solid ${(props) => props.theme.colors.border.primary};

  overflow-y: auto;
  overscroll-behavior-y: none;
  color-scheme: ${(props) => (props.theme === light ? 'light' : 'dark')};

  @media (max-width: 1280px) {
    width: 88px;
  }
`

export const Nav = styled.nav`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-bottom: 12px;
`

export const NavList = styled.ul`
  display: flex;
  flex-direction: column;

  li:last-child {
    margin-top: 4px;
  }

  ${ButtonLink} {
    height: 50.25px;
    padding: 12px;
    font-size: ${fontSizes.xl};
    justify-content: flex-start;
    text-decoration: none;

    span {
      margin: 0 16px 0 20px;
    }
  }

  @media (max-width: 1280px) {
    li {
      display: flex;
      justify-content: center;
    }

    span {
      display: none;
    }
  }
`

export const Logo = styled.button`
  padding: 12px;
  margin-top: 2px;
  margin-bottom: 7px;
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
    background-color: ${(props) => props.theme.colors.hover.secondary};
  }
`

export const SideButton = styled(ButtonContainer)<SideButtonProps>`
  ${({ $variant }) => css`
    margin: ${$variant === 'secondary' ? '4px 0' : '0'};
    width: ${$variant === 'secondary' ? '220px' : 'auto'};
    padding: ${$variant === 'secondary' ? '16px' : '12px'};
    font-size: ${$variant === 'secondary' ? fontSizes.lg : fontSizes.xl};
    justify-content: ${$variant === 'secondary' ? 'center' : 'space-between'};

    span {
      margin: 0 16px 0 20px;
    }

    @media (max-width: 1280px) {
      span {
        display: none;
      }
    }
  `}
`

export const FooterButton = styled(ButtonContainer)`
  justify-content: space-between;
  margin-top: 12px;

  @media (max-width: 1280px) {
    justify-content: center;
  }
`

export const UserNames = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  padding: 0 11px;

  @media (max-width: 1280px) {
    display: none;
  }
`

export const DisplayName = styled.span`
  font-size: ${fontSizes.md};
  font-weight: ${fontWeights.bold};
  color: ${(props) => props.theme.colors.text.primary};
  text-align: start;
  width: 105.38px;
`

export const Username = styled.p`
  font-size: ${fontSizes.md};
  color: ${(props) => props.theme.colors.text.secondary};
  text-align: start;
  margin-top: 4px;
`
export const MoreIcon = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;

  @media (max-width: 1280px) {
    display: none;
  }
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
    background-color: ${(props) => props.theme.colors.hover.primary};
  }
`
