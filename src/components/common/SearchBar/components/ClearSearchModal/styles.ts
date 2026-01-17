import styled from 'styled-components'
import { fontSizes, fontWeights } from '../../../../../styles/globalStyles'

export const ModalContent = styled.div`
  padding: 32px;
  max-width: 320px;
`

export const Title = styled.h2`
  font-size: ${fontSizes.xl};
  font-weight: ${fontWeights.bold};
  color: ${(props) => props.theme.colors.text.primary};
  margin: 0 0 8px 0;
`

export const Description = styled.p`
  font-size: ${fontSizes.sm};
  font-weight: ${fontWeights.light};
  color: ${(props) => props.theme.colors.text.secondary};
  line-height: 1.5;
  margin: 0 0 24px 0;
`

export const Actions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`
