import styled from 'styled-components'
import { breakpoints, fontSizes, fontWeights } from '../../styles/globalStyles'

export const MessagesContainer = styled.div`
  border-right: 1px solid ${(props) => props.theme.colors.border.primary};
  min-height: 100vh;
  width: 100%;
  max-width: 414px;
  flex-shrink: 0;

  @media (max-width: ${breakpoints.desktop}) {
    max-width: 100%;
  }
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
  margin-bottom: 24px;
  color: ${(props) => props.theme.colors.text.secondary}; /* ← Cor do ícone */

  /* Ícone lucide já vem com size via prop */
`

export const PlaceholderTitle = styled.h3`
  font-size: ${fontSizes['2xl']};
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
