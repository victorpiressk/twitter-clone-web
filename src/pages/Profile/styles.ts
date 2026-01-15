import styled from 'styled-components'
import { fontSizes, fontWeights } from '../../styles/globalStyles'

export const ProfileContainer = styled.div`
  border-right: 1px solid ${(props) => props.theme.colors.border.primary};
  min-height: 100vh;
`

export const ProfileHeader = styled.div`
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: ${(props) => props.theme.colors.background.primary};
  backdrop-filter: blur(12px);
  border-bottom: 1px solid ${(props) => props.theme.colors.border.primary};
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 32px;
`

export const BackButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: none;
  background: none;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${(props) => props.theme.colors.hover.background};
  }

  svg {
    width: 20px;
    height: 20px;
    fill: ${(props) => props.theme.colors.text.primary};
  }
`

export const HeaderInfo = styled.div``

export const HeaderTitle = styled.h2`
  font-size: ${fontSizes.xl};
  font-weight: ${fontWeights.bold};
  color: ${(props) => props.theme.colors.text.primary};
  margin: 0;
`

export const PostCount = styled.p`
  font-size: ${fontSizes.sm};
  color: ${(props) => props.theme.colors.text.secondary};
  margin: 2px 0 0 0;
`

export const TabContent = styled.div`
  /* Conteúdo das tabs */
`
