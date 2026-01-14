import styled from 'styled-components'
import { breakpoints, fontSizes } from '../../../styles/globalStyles'
import { ButtonLink, ButtonContainer } from '../../common/Button/styles'

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
`

export const NavList = styled.ul`
  display: flex;
  flex-direction: column;

  li:last-child {
    margin-top: 16px; // Espaço antes do botão "Postar"
  }

  ${ButtonLink} {
    padding: 12px;
    font-size: ${fontSizes.xl};
    justify-content: flex-start;
    gap: 20px;
    text-decoration: none;
  }

  ${ButtonContainer} {
    width: 220px;
    padding: 16px;
    font-size: ${fontSizes.lg};
  }
`
