import styled from 'styled-components'
import { ButtonContainer } from '../../../../components/common/Button/styles'
import { StyledTextarea } from '../../../../components/common/Textarea/styles'
import {
  colors,
  fontWeights,
  transitions
} from '../../../../styles/globalStyles'

export const PostFormContainer = styled.div`
  display: flex;
  min-height: 120px;
  gap: 10px;
  padding: 16px 16px 8px;
  border-bottom: 2px solid ${(props) => props.theme.colors.border.primary};
`

export const PostFormContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;

  ${StyledTextarea} {
    padding-top: 6px;
  }
`

export const PostFormActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;

  ${ButtonContainer} {
    font-weight: ${fontWeights.bold};
  }
`

export const MediaIcons = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
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
    background-color: rgba(29, 155, 240, 0.1);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  svg {
    stroke: currentColor;
  }
`
