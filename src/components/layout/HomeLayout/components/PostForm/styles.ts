import styled from 'styled-components'
import { ButtonContainer } from '../../../../common/Button/styles'

export const PostFormContainer = styled.div`
  display: flex;
  gap: 12px;
  padding: 12px 16px 10px;
  border-bottom: 1px solid ${(props) => props.theme.colors.border.primary};
`

export const PostFormContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
`

export const PostFormActions = styled.div`
  display: flex;
  justify-content: flex-end;

  ${ButtonContainer} {
    padding: 10px 16px;
  }
`
