import styled from 'styled-components'
import { ButtonContainer } from '../../../../components/common/Button/styles'

export const TabsContainer = styled.div`
  display: flex;
  border-bottom: 1px solid ${(props) => props.theme.colors.border.primary};

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
