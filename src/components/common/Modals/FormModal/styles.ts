import styled from 'styled-components'
import { ActionsContainer } from '../../Forms/FormActions/styles'

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-height: 90vh;
  overflow: hidden;
`

export const FormContainer = styled.div`
  flex: 1;
`

export const FooterContainer = styled.div`
  width: 568px;

  ${ActionsContainer} {
    margin-top: 0;
  }
`
