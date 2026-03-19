import styled, { css } from 'styled-components'
import { fontSizes, fontWeights } from '../../../styles/globalStyles'

export const truncate = css`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const Overlay = styled.div<{ $isOpen: boolean }>`
  display: none;

  @media (max-width: 640px) {
    display: ${(props) => (props.$isOpen ? 'block' : 'none')};
    position: fixed;
    inset: 0;
    z-index: 200;
    background-color: ${(props) => props.theme.colors.background.modalBlur};
  }
`

export const DrawerContainer = styled.div<{ $isOpen: boolean }>`
  display: none;

  @media (max-width: 640px) {
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    z-index: 201;
    width: 280px;
    background-color: ${(props) => props.theme.colors.background.primary};
    transform: translateX(${(props) => (props.$isOpen ? '0' : '-100%')});
    transition: transform 300ms ease-in-out;
    overflow-y: auto;
    padding-bottom: 24px;
  }
`

export const DrawerHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 12px 16px;
`

export const UserInfo = styled.div`
  padding: 12px 16px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.colors.hover.primary};
  }
`

export const UserNames = styled.div`
  display: flex;
  flex-direction: column;
`

export const DisplayName = styled.span`
  font-size: ${fontSizes.md};
  font-weight: ${fontWeights.bold};
  color: ${(props) => props.theme.colors.text.primary};
`

export const Username = styled.span`
  font-size: ${fontSizes.sm};
  color: ${(props) => props.theme.colors.text.secondary};
`

export const StatsContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 12px;
`

export const StatItem = styled.button`
  display: flex;
  gap: 4px;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  font-size: ${fontSizes.sm};
  color: ${(props) => props.theme.colors.text.secondary};

  &:hover {
    text-decoration: underline;
  }
`

export const StatNumber = styled.span`
  font-weight: ${fontWeights.bold};
  color: ${(props) => props.theme.colors.text.primary};
`

export const StatLabel = styled.span`
  color: ${(props) => props.theme.colors.text.secondary};
`

export const NavItem = styled.button`
  display: flex;
  align-items: center;
  gap: 16px;
  width: 100%;
  padding: 14px 16px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: ${fontSizes.lg};
  font-weight: ${fontWeights.bold};
  color: ${(props) => props.theme.colors.text.primary};
  text-align: left;

  &:hover {
    background-color: ${(props) => props.theme.colors.hover.primary};
  }

  span {
    ${truncate}
    min-width: 0;
    flex: 1;
  }
`

export const Divider = styled.div`
  height: 1px;
  background-color: ${(props) => props.theme.colors.border.primary};
  margin: 4px 0;
`

export const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  gap: 16px;
  width: 100%;
  padding: 14px 16px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: ${fontSizes.lg};
  font-weight: ${fontWeights.bold};
  color: ${(props) => props.theme.colors.text.primary};
  text-align: left;

  &:hover {
    background-color: ${(props) => props.theme.colors.hover.primary};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`
