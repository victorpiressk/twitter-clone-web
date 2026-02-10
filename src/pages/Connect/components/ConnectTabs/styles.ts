import styled from 'styled-components'
import { ButtonContainer } from '../../../../components/common/Button/styles'

export const TabsContainer = styled.div`
  display: flex;
  border-bottom: 1px solid ${(props) => props.theme.colors.border.primary};
  margin-bottom: 8px;

  ${ButtonContainer} {
    flex: 1;
    height: 53px;
  }
`
