import styled from 'styled-components'
import { ActionsContainer } from '../../../../common/PostForm/components/PostFormActions/styles'

export const ModalContent = styled.div`
  width: 100%;
  max-width: 600px;
`

export const FooterContainer = styled.div`
  width: 568px;

  ${ActionsContainer} {
    margin-top: 0;
  }
`
