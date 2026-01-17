import styled from 'styled-components'
import { fontSizes, fontWeights } from '../../../../../styles/globalStyles'

export const PopoverContainer = styled.div`
  padding: 16px;
`

export const EmptyMessage = styled.p`
  font-size: ${fontSizes.sm};
  font-weght: ${fontWeights.light};
  color: ${(props) => props.theme.colors.text.tertiary};
  text-align: center;
  margin: 0;
  line-height: 1.5;
`
