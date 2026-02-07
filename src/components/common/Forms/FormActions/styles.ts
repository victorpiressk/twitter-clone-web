import styled from 'styled-components'
import { colors, transitions } from '../../../../styles/globalStyles'
import { ButtonContainer } from '../../Button/styles'

export const ActionsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
`

export const MediaIcons = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  width: 100%;
`
export const ActionGroup = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;

  ${ButtonContainer} {
    margin-left: 12px;
  }
`

export const IconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: none;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  color: ${colors.primary};
  transition: ${transitions.fast};

  &:hover {
    background-color: ${colors.hover.primary};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  svg {
    stroke: currentColor;
  }
`
