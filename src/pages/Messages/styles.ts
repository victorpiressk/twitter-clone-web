import styled from 'styled-components'
import { fontSizes, fontWeights } from '../../styles/globalStyles'

export const MessagesContainer = styled.div`
  border-left: 1px solid ${(props) => props.theme.colors.border.primary};
  border-right: 1px solid ${(props) => props.theme.colors.border.primary};
  min-height: 100vh;
`

export const MessagesHeader = styled.div`
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: ${(props) => props.theme.colors.background.primary};
  backdrop-filter: blur(12px);
  border-bottom: 1px solid ${(props) => props.theme.colors.border.primary};
  padding: 12px 16px;
`

export const HeaderTitle = styled.h2`
  font-size: ${fontSizes.xl};
  font-weight: ${fontWeights.bold};
  color: ${(props) => props.theme.colors.text.primary};
  margin: 0;
`

export const PlaceholderContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 40px;
  text-align: center;
`

export const PlaceholderIcon = styled.div`
  font-size: 80px;
  margin-bottom: 24px;
`

export const PlaceholderTitle = styled.h3`
  font-size: ${fontSizes.xxl};
  font-weight: ${fontWeights.bold};
  color: ${(props) => props.theme.colors.text.primary};
  margin: 0 0 12px 0;
`

export const PlaceholderText = styled.p`
  font-size: ${fontSizes.md};
  color: ${(props) => props.theme.colors.text.secondary};
  max-width: 400px;
  line-height: 1.5;
  margin: 0;
`
