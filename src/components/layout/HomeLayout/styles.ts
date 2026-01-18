import styled from 'styled-components'
import { ButtonContainer } from '../../common/Button/styles'

export const HomeContainer = styled.div`
  border-right: 1px solid ${(props) => props.theme.colors.border.primary};
  min-height: 100vh;
  width: 600px;
  flex-shrink: 0;
`

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid ${(props) => props.theme.colors.border.primary};

  position: sticky;
  top: 0;
  z-index: 10;

  background-color: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);

  ${ButtonContainer} {
    padding-top: 16px;
    width: 100%;
    height: 53px;
    max-width: 300px;
  }
`
