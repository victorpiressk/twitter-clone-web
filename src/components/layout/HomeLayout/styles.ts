import styled from 'styled-components'
import { ButtonContainer } from '../../common/Button/styles'

export const HomeContainer = styled.div`
  border-left: 1px solid ${(props) => props.theme.colors.border.primary};
  border-right: 1px solid ${(props) => props.theme.colors.border.primary};
`

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid ${(props) => props.theme.colors.border.primary};

  position: sticky;
  top: 0;
  background-color: ${(props) => props.theme.colors.background.primary};
  z-index: 10;

  ${ButtonContainer} {
    padding-top: 18px;
    width: 100%;
    max-width: 300px;
  }
`
