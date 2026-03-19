import styled from 'styled-components'

export const HeaderContainer = styled.header`
  display: none;

  @media (max-width: 640px) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    height: 56px;
    padding: 0 16px;
    background-color: ${(props) => props.theme.colors.background.primary};
    border-bottom: 1px solid ${(props) => props.theme.colors.border.primary};
  }
`

export const AvatarButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
`

export const LogoButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${(props) => props.theme.colors.text.primary};
  display: flex;
  align-items: center;
  justify-content: center;
`

export const RightPlaceholder = styled.div`
  width: 32px;
`
