import styled from 'styled-components'
import { ButtonContainer } from '../../../../components/common/Button/styles'

export const TabsContainer = styled.div`
  display: flex;

  ${ButtonContainer} {
    padding-top: 16px;
    width: 100%;
    height: 53px;
    max-width: 300px;

    &:hover {
      background-color: transparent;
    }
  }
`
