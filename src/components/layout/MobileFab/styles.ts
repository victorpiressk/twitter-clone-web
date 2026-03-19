import styled from 'styled-components'
import { colors } from '../../../styles/globalStyles'

export const FabButton = styled.button`
  display: none;

  @media (max-width: 640px) {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    bottom: 72px;
    right: 16px;
    z-index: 100;
    width: 56px;
    height: 56px;
    border-radius: 9999px;
    border: none;
    cursor: pointer;
    background-color: ${colors.primary};
    color: ${colors.white};
    box-shadow: 0 2px 8px ${(props) => props.theme.colors.shadow.primary};
  }
`
