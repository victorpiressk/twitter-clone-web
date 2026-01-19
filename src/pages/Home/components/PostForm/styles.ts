import styled from 'styled-components'
import { ButtonContainer } from '../../../../components/common/Button/styles'
import { StyledTextarea } from '../../../../components/common/Textarea/styles'
import { colors, fontWeights } from '../../../../styles/globalStyles'

export const PostFormContainer = styled.div`
  display: flex;
  height: 120px;
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

  div {
    padding-left: 2px;
    border-radius: 9999px;

    &:hover {
      background-color: ${colors.hover.primary};
    }
    svg {
      margin-right: 18px;
    }
  }

  ${ButtonContainer} {
    font-weight: ${fontWeights.bold};
  }
`
