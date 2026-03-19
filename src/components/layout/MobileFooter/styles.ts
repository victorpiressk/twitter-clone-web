import styled from 'styled-components'
import { colors } from '../../../styles/globalStyles'

export const FooterContainer = styled.nav`
  display: none;

  @media (max-width: 640px) {
    display: flex;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 100;
    background-color: ${(props) => props.theme.colors.background.blur};
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-top: 1px solid ${(props) => props.theme.colors.border.primary};
    height: 56px;
  }
`

export const FooterItem = styled.button<{ $active: boolean }>`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor: pointer;
  color: ${(props) =>
    props.$active
      ? props.theme.colors.text.primary
      : props.theme.colors.text.secondary};
`

export const IconWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Badge = styled.span`
  position: absolute;
  top: -4px;
  right: -8px;
  background: ${colors.primary};
  color: ${colors.white};
  border-radius: 10px;
  padding: 2px 6px;
  font-size: 11px;
  font-weight: 700;
  line-height: 1;
  min-width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
`
