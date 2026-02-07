import styled from 'styled-components'
import { colors, fontSizes } from '../../../../styles/globalStyles'

export const CounterContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`

export const CharCounter = styled.span<{ $isLimit: boolean }>`
  font-size: ${fontSizes.sm};
  color: ${(props) => (props.$isLimit ? colors.error : colors.primary)};
`
