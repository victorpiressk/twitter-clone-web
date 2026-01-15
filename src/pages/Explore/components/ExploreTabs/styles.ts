import styled from 'styled-components'
import { ButtonContainer } from '../../../../components/common/Button/styles'

export const TabsContainer = styled.div`
  display: flex;
  border-bottom: 1px solid ${(props) => props.theme.colors.border.primary};
  overflow-x: auto;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  ${ButtonContainer} {
    flex-shrink: 0;
    min-width: 100px;
  }
`
