import styled from 'styled-components'
import { fontSizes, fontWeights } from '../../../../../styles/globalStyles'

export const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid ${(props) => props.theme.colors.border.primary};
  flex-shrink: 0;
`

export const Title = styled.h2`
  font-size: ${fontSizes.xl};
  font-weight: ${fontWeights.bold};
  color: ${(props) => props.theme.colors.text.primary};
  margin: 0;
`

export const CloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: none;
  background: none;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${(props) => props.theme.colors.hover.secondary};
  }

  svg {
    width: 20px;
    height: 20px;
    fill: ${(props) => props.theme.colors.text.primary};
  }
`
