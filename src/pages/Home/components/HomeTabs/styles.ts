import styled from 'styled-components'
import { ButtonContainer } from '../../../../components/common/Button/styles'

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid ${(props) => props.theme.colors.border.primary};

  position: sticky;
  top: 0;
  z-index: 10;

  background-color: ${(props) => props.theme.colors.background.blur};
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);

  ${ButtonContainer} {
    padding-top: 16px;
    width: 100%;
    height: 53px;
    max-width: 300px;
  }
`
